package net.gvsun.service.client;

import net.gvsun.controller.OauthController;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
public class GitLabClientServiceImpl implements ClientService {
    @Override
    public Map<String, String> getAccessTokenFromOAuth2Server(String accessTokenUri, String clientId,
                                                              String clientSecret,
                                                              String code, String redirect_uri) throws UnsupportedEncodingException {
        RestTemplate restTemplate = new RestTemplate();
        Base64.Encoder encoder = Base64.getEncoder();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String encodeClientId = URLEncoder.encode(clientId, "UTF-8");
        String encodeClientSecret = URLEncoder.encode(clientSecret, "UTF-8");
        headers.add("Authorization", "Basic " + encoder.encodeToString((encodeClientId + ":" + encodeClientSecret).getBytes(StandardCharsets.UTF_8)));
        LinkedMultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", OauthController.AUTHORIZATION_CODE);
        body.add("code", code);
        body.add("redirect_uri", redirect_uri);
        HttpEntity<LinkedMultiValueMap> httpEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> exchange = restTemplate.exchange(accessTokenUri, HttpMethod.POST, httpEntity, Map.class);
        return (Map<String, String>) exchange.getBody();
    }
}
