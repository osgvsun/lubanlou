package net.gvsun.service.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class HDUClientServiceImpl extends QQClientServiceImpl {
    @Override
    public Map<String, Object> getUserInfoByAccessToken(String accessToken, String userInfoUri) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity httpEntity = new HttpEntity(headers);
        if (userInfoUri.contains("?")) {
            userInfoUri += "&access_token=" + accessToken;
        } else {
            userInfoUri += "?access_token=" + accessToken;
        }
        ResponseEntity<Map> exchange = restTemplate.exchange(userInfoUri, HttpMethod.GET, httpEntity, Map.class);
        Map body = exchange.getBody();
        return body;
    }
}
