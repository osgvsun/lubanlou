package net.gvsun.oauth2.internal;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * JWT令牌
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
public class JwtToken {
    public static String JWT_SECRET_KEY = "GVSUNJWTSECERT";
    public static ConcurrentHashMap<String, String> cache = new ConcurrentHashMap<>();
    private static ObjectMapper objectMapper = new ObjectMapper();
    private Map<String, String> head;
    private Map<String, String> payload;
    private String signature;
    private String encodedJWT;

    public JwtToken(Map<String, String> payload) throws Exception {
        Map<String, String> head = new HashMap<>();
        head.put("alg", "HS256");
        head.put("typ", "JWT");
        this.head = head;

        if (!payload.containsKey("iss")) {//令牌的颁发者
            payload.put("iss", "GVSUNOAUTH2SERVER");
        }
        //令牌的唯一标识符。该声明的值在令牌颁发者创建的每一个令牌中都是唯一的，
        //为了防止冲突，它通常是一个随机值。这个值相当于向结构化令牌中加入
        //了一个攻击者无法获得的随机组件，有利于防止令牌猜测攻击和重放攻击
        if (!payload.containsKey("jti")) {
            payload.put("jti", UUID.randomUUID().toString());
        }
        this.payload = payload;

        Base64.Encoder encoder = Base64.getEncoder();
        ObjectMapper objectMapper = new ObjectMapper();
        String s_header = objectMapper.writeValueAsString(head);
        String s_payload = objectMapper.writeValueAsString(this.payload);
        s_header = encoder.encodeToString(s_header.getBytes(StandardCharsets.UTF_8));
        s_payload = encoder.encodeToString(s_payload.getBytes(StandardCharsets.UTF_8));
        s_header = s_header.replaceAll("\\+", "-").replaceAll("/", "_");
        s_payload = s_payload.replaceAll("\\+", "-").replaceAll("/", "_");
        String s_signature = HMACSHA256(s_header + "." + s_payload, JwtToken.JWT_SECRET_KEY);
        encodedJWT = s_header + "." + s_payload + "." + s_signature;
    }

    public static String HMACSHA256(String data, String key) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] array = sha256_HMAC.doFinal(data.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder();
            for (byte item : array) {
                sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
            }
            return sb.toString().toUpperCase();
        } catch (Exception e) {
            throw new RuntimeException("HMACSHA256加密失败:" + e.getMessage());
        }
    }

    public static String getEncodedJWT(Map<String, String> payload) throws JsonProcessingException {
        Map<String, String> head = new HashMap<>();
        head.put("alg", "HS256");
        head.put("typ", "JWT");

        if (!payload.containsKey("iss")) {//令牌的颁发者
            payload.put("iss", "GVSUNOAUTH2SERVER");
        }
        //令牌的唯一标识符。该声明的值在令牌颁发者创建的每一个令牌中都是唯一的，
        //为了防止冲突，它通常是一个随机值。这个值相当于向结构化令牌中加入
        //了一个攻击者无法获得的随机组件，有利于防止令牌猜测攻击和重放攻击
        if (!payload.containsKey("jti")) {
            payload.put("jti", UUID.randomUUID().toString());
        }

        String s_header = objectMapper.writeValueAsString(head);
        String s_payload = objectMapper.writeValueAsString(payload);
        s_header = Encoder.encode2Base64(s_header);
        s_payload = Encoder.encode2Base64(s_payload);
        s_header = s_header.replaceAll("\\+", "-").replaceAll("/", "_");
        s_payload = s_payload.replaceAll("\\+", "-").replaceAll("/", "_");
        String s_signature = HMACSHA256(s_header + "." + s_payload, JwtToken.JWT_SECRET_KEY);
        return s_header + "." + s_payload + "." + s_signature;
    }

    public String getEncodedJWT() {
        return this.encodedJWT;
    }
}
