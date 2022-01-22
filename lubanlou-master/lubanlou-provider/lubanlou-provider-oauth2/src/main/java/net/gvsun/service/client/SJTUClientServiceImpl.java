package net.gvsun.service.client;

import net.gvsun.controller.OauthController;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@Service
public class SJTUClientServiceImpl implements ClientService {
    @Override
    public Map<String, String> getAccessTokenFromOAuth2Server(String accessTokenUri, String clientId,
                                                              String clientSecret,
                                                              String code, String redirect_uri) throws UnsupportedEncodingException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", OauthController.AUTHORIZATION_CODE);
        map.add("code", code);
        map.add("redirect_uri", redirect_uri);
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        HttpEntity<Object> httpEntity = new HttpEntity<>(map, headers);
        ResponseEntity<Map> exchange = restTemplate.exchange(accessTokenUri, HttpMethod.POST, httpEntity, Map.class);
        Map body = exchange.getBody();
        return body;
    }

    /**
     * 根据访问令牌获取用户信息
     *
     * @param accessToken 范文令牌
     * @param userInfoUri 用户信息获取地址
     * @param user_id     上交返回的的用户id
     * @return 返回一个Map，包含用户的各种信息
     */
    public Map<String, Object> getUserInfoByAccessToken(String accessToken, String userInfoUri, String user_id) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity httpEntity = new HttpEntity(headers);
        String url = userInfoUri + "?access_token=" + accessToken + "&user_id=" + user_id;
        ResponseEntity<Map> exchange = restTemplate.exchange(url, HttpMethod.GET, httpEntity, Map.class);
        Map body = exchange.getBody();
        return body;
    }
}
