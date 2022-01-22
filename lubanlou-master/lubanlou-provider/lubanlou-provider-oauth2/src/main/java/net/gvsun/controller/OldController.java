package net.gvsun.controller;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabase;
import net.gvsun.service.CookieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 为了与uia兼容
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j()
@Controller
@CrossOrigin
@Deprecated
public class OldController {
    private final PropertiesConfigure propertiesConfigure;
    private CookieService cookieService;

    @Autowired
    public OldController(PropertiesConfigure propertiesConfigure,
                         CookieService cookieService) {
        this.propertiesConfigure = propertiesConfigure;
        this.cookieService = cookieService;
    }

    @GetMapping({"/signout", "/old/signout"})
    public void signout(@RequestParam String url, HttpServletResponse response, HttpServletRequest request) throws IOException {
        //删除客户端cookie
        long start = System.currentTimeMillis();
        Cookie[] cookies = request.getCookies();
        for (Cookie c : cookies) {
            if (c.getName().equals(propertiesConfigure.OAUTH2COOKIE)) {
                String value = c.getValue();
                cookieService.deleteCookieFromRedis(value);
            }
            if (c.getName().equals(PropertiesConfigure.SSOUT_USERNAME)) {
                String value = c.getValue();
            }
            //清除浏览器Cookie
            if (!c.getName().equals(ClientDatabase.COOKIE_KEY)) {
                Cookie cookie = new Cookie(c.getName(), "");
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
        log.info("signout耗时：{}ms", System.currentTimeMillis() - start);
        request.getSession().invalidate();
        response.sendRedirect(url);

    }
}