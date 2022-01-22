package net.gvsun.service;

import com.easycache.annotation.Cache;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.oauth2.internal.JwtToken;
import net.gvsun.entity.Token;
import net.gvsun.service.redis.RedisService;
import net.gvsun.oauth2.internal.Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

/**
 * 令牌服务
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j
@Service
public class TokenService {
    private final PropertiesConfigure propertiesConfigure;
    private final RedisService redisService;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public TokenService(PropertiesConfigure propertiesConfigure,
                        RedisService redisService) {
        this.propertiesConfigure = propertiesConfigure;
        this.redisService = redisService;
    }

    /**
     * 为客户端生成访问令牌(JWT格式的令牌)
     *
     * @param clientId 客户端ID
     * @param payload  JWT的载荷
     * @return 返回生成的令牌
     */
    public Map<String, String> generateToken(String clientId, Map<String, String> payload) throws Exception {
        Map<String, String> map = new HashMap<>();
        String accessToken = JwtToken.getEncodedJWT(payload);
        String refresh_token = UUID.randomUUID().toString();
        long time = new Date().getTime() / 1000 + propertiesConfigure.getTokenTimeout();

        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refresh_token);
        token.setClientId(clientId);
        token.setTimeout(time);
        token.setCreateDatetime(new Date());
        redisService.saveAccessToken(accessToken, token);

        map.put("access_token", accessToken);
        map.put("refresh_token", refresh_token);
        map.put("expires_in", String.valueOf(propertiesConfigure.getTokenTimeout()));
        map.put("token_type", "Bearer");
        return map;
    }

    /**
     * 从请求头中获取访问令牌
     *
     * @param request 请求对象
     * @return 返回访问令牌
     */
    public String getTokenFromHeader(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (!StringUtils.isEmpty(authorization))
            return authorization.substring("Bearer ".length());
        else
            return null;
    }

    /**
     * 检查JWT令牌是否被篡改
     *
     * @param jwtTokenString 原始的JWT令牌
     */
    public boolean checkJwtToken(String jwtTokenString) {
        Token token = redisService.findByAccessToken(jwtTokenString);
        if (token != null && token.getTimeout() != null) {
            Map<String, String> jwtContent = getJwtContent(jwtTokenString);
            String header = jwtContent.get("header");
            String payload = jwtContent.get("payload");
            String signature = jwtContent.get("signature");
            String s_header = Encoder.encode2Base64(header);
            String s_payload = Encoder.encode2Base64(payload);
            s_header = s_header.replaceAll("\\+", "-").replaceAll("/", "_");
            s_payload = s_payload.replaceAll("\\+", "-").replaceAll("/", "_");
            String s_signature = JwtToken.HMACSHA256(s_header + "." + s_payload, JwtToken.JWT_SECRET_KEY);
            Long timeout = token.getTimeout();
            return signature.equals(s_signature) && (new Date().getTime() / 1000) < timeout;
        } else {
            return false;
        }
    }

    /**
     * 获取JWT内容
     *
     * @param jwtTokenString 原始JWT字符串
     * @return 返回一个Map，包含头、载荷、签名
     */
    @Cache(key = "'getJwtContent'", hkey = "#args[0]")
    public Map<String, String> getJwtContent(String jwtTokenString) {
        String[] split = jwtTokenString.split("\\.");
        if (split.length != 3) {
            throw new IllegalArgumentException("令牌格式非法:" + jwtTokenString);
        }
        String s_header = split[0].replaceAll("-", "+").replaceAll("_", "/");
        String s_payload = split[1].replaceAll("-", "+").replaceAll("_", "/");
        String s_signature = split[2].replaceAll("-", "+").replaceAll("_", "/");
        String header = Encoder.decodeFromBase64(s_header);
        String payload = Encoder.decodeFromBase64(s_payload);
        Map<String, String> map = new HashMap<>();
        map.put("header", header);
        map.put("payload", payload);
        map.put("signature", s_signature);
        return map;
    }

    /**
     * 从JWT载荷中获取用户名
     *
     * @param payload 载荷
     * @return 返回用户名
     */
    public String getUsernameFromJwtTokenPayload(String payload) throws IOException {
        Map map = objectMapper.readValue(payload, Map.class);
        return map.get("username").toString();
    }

    /**
     * @description 从JWT载荷中获取用户phone
     * @param payload 载荷
     * @author  Smark Lee
     * @date  2021/12/11
     * @return
     **/
    public String getPhoneFromJwtTokenPayload(String payload) throws IOException {
        // 之前未统一token中的user信息格式，现在默认格式为{user={"phone":"xxx","username":"xxx"}}
        log.error("获取的payload:"+payload);
        Map map = objectMapper.readValue(payload, Map.class);
        return StringUtils.isEmpty(map.get("phone"))?null:map.get("phone").toString();
    }

    /**
     * 从JWT载荷中获取数据源
     *
     * @param payload 载荷
     * @return 返回学校名
     */
    public String getSchoolNameFromJwtTokenPayload(String payload) throws IOException {
        Map map = objectMapper.readValue(payload, Map.class);
        Object schoolName = map.get("datasource.token.schoolName");
        return schoolName == null ? null : schoolName.toString();
    }
}
