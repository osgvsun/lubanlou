package net.gvsun.gsexam.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {

    private static final String FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";

    /**************************************************************************
    * @Description: 判断字符串是否为空对象或空字符串
    * @Author: 罗璇
    * @Date: 2017/10/8 15:06
    **************************************************************************/
    public static boolean isEmpty(String src){
        return src == null || src.trim().length() == 0;
    }

    /**************************************************************************
     * @Description: 转换到时间类型
     * @Author: 罗璇
     * @Date: 2017/10/8 16:14
     **************************************************************************/
    public static Date parseToDate(String src){
        SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_DATETIME);
        Date rs = null;
        try {
            rs = sdf.parse(src);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return rs;
    }
}
