package net.gvsun.service;

import net.gvsun.oauth2.internal.Encoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
public class AuthorizationService {
    /**
     * 在HTTP基本认证中，Authorization头部是一个Base64编码的字符串，由用户名和密码拼接所得，
     * 二者间以冒号(:)为分隔符。OAuth 2.0规定将客户端ID作为用户名，将客户端密钥作为密码，但是
     * 拼接之前要先分别对它们进行URL编码。在服务端，需要逆向地将它们解析出来。
     *
     * @return 返回字符串数组，第一个是username，第二个是secret
     */
    public String[] getUsernameAndSecretFromHeader(HttpServletRequest request) throws UnsupportedEncodingException {
        String authorization = request.getHeader("Authorization");
        if (authorization != null) {
            String s = Encoder.decodeFromBase64(authorization.substring("Basic ".length()));
            String[] split = s.split(":");
            String clientId;
            String clientSecret;
            try {//如果split里面的内容有用URL编码会抛出异常
                clientId = URLDecoder.decode(split[0], "UTF-8");
                clientSecret = URLDecoder.decode(split[1], "UTF-8");
            } catch (IllegalArgumentException e) {
                clientId = split[0];
                clientSecret = split[1];
            }
            return new String[]{clientId, clientSecret};
        } else {
            return null;
        }
    }
}
