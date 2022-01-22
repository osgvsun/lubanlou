package net.gvsun.controller.auth;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.controller.OauthController;
import net.gvsun.service.client.ClientService;
import net.gvsun.service.client.QQClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.UUID;

/**
 * 与QQ对接OAuth2
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Controller
@CrossOrigin
@RequestMapping("/qq")
public class QQController {
    private final PropertiesConfigure propertiesConfigure;
    private QQClientServiceImpl clientService;
    @Value("${qq.host}/user/get_user_info")
    private String qqNumberUri;
    @Value("${qq.security.oauth2.client.clientId}")
    private String qqClientId;
    @Value("${qq.security.oauth2.client.clientSecret}")
    private String qqClientSecret;
    @Value("${qq.security.oauth2.client.accessTokenUri}")
    private String qqAccessTokenUri;
    @Value("${qq.security.oauth2.client.userAuthorizationUri}")
    private String qqUserAuthorizationUri;
    @Value("${qq.security.oauth2.resource.userInfoUri}")
    private String qqUserInfoUri;

    @Autowired
    public QQController(PropertiesConfigure propertiesConfigure) {
        this.propertiesConfigure = propertiesConfigure;
    }

    @Autowired
    @Qualifier("QQClientServiceImpl")
    public void setClientService(ClientService clientService) {
        this.clientService = (QQClientServiceImpl) clientService;
    }

    @GetMapping("/callback")
    public String callback(@RequestParam String code, @RequestParam String state,
                           Map<String, String> map, HttpServletRequest request) throws UnsupportedEncodingException {
        String qqState = (String) request.getSession().getAttribute("qqState");
        if (qqState != null && qqState.equals(state)) {
            String referer = (String) request.getSession().getAttribute("Referer");
            String clientId, clientSecret;
            if (referer != null) {
                if (referer.contains("www.jiaoshilou.com")) {
                    clientId = qqClientId.split(":")[0];
                    clientSecret = qqClientSecret.split(":")[0];
                } else if (referer.contains("www.k15ai.com")) {
                    clientId = qqClientId.split(":")[2];
                    clientSecret = qqClientSecret.split(":")[2];
                } else {
                    clientId = qqClientId.split(":")[1];
                    clientSecret = qqClientSecret.split(":")[1];
                }
            } else {
                clientId = qqClientId.split(":")[1];
                clientSecret = qqClientSecret.split(":")[1];
            }
            String redirect_uri = propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/qq/callback";
            Map<String, String> response = clientService.getAccessTokenFromOAuth2Server(qqAccessTokenUri, clientId, clientSecret, code, redirect_uri);
            String access_token = response.get("access_token");
            String token_type = response.get("token_type");
            String scope = response.get("scope");

            //拿到访问令牌之后，获取用户信息
            Map<String, Object> userInfo = clientService.getUserInfoByAccessToken(access_token, qqUserInfoUri);
            String openid = userInfo.get("openid").toString();
            HttpSession session = request.getSession();
            redirect_uri = (String) session.getAttribute("redirect_uri");
            state = (String) session.getAttribute("state");
            String authorize_uri = (String) session.getAttribute("authorize_uri");
            String response_type = (String) session.getAttribute("response_type");
            String client_id = (String) session.getAttribute("client_id");
            String redirect = String.format("redirect:/login?qq_opeid=%s&redirect_uri=%s&state=%s&authorize_uri=%s&response_type=%s&client_id=%s", openid, redirect_uri, state, authorize_uri, response_type, client_id);
            return redirect;
        } else {
            throw new IllegalArgumentException("state_code_mismatch");
        }
    }

    @GetMapping("/login")
    public String login(@RequestParam String redirect_uri, @RequestParam String state,
                        @RequestParam String authorize_uri, @RequestParam String response_type,
                        @RequestParam String client_id, Map<String, String> module, HttpServletRequest request) {
        String referer = request.getHeader("Referer");
        String qqState = UUID.randomUUID().toString();
        HttpSession session = request.getSession();
        session.setAttribute("qqState", qqState);
        session.setAttribute("Referer", referer);
        session.setAttribute("redirect_uri", redirect_uri);
        session.setAttribute("state", state);
        session.setAttribute("authorize_uri", authorize_uri);
        session.setAttribute("response_type", response_type);
        session.setAttribute("client_id", client_id);

        String clientId;
        if (referer != null) {
            if (referer.contains("www.jiaoshilou.com")) {
                clientId = qqClientId.split(":")[0];
            } else if (referer.contains("www.k15ai.com")) {
                clientId = qqClientId.split(":")[2];
            } else {
                clientId = qqClientId.split(":")[1];
            }
        } else {
            clientId = qqClientId.split(":")[1];
        }

        module.put("client_id", clientId);
        module.put("redirect_uri", propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/qq/callback");
        module.put("authorize_uri", qqUserAuthorizationUri);
        module.put("state", qqState);
        module.put("response_type", OauthController.CODE);
        return "redirect_to_oauth2server";
    }
}
