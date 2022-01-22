package net.gvsun.controller;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.service.client.ClientService;
import net.gvsun.service.client.WeChatClientServiceImpl;
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
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * 与微信对接OAuth2
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Controller
@CrossOrigin
@RequestMapping("/wechat")
public class WeChatController {
    private final PropertiesConfigure propertiesConfigure;
    private WeChatClientServiceImpl clientService;
    @Value("${wechat.host}/user/get_user_info")
    private String wechatNumberUri;
    @Value("${wechat.security.oauth2.client.clientId}")
    private String wechatClientId;
    @Value("${wechat.security.oauth2.client.clientSecret}")
    private String wechatClientSecret;
    @Value("${wechat.security.oauth2.client.accessTokenUri}")
    private String wechatAccessTokenUri;
    @Value("${wechat.security.oauth2.client.userAuthorizationUri}")
    private String wechatUserAuthorizationUri;
    @Value("${wechat.security.oauth2.resource.userInfoUri}")
    private String wechatUserInfoUri;

    @Autowired
    public WeChatController(PropertiesConfigure propertiesConfigure) {
        this.propertiesConfigure = propertiesConfigure;
    }

    @Autowired
    @Qualifier("weChatClientServiceImpl")
    public void setClientService(ClientService clientService) {
        this.clientService = (WeChatClientServiceImpl) clientService;
    }

    @GetMapping("/callback")
    public String callback(@RequestParam String code, @RequestParam String state,
                           Map<String, String> map, HttpServletRequest request) throws IOException {
        String wechatState = (String) request.getSession().getAttribute("wechatState");
        String referer = (String) request.getSession().getAttribute("Referer");
        if (wechatState != null && wechatState.equals(state)) {
            String redirect_uri = propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/wechat/callback";
            String clientId, clientSecret;
            if (referer != null) {
                if (referer.contains("www.jiaoshilou.com")) {
                    clientId = wechatClientId.split(":")[0];
                    clientSecret = wechatClientSecret.split(":")[0];
                } else if (referer.contains("www.k15ai.com")) {
                    clientId = wechatClientId.split(":")[2];
                    clientSecret = wechatClientSecret.split(":")[2];
                } else {
                    clientId = wechatClientId.split(":")[1];
                    clientSecret = wechatClientSecret.split(":")[1];
                }
            } else {
                clientId = wechatClientId.split(":")[1];
                clientSecret = wechatClientSecret.split(":")[1];
            }
            Map<String, String> response = clientService.getAccessTokenFromOAuth2Server(wechatAccessTokenUri, clientId, clientSecret,
                    code, redirect_uri);
            String access_token = response.get("access_token");
            String token_type = response.get("token_type");
            String scope = response.get("scope");
            String unionid = response.get("unionid");
            String openid = response.get("openid");

            HttpSession session = request.getSession();
            redirect_uri = (String) session.getAttribute("redirect_uri");
            state = (String) session.getAttribute("state");
            String authorize_uri = (String) session.getAttribute("authorize_uri");
            String response_type = (String) session.getAttribute("response_type");
            String client_id = (String) session.getAttribute("client_id");
            String redirect = String.format("redirect:/login?wechat_openid=%s&redirect_uri=%s&state=%s&authorize_uri=%s&response_type=%s&client_id=%s&unionid=%s", openid, redirect_uri, state, authorize_uri, response_type, client_id, unionid);
            return redirect;
        } else {
            throw new IllegalArgumentException("state_code_mismatch");
        }
    }

    @GetMapping("/login")
    public String login(@RequestParam String redirect_uri, @RequestParam String state,
                        @RequestParam String authorize_uri, @RequestParam String response_type,
                        @RequestParam String client_id, String href, Map<String, String> module, HttpServletRequest request) {
        String referer = request.getHeader("Referer");
        System.out.println("login referer=" + referer);
        String wechatState = UUID.randomUUID().toString();
        HttpSession session = request.getSession();
        session.setAttribute("Referer", referer);
        session.setAttribute("wechatState", wechatState);
        session.setAttribute("redirect_uri", redirect_uri);
        session.setAttribute("state", state);
        session.setAttribute("authorize_uri", authorize_uri);
        session.setAttribute("response_type", response_type);
        session.setAttribute("client_id", client_id);
        module.put("wechat", "true");
        String clientId, clientSecret;
        if (referer != null) {
            if (referer.contains("www.jiaoshilou.com")) {
                clientId = wechatClientId.split(":")[0];
                clientSecret = wechatClientSecret.split(":")[0];
            } else if (referer.contains("www.k15ai.com")) {
                clientId = wechatClientId.split(":")[2];
                clientSecret = wechatClientSecret.split(":")[2];
            } else {
                clientId = wechatClientId.split(":")[1];
                clientSecret = wechatClientSecret.split(":")[1];
            }
        } else {
            clientId = wechatClientId.split(":")[1];
            clientSecret = wechatClientSecret.split(":")[1];
        }
        module.put("appid", clientId);
        module.put("redirect_uri", propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/wechat/callback");
        module.put("authorize_uri", wechatUserAuthorizationUri);
        module.put("state", wechatState);
        module.put("response_type", OauthController.CODE);
        module.put("scope", "snsapi_login");
        module.put("href", href);
        return "redirect_to_oauth2server";
    }
}
