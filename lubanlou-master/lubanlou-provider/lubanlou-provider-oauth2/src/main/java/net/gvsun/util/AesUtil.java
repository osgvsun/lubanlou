package net.gvsun.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Security;
import java.security.spec.AlgorithmParameterSpec;

public class AesUtil {
    // 加密模式
    public static final String ALGORITHM = "AES/CBC/PKCS7Padding";
    // 密钥
    public static final String AES_KEY = "cBssbHB3ZA==HKXT";
    // 偏移量
    public static final String AES_IV = "1954682168745975";
    private static final String CHARSET_NAME = "UTF-8";
    private static final String AES_NAME = "AES";

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    /**
     * 解密
     */
    public static String decrypt(String content) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(AES_KEY.getBytes(CHARSET_NAME), AES_NAME);
            AlgorithmParameterSpec paramSpec = new IvParameterSpec(AES_IV.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keySpec, paramSpec);
            return new String(cipher.doFinal(Base64.decodeBase64(content)), CHARSET_NAME);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return StringUtils.EMPTY;
    }

    public static void main(String[] args) {
        AesUtil aes = new AesUtil();
        String contents = "126375";
        String encrypt = aes.encrypt(contents);
        System.out.println("加密后:" + encrypt);
        String decrypt = aes.decrypt(encrypt);
        System.out.println("解密后:" + decrypt);
    }

    /**
     * 加密
     */
    public static String encrypt(String content) {
        byte[] result = null;
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(AES_KEY.getBytes(CHARSET_NAME), AES_NAME);
            AlgorithmParameterSpec paramSpec = new IvParameterSpec(AES_IV.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, paramSpec);
            result = cipher.doFinal(content.getBytes(CHARSET_NAME));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Base64.encodeBase64String(result);
    }
}