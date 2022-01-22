package net.gvsun.gsexam.exammain.exam.login;

import net.gvsun.common.Md5Util;
import net.gvsun.gsexam.service.common.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller("UiaController")
public class UiaController {

    //统一身份认证登录路径
    @Value("${uia.loginUrl}")
    private String uiaLoginUrl;

    //统一身份认证退出路径
    @Value("${uia.logoutUrl}")
    private String uiaLogoutUrl;

    //统一身份认证登录后回调地址
    @Value("${app.redirectUrl}")
    private String redirectUrl;

    @Value("${uia.secretKey}")
    private String secretKey;

    @Value("${app.timeDiff}")
    private Integer timeDiff;

    //是否使用统一身份认证
    @Value("${uia.isUia}")
    private Boolean uiaEnable;

    @Autowired
    private ShareService shareService;

    /**
     * cas login 方法
     *
     * @author 付世亮
     * @since 2020-08-13
     */
    @RequestMapping("/webapp/login")
    public String login(HttpServletRequest request, Map<String, Object> map) {

        if (uiaEnable) {
            String uiaLoginUrl = this.uiaLoginUrl;
            String redirectUrl = this.redirectUrl;
            if (!this.uiaLoginUrl.startsWith("http")) {
                uiaLoginUrl = request.getScheme() + "://" + request.getServerName() + this.uiaLoginUrl;
            }
            if (!this.redirectUrl.startsWith("http")) {
                redirectUrl = request.getScheme() + "://" + request.getServerName() + this.redirectUrl;
            }

            String key = request.getParameter("key");
            if (key == null || "".equals(key)) {
                return "redirect:" + uiaLoginUrl + "?redirectUrl=" + redirectUrl;
            } else {
                long timestamp = Long.parseLong(request.getParameter("timestamp"));
                String username = request.getParameter("uiaUser");
                //MD5加密
                String str = username + secretKey;
                //加密后的字符串
                String md5str = Md5Util.createMD5(str);
                //获取当前时间戳
                long time = timestamp + timeDiff * 1000;
                if (System.currentTimeMillis() <= time && key.equals(md5str)) {
                    map.put("username", username);
                    map.put("password", md5str);
                    return "uia/auto_login";
                } else {
                    return "redirect:/webapp/login";
                }
            }
        } else {
            return "uia/login";
        }

    }

    /**
     * cas logout 方法
     *
     * @author 付世亮
     * @since 2020-08-13
     */
    @RequestMapping("/webapp/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        if (uiaEnable) {
            String uiaLogoutUrl = this.uiaLogoutUrl;
            String redirectUrl = this.redirectUrl;
            if (!this.uiaLogoutUrl.startsWith("http")) {
                uiaLogoutUrl = request.getScheme() + "://" + request.getServerName() + this.uiaLogoutUrl;
            }
            if (!this.redirectUrl.startsWith("http")) {
                redirectUrl = request.getScheme() + "://" + request.getServerName() + this.redirectUrl;
            }
            return "redirect:" + uiaLogoutUrl + "?outUrl=" + redirectUrl;
        } else {
            return "uia/login";
        }
    }

    /**
     * cas fail 方法
     *
     * @author 付世亮
     * @since 2020-08-13
     */
    @RequestMapping("/webapp/fail")
    public String fail() {
        return "uia/fail";
    }

}
