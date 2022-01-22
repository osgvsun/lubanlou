package net.gvsun.service.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.controller.OauthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeChatClientServiceImpl implements ClientService {
    private RestTemplate restTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    @Qualifier("https")
    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Map<String, String> getAccessTokenFromOAuth2Server(String accessTokenUri, String clientId,
                                                              String clientSecret,
                                                              String code, String redirect_uri) throws IOException {
        Base64.Encoder encoder = Base64.getEncoder();
        HttpHeaders headers = new HttpHeaders();
        String encodeClientId = URLEncoder.encode(clientId, "UTF-8");
        String encodeClientSecret = URLEncoder.encode(clientSecret, "UTF-8");
        headers.add("Authorization", "Basic " + encoder.encodeToString((encodeClientId + ":" + encodeClientSecret).getBytes(StandardCharsets.UTF_8)));

        HttpEntity httpEntity = new HttpEntity(headers);
        if (!accessTokenUri.contains("?"))
            accessTokenUri += "?";
        accessTokenUri += "grant_type={grant_type}&code={code}&redirect_uri={redirect_uri}&appid={appid}&secret={secret}";
        Map<String, String> map = new HashMap<>();
        map.put("grant_type", OauthController.AUTHORIZATION_CODE);
        map.put("code", code);
        map.put("redirect_uri", redirect_uri);
        map.put("appid", clientId);
        map.put("secret", clientSecret);
        ResponseEntity<String> exchange = restTemplate.exchange(accessTokenUri, HttpMethod.GET, httpEntity, String.class, map);
        String body = exchange.getBody();
        return (Map<String, String>) objectMapper.readValue(body, Map.class);
    }

    /**
     * 根据访问令牌获取用户信息
     *
     * @param accessToken 范文令牌
     * @param userInfoUri 用户信息获取地址
     * @return 返回一个Map，包含用户的各种信息
     */
    public Map<String, Object> getUserInfoByAccessToken(String accessToken, String userInfoUri, String openId) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity httpEntity = new HttpEntity(headers);
        userInfoUri += "?access_token={access_token}&openid={openid}&scope={scope}";
        ResponseEntity<String> exchange = restTemplate.exchange(userInfoUri, HttpMethod.GET, httpEntity, String.class, accessToken, openId, "snsapi_userinfo");
        String body = exchange.getBody();
        return (Map<String, Object>) objectMapper.readValue(body, Map.class);
    }
}
