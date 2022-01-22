package net.gvsun.gsquestionpool.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**************************************************************************
 * Description:时间类型转换工具类
 *
 * @author:lixueteng
 * @date:2017/10/24 0024
 **************************************************************************/
public  class DateFormatUtil {

    private static final String FORMAT_DATETIME_1 = "yyyy-MM-dd HH:mm:ss";
    private static final String FORMAT_DATETIME_2 = "yyyy-MM-dd";

    /**************************************************************************
     * @Description: 转换到时间类型 yyyy-MM-dd HH:mm:ss
     * @Author: 罗璇
     * @Date: 2017/10/8 16:14
     **************************************************************************/
    public static Date stringToDate1(String src){
        SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_DATETIME_1);
        Date rs = null;
        try {
            rs = sdf.parse(src);
        } catch (ParseException e) {
            System.out.println("转换类型错误");
            e.printStackTrace();
        }
        return rs;
    }
    /**************************************************************************
     * @Description: 转换到时间类型 yyyy-MM-dd
     * @Author: 罗璇
     * @Date: 2017/10/8 16:14
     **************************************************************************/
    public static Date stringToDate2(String src){
        SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_DATETIME_2);
        Date rs = null;
        try {
            rs = sdf.parse(src);
        } catch (ParseException e) {
            System.out.println("转换类型错误");
            e.printStackTrace();
        }
        return rs;
    }
    /**************************************************************************
     * Description:Date 类型转换成String
     *
     * @author:lixueteng
     * @date:2017/11/20 0024
     **************************************************************************/
    public static String dateToString1(Date date){
        SimpleDateFormat sdf=new SimpleDateFormat(FORMAT_DATETIME_1);
        String rs = "";
        try {
            rs = sdf.format(date);
        } catch (Exception e) {
            System.out.println("转换类型错误");
            e.printStackTrace();
        }
        return rs;
    }
}
