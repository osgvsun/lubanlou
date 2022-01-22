package net.gvsun.service.redis;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabase;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.entity.Cookie;
import net.gvsun.entity.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RedisService {
    public static String TOKEN_KEY = "platform-oauth2-token";
    public static String COOKIE_KEY = "platform-oauth2-cookie";
    private final PropertiesConfigure propertiesConfigure;
    private final RedisTemplate<String, SiteDto> siteRedisTemplate;
    private final RedisTemplate<String, Token> tokenRedisTemplate;
    private final RedisTemplate<String, Cookie> cookieRedisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public RedisService(RedisTemplate<String, SiteDto> siteRedisTemplate,
                        PropertiesConfigure propertiesConfigure,
                        RedisTemplate<String, Token> tokenRedisTemplate,
                        RedisTemplate<String, Cookie> cookieRedisTemplate) {
        this.siteRedisTemplate = siteRedisTemplate;
        this.propertiesConfigure = propertiesConfigure;
        this.tokenRedisTemplate = tokenRedisTemplate;
        this.cookieRedisTemplate = cookieRedisTemplate;
    }

    public Map<String, SiteDto> getAllSiteDto() {
        Map<Object, Object> entries = siteRedisTemplate.opsForHash().entries(ClientDatabase.KEY);
        Map<String, SiteDto> map = new HashMap<>();
        entries.forEach((k, v) -> {
            try {
                SiteDto siteDto = objectMapper.readValue(objectMapper.writeValueAsString(v), new TypeReference<SiteDto>() {
                });
                map.put((String) k, siteDto);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return map;
    }

    /**
     * 从Redis里获取oauth2的数据源信息
     */
    public SiteDto getSiteDtoFromRedis() {
        return getSiteDtoFromRedis(propertiesConfigure.getProjectName());
    }

    /**
     * 从Redis里获取指定项目的数据源信息
     */
    public SiteDto getSiteDtoFromRedis(String projectName) {
        return (SiteDto) siteRedisTemplate.opsForHash().get(ClientDatabase.KEY, projectName);
    }

    /**
     * 获取访问令牌
     */
    public Token findByAccessToken(String accessToken) {
        return (Token) tokenRedisTemplate.opsForHash().get(RedisService.TOKEN_KEY, accessToken);
    }

    public Map<String, Token> getAllToken() {
        Map<Object, Object> entries = tokenRedisTemplate.opsForHash().entries(TOKEN_KEY);
        Map<String, Token> map = new HashMap<>();
        entries.forEach((k, v) -> {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                Token token = objectMapper.readValue(objectMapper.writeValueAsString(v), new TypeReference<Token>() {
                });
                map.put((String) k, token);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return map;
    }

    /**
     * 保存访问令牌
     */
    public void saveAccessToken(String accessToken, Token token) {
        tokenRedisTemplate.opsForHash().put(TOKEN_KEY, accessToken, token);
    }

    /**
     * 删除访问令牌
     */
    public void deleteAccessToken(String accessToken) {
        tokenRedisTemplate.opsForHash().delete(TOKEN_KEY, accessToken);
    }

    public Cookie getCookie(String cookie) {
        return (Cookie) cookieRedisTemplate.opsForHash().get(RedisService.COOKIE_KEY, cookie);
    }

    public void saveCookie(String key, Cookie cookie) {
        cookieRedisTemplate.opsForHash().put(RedisService.COOKIE_KEY, key, cookie);
    }

    public void deleteCookie(String key) {
        cookieRedisTemplate.opsForHash().delete(RedisService.COOKIE_KEY, key);
    }
}
