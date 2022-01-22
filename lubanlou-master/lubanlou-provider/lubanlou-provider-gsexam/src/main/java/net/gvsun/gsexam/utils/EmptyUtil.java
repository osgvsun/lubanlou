package net.gvsun.gsexam.utils;

/**************************************************************************
 * Description:判断是否为空
 *
 * @author:lixueteng
 * @date:2017/10/27 0027
 **************************************************************************/
public class EmptyUtil {
    /**************************************************************************
     * Description:判断是否为空
     *
     * @author:lixueteng
     * @date:2017/10/27 0027
     **************************************************************************/
    public static boolean isEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        return false;
    }
    /**************************************************************************
     * @Description: 判断字符串是否为空对象或空字符串
     * @Author: 罗璇
     * @Date: 2017/10/8 15:06
     **************************************************************************/
    public static boolean isEmpty(String src) {
        return src == null || src.trim().length() == 0;
    }
}
