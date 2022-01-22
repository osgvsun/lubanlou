package net.gvsun.service;

import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
public class CookieService {
    private final RedisService redisService;

    @Autowired
    public CookieService(RedisService redisService) {
        this.redisService = redisService;
    }

    /**
     * 从Redis检查客户端是否存在指定的Cookie
     *
     * @param request    请求对象
     * @param cookieName 要检查的cookie
     */
    public boolean hasCookieFromRedis(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        boolean exist = false;
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(cookieName)) {
                    String value = c.getValue();
                    net.gvsun.entity.Cookie cookie = redisService.getCookie(value);
                    if (cookie != null) {
                        exist = true;
                        break;
                    }
                }
            }
        }
        return exist;
    }

    public String getCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        String cookie = null;
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(cookieName)) {
                    cookie = c.getValue();
                }
            }
        }
        return cookie;
    }


    public void addCookieToRedis(String username, String cookieValue) {
        net.gvsun.entity.Cookie cookie = new net.gvsun.entity.Cookie();
        cookie.setUsername(username);
        cookie.setCookie(cookieValue);
        redisService.saveCookie(cookieValue, cookie);
    }

    public void deleteCookieFromRedis(String cookieValue) {
        redisService.deleteCookie(cookieValue);
    }
}
