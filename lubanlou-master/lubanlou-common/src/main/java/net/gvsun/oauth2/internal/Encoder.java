package net.gvsun.oauth2.internal;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class Encoder {
    private static Map<String, String> cache = new HashMap<>();
    private static Base64.Encoder encoder = Base64.getEncoder();
    private static Base64.Decoder decoder = Base64.getDecoder();

    public static String encode2Base64(String content) {
        return encoder.encodeToString(content.getBytes(StandardCharsets.UTF_8));
    }

    public static String decodeFromBase64(String content) {
        byte[] decode = decoder.decode(content);
        return new String(decode, StandardCharsets.UTF_8);
    }
}
