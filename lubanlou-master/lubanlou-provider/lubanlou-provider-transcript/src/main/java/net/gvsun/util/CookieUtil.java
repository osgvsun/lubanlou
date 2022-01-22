package net.gvsun.util;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class CookieUtil {
    /**
     * 读取所有cookie
     * 注意二、从客户端读取Cookie时，包括maxAge在内的其他属性都是不可读的，也不会被提交。
     * 浏览器提交Cookie时只会提交name与value属性。maxAge属性只被浏览器用来判断Cookie是否过期
     * -1是随浏览器关闭失效 0是马上失效
     */
    @RequestMapping("/showCookies")
    public static void showCookies() {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
        Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
        if (null == cookies) {
            System.out.println("没有cookie=========");
        } else {
            for (Cookie cookie : cookies) {
                System.out.println("name:" + cookie.getName() + ",value:" + cookie.getValue());
            }
        }

    }


    /**
     * 添加cookie
     *
     * @param name
     * @param value
     */
    @RequestMapping("/addCookie")
    public static void addCookie(String name, String value) {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = ((ServletRequestAttributes)ra).getResponse();
        Cookie cookie = new Cookie(name.trim(), value.trim());
//        cookie.setMaxAge(30 * 60);// 设置为30min
        cookie.setPath("/");
        System.out.println("已添加===============");
        response.addCookie(cookie);
    }

    /**
     * 修改cookie
     *
     * @param name
     * @param value    注意一、修改、删除Cookie时，新建的Cookie除value、maxAge之外的所有属性，例如name、path、domain等，都要与原Cookie完全一样。否则，浏览器将视为两个不同的Cookie不予覆盖，导致修改、删除失败。
     */
    @RequestMapping("/editCookie")
    public static void editCookie(String name, String value) {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = ((ServletRequestAttributes)ra).getResponse();
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
        Cookie[] cookies = request.getCookies();
        if (null == cookies) {
            System.out.println("没有cookie==============");
        } else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    System.out.println("原值为:" + cookie.getValue());
                    cookie.setValue(value);
                    cookie.setPath("/");
//                    cookie.setMaxAge(30 * 60);// 设置为30min
                    System.out.println("被修改的cookie名字为:" + cookie.getName() + ",新值为:" + cookie.getValue());
                    response.addCookie(cookie);
                    break;
                }
            }
        }
    }

    @RequestMapping("/editCookie")
    public static void editCookie(String name, String value,Integer maxAge) {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = ((ServletRequestAttributes)ra).getResponse();
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
        Cookie[] cookies = request.getCookies();
        if (null == cookies) {
            System.out.println("没有cookie==============");
        } else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    System.out.println("原值为:" + cookie.getValue());
                    cookie.setValue(value);
                    cookie.setPath("/");
                    cookie.setMaxAge(maxAge);// 设置为30min
                    System.out.println("被修改的cookie名字为:" + cookie.getName() + ",新值为:" + cookie.getValue());
                    response.addCookie(cookie);
                    break;
                }
            }
        }
    }

    /**
     * 删除cookie
     *
     * @param name
     */
    @RequestMapping("/delCookie")
    public static void delCookie(String name) {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = ((ServletRequestAttributes)ra).getResponse();
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
        Cookie[] cookies = request.getCookies();
        if (null == cookies) {
            System.out.println("没有cookie==============");
        } else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue(null);
                    cookie.setMaxAge(0);// 立即销毁cookie
                    cookie.setPath("/");
                    System.out.println("被删除的cookie名字为:" + cookie.getName());
                    response.addCookie(cookie);
                    break;
                }
            }
        }
    }

//2.一般情况下，会首先对cookie进行封装：

    /**
     * 根据名字获取cookie
     *
     * @param name    cookie名字
     * @return
     */
    public static Cookie getCookieByName(String name) {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }

    /**
     * 将cookie封装到Map里面
     *
     * @return
     */
    public static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }
}
