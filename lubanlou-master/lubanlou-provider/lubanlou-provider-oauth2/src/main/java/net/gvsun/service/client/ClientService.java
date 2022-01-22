package net.gvsun.service.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

/**
 * 作为客户端从别的OAuth2服务器获取令牌、各种资源。比如，用GitLab账号登陆时
 * 用QQ登陆时、用微信登陆时
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
public interface ClientService {
    /**
     * 从OAuth2服务器获取访问令牌
     *
     * @param accessTokenUri 访问令牌的获取地址
     * @param clientId       客户端ID
     * @param clientSecret   客户端密钥
     * @param code           授权码
     * @param redirect_uri   重定向地址
     * @return 返回一个Map，包含访问令牌等信息
     */
    Map<String, String> getAccessTokenFromOAuth2Server(String accessTokenUri, String clientId,
                                                       String clientSecret,
                                                       String code, String redirect_uri) throws IOException;

    /**
     * 根据访问令牌获取用户信息
     *
     * @param accessToken 范文令牌
     * @param userInfoUri 用户信息获取地址
     * @return 返回一个Map，包含用户的各种信息
     */
    default Map<String, Object> getUserInfoByAccessToken(String accessToken, String userInfoUri) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity httpEntity = new HttpEntity(headers);
        ResponseEntity<Map> exchange = restTemplate.exchange(userInfoUri, HttpMethod.GET, httpEntity, Map.class);
        Map body = exchange.getBody();
        return body;
    }
}
