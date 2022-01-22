package net.gvsun.gsexam.utils;

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

    /**************************************************************************
     * Description:String 类型转换成Date
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     **************************************************************************/
    public static Date string2Date(String time,String type){
        SimpleDateFormat sdf=new SimpleDateFormat(type);
        try {
            Date date = sdf.parse(time);
            return date;
        } catch (ParseException e) {
            System.out.println("转换类型错误");
            e.printStackTrace();
        }
            return null;
    }
    /**************************************************************************
     * Description:Date 类型转换成String
     *
     * @author:lixueteng
     * @date:2017/11/20 0024
     **************************************************************************/
    public static String date2String(Date date,String type){
        SimpleDateFormat sdf=new SimpleDateFormat(type);
        try {
            String dateStr = sdf.format(date);
            return dateStr;
        } catch (Exception e) {
            System.out.println("转换类型错误");
            e.printStackTrace();
        }
        return null;
    }
}
