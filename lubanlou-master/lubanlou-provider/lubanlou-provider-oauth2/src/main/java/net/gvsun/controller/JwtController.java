package net.gvsun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.gvsun.oauth2.internal.JsonReturnVo;
import net.gvsun.entity.OauthClientDetail;
import net.gvsun.repository.OauthClientDetailRepository;
import net.gvsun.service.TokenService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import util.AESUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * 此代码Controller为了和旧JWT兼容
 */
@Slf4j
@Controller
@Deprecated
@CrossOrigin
public class JwtController {
    private final OauthClientDetailRepository oauthClientDetailRepository;
    private final TokenService tokenService;
    ObjectMapper objectMapper = new ObjectMapper();

    public JwtController(OauthClientDetailRepository oauthClientDetailRepository,
                         TokenService tokenService) {
        this.oauthClientDetailRepository = oauthClientDetailRepository;
        this.tokenService = tokenService;
    }

    /**
     * 获取访问令牌
     *
     * @param clientId OAuth2给客户端发访的ID
     * @param username 用户名
     * @param type     2表示node.js调用，不再加密
     */
    @RequestMapping("/getAuthorization")
    @ResponseBody
    public JsonReturnVo getAuthorization(@RequestParam(value = "siteEnName") String clientId,
                                         @RequestParam String username, @RequestParam(defaultValue = "1") Integer type,
                                         HttpServletRequest request) throws Exception {
        OauthClientDetail client = oauthClientDetailRepository.findByClientId(clientId);
        if (client == null) {
            JsonReturnVo jsonReturnVo = new JsonReturnVo();
            jsonReturnVo.setState("error");
            jsonReturnVo.setErrorCode("客户端未在Oauth2注册");
            return jsonReturnVo;
        }
        String clientSecret = client.getClientSecret();
        if (type != 2) {
            username = AESUtil.decrypt(username, clientSecret);
        }

        Map<String, String> payload = new HashMap<>();
        payload.put("username", username);
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String name = parameterNames.nextElement();
            if (!name.equals("username")) {
                payload.put(name, request.getParameter(name));
            }
        }
        log.error("payload1:"+payload.toString());
        Map<String, String> map = tokenService.generateToken(clientId, payload);
        String access_token = map.get("access_token");
        if (type != 2) {
            access_token = AESUtil.encrypt("Bearer " + access_token, clientSecret);
        } else {
            access_token = "Bearer " + access_token;
        }
        JsonReturnVo jsonReturnVo = new JsonReturnVo();
        jsonReturnVo.setState("success");
        jsonReturnVo.setResult(access_token);
        return jsonReturnVo;
    }

    /**
     * 检查令牌是否失效，如果未失效则返回解密后的username
     */
    @PostMapping("/checkAuthorization")
    @ResponseBody
    public JsonReturnVo checkAuthorization(HttpServletRequest request) throws IOException {
        if (request.getHeader("Authorization") != null) {
            String access_token = tokenService.getTokenFromHeader(request);
            if (access_token == null /*|| !tokenService.checkJwtToken(access_token)*/) {
                JsonReturnVo jsonReturnVo = new JsonReturnVo();
                jsonReturnVo.setState("error");
                jsonReturnVo.setErrorCode("令牌失效或没有令牌");
                return jsonReturnVo;
            }
            Map<String, String> map = tokenService.getJwtContent(access_token);
            String payload = map.get("payload");
            map = objectMapper.readValue(payload, Map.class);
            JsonReturnVo jsonReturnVo = new JsonReturnVo();
            jsonReturnVo.setState("success");
            jsonReturnVo.setResult(map);
            return jsonReturnVo;
        } else {
            JsonReturnVo jsonReturnVo = new JsonReturnVo();
            jsonReturnVo.setState("error");
            jsonReturnVo.setErrorCode("没有Authorization头");
            return jsonReturnVo;
        }
    }
}
