package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.teacherinformationcenter.util.Md5;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Controller("UiaController")
public class UiaController {

    //统一身份认证登录路径
    @Value("${uia.loginUrl:}")
    private String uiaLoginUrl;

    //统一身份认证退出路径
    @Value("${uia.logoutUrl:}")
    private String uiaLogoutUrl;

    //统一身份认证登录后回调地址
    @Value("${app.redirectUrl:}")
    private String redirectUrl;

    //统一身份认证退出后返回地址
    @Value("${app.outUrl:}")
    private String outUrl;

    @Value("${uia.secretKey:}")
    private String secretKey;

    @Value("${AuthenticationVerity:}")
    private String AuthenticationVerity;

    @Value("${app.timeDiff:60}")
    private String timeDiff;

    // 是否使用统一身份认证
    @Value("${uia.isUia:}")
    private String uiaEnble;

    /**
     * cas login 方法
     *
     * @param request
     * @param response
     * @param map
     * @return
     */
    @RequestMapping("/webapp/login")
    public String login(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) throws IOException {
        String key = request.getParameter("key");
        if(key == null || "".equals(key)) {
            /**
             * @应对一个系统多域名的情况
             * @1.判断是否http开头
             * @2.是：直接使用
             * @3.否：获取当前系统域名，拼接使用
             */
            boolean isHttp = uiaLoginUrl.startsWith("http");
            String uiaLoginUrlStr = "";
            String redirectUrlStr = "";
            if (!isHttp) {
                uiaLoginUrlStr = "http://"+ request.getServerName() + uiaLoginUrl;
                redirectUrlStr = "http://"+ request.getServerName() + redirectUrl;
                response.sendRedirect(uiaLoginUrlStr + "?redirectUrl=" + redirectUrlStr);
            }else {
                response.sendRedirect(uiaLoginUrl + "?redirectUrl=" + redirectUrl);
            }
            return null;
        }else {
            long timestamp = Long.parseLong(request.getParameter("timestamp"));
            String username = "";
            username = request.getParameter("uiaUser");
            //MD5加密
            String str = username + secretKey;
            //加密后的字符串
            String md5str = Md5.createMD5(str);
            //获取当前时间戳
            long currTime = System.currentTimeMillis();
            long time =timestamp +  Long.parseLong(timeDiff)*1000;
            if(currTime <= time && key.equals(md5str)){
                map.put("username", username);
                map.put("password", md5str);
                return "/oauth/auto_login";
            }else {
                return "redirect:/webapp/logout";
            }
        }
    }

    /**
     * cas logout 方法
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping("/webapp/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String outUrlCook = request.getParameter("outUrl");
        //session清空
        request.getSession().invalidate();
        if ("true".equals(uiaEnble)) {
            /**
             * @应对一个系统多域名的情况
             * @1.判断是否http开头
             * @2.是：直接使用
             * @3.否：获取当前系统域名，拼接使用
             */
            boolean isHttp = uiaLogoutUrl.startsWith("http");
            String uiaLogoutUrlStr = uiaLogoutUrl;
            String outUrlStr = outUrl;
            if (!isHttp) {
                uiaLogoutUrlStr = "http://"+ request.getServerName() + uiaLogoutUrl;
                outUrlStr = "http://"+ request.getServerName() + outUrl;
            }
            if (outUrlCook != null && !"".equals(outUrlCook)) {
                outUrlStr = outUrlCook;
            }
            response.sendRedirect(uiaLogoutUrlStr + "?outUrl=" + outUrlStr);
        } else {
            response.sendRedirect("/login");
        }
    }

    /**
     * 登录失败返回登录页面
     */
    @RequestMapping("/webapp/fail")
    public String fail() {
        return "/oauth/fail";
    }

}
