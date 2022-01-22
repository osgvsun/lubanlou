package net.gvsun.service.client;

import net.gvsun.controller.OauthController;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class QQClientServiceImpl implements ClientService {
    @Override
    public Map<String, String> getAccessTokenFromOAuth2Server(String accessTokenUri, String clientId,
                                                              String clientSecret,
                                                              String code, String redirect_uri) throws UnsupportedEncodingException {
        RestTemplate restTemplate = new RestTemplate();
        Base64.Encoder encoder = Base64.getEncoder();
        HttpHeaders headers = new HttpHeaders();
        String encodeClientId = URLEncoder.encode(clientId, "UTF-8");
        String encodeClientSecret = URLEncoder.encode(clientSecret, "UTF-8");
        headers.add("Authorization", "Basic " + encoder.encodeToString((encodeClientId + ":" + encodeClientSecret).getBytes(StandardCharsets.UTF_8)));

        HttpEntity httpEntity = new HttpEntity(headers);
        if (!accessTokenUri.contains("?"))
            accessTokenUri += "?";
        accessTokenUri += "grant_type={grant_type}&code={code}&redirect_uri={redirect_uri}&client_id={client_id}&client_secret={client_secret}";
        Map<String, String> map = new HashMap<>();
        map.put("grant_type", OauthController.AUTHORIZATION_CODE);
        map.put("code", code);
        map.put("redirect_uri", redirect_uri);
        map.put("client_id", clientId);
        map.put("client_secret", clientSecret);
        ResponseEntity<String> exchange = restTemplate.exchange(accessTokenUri, HttpMethod.GET, httpEntity, String.class, map);
        String body = exchange.getBody();
        //body格式为"access_token=DD93BF92F50DAB5C25DEED55FB131EA3&expires_in=7776000&refresh_token=9C07E1F783D393C70D99F2DCCAF5CD50"
        Map<String, String> result = new HashMap<>();
        String[] split = body.split("&");
        if (split[0].contains("access_token")) {
            String accessToken = split[0].split("=")[1];
            result.put("access_token", accessToken);
        }
        return result;
    }

    public Map<String, String> getQQNumber(String url, String access_token, String clientId, String openid) {
        RestTemplate restTemplate = new RestTemplate();
        url += "?access_token={access_token}&oauth_consumer_key={oauth_consumer_key}&openid={openid}";
        Map<String, String> map = new HashMap<>();
        map.put("access_token", access_token);
        map.put("openid", openid);
        map.put("oauth_consumer_key", clientId);
        HttpEntity httpEntity = new HttpEntity(null);
        ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class, map);
        String body = exchange.getBody();
        return null;
    }

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
        ResponseEntity<String> exchange = restTemplate.exchange(userInfoUri, HttpMethod.GET, httpEntity, String.class);
        String body = exchange.getBody();
        Map<String, Object> result = new HashMap<>();
        //body格式"callback( {"client_id":"101853096","openid":"CFB8A46D16FD62B509E5D0D1A60A54A3"} );"
        if (body.contains("openid")) {
            String[] split = body.split("\\{");
            String s = split[1].split("}")[0];
            String s2 = s.split(",")[1];
            String s3 = s2.split(":")[1];
            String openId = s3.substring(1, s3.length() - 1);
            result.put("openid", openId);
        }
        return result;

    }
}
