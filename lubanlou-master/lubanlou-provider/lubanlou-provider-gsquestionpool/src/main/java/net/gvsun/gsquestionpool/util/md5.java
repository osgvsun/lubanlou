
package net.gvsun.gsquestionpool.util;

import java.security.MessageDigest;

public class md5 {
	
//MD5加密
	public static String createMD5(String s){
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			byte[] byteArray = s.getBytes("ISO-8859-1");
			
			byte[] md5Bytes = md5.digest(byteArray);
			StringBuffer hexValue = new StringBuffer();
	
			for (int i = 0; i < md5Bytes.length; i++) {
				int val = ((int) md5Bytes[i]) & 0xff;
				if (val < 16) {
                    hexValue.append("0");
                }
				hexValue.append(Integer.toHexString(val));
			}
			return hexValue.toString();
	
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
