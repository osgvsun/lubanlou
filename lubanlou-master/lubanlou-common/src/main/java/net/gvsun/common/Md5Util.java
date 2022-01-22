
package net.gvsun.common;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Md5Util {

    public static String createMD5(String s) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] byteArray = s.getBytes(StandardCharsets.UTF_8);

            byte[] md5Bytes = md5.digest(byteArray);
            StringBuilder hexValue = new StringBuilder();

            for (byte md5Byte : md5Bytes) {
                int val = ((int) md5Byte) & 0xff;
                if (val < 16) {
                    hexValue.append("0");
                }
                hexValue.append(Integer.toHexString(val));
            }
            return hexValue.toString();
        } catch (Exception e) {
            return null;
        }
    }
}
