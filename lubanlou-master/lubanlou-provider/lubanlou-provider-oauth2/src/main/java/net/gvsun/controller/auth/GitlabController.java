package net.gvsun.controller.auth;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.controller.OauthController;
import net.gvsun.service.client.ClientService;
import net.gvsun.service.client.GitLabClientServiceImpl;
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
 * 与gitlab对接OAuth2
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Controller
@CrossOrigin
@RequestMapping("/gitlab")
public class GitlabController {
    private final PropertiesConfigure propertiesConfigure;
    private GitLabClientServiceImpl clientService;
    @Value("${gitlab.security.oauth2.client.clientId}")
    private String gitlabClientId;
    @Value("${gitlab.security.oauth2.client.clientSecret}")
    private String gitlabClientSecret;
    @Value("${gitlab.security.oauth2.client.accessTokenUri}")
    private String gitlabAccessTokenUri;
    @Value("${gitlab.security.oauth2.client.userAuthorizationUri}")
    private String gitlabUserAuthorizationUri;
    @Value("${gitlab.security.oauth2.resource.userInfoUri}")
    private String gitlabUserInfoUri;

    @Autowired
    public GitlabController(PropertiesConfigure propertiesConfigure) {
        this.propertiesConfigure = propertiesConfigure;
    }

    @Autowired
    @Qualifier("gitLabClientServiceImpl")
    public void setClientService(ClientService clientService) {
        this.clientService = (GitLabClientServiceImpl) clientService;
    }

    @GetMapping("/callback")
    public String callback(@RequestParam String code, @RequestParam String state,
                           Map<String, String> map, HttpServletRequest request) throws UnsupportedEncodingException {
        String gitlabState = (String) request.getSession().getAttribute("gitlabState");
        if (gitlabState != null && gitlabState.equals(state)) {
            String redirect_uri = propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/gitlab/callback";
            Map<String, String> response = clientService.getAccessTokenFromOAuth2Server(gitlabAccessTokenUri, gitlabClientId, gitlabClientSecret, code, redirect_uri);
            String access_token = response.get("access_token");
            String token_type = response.get("token_type");
            System.out.println(token_type);
            String scope = response.get("scope");


            //拿到访问令牌之后，获取用户信息
            Map<String, Object> userInfo = clientService.getUserInfoByAccessToken(access_token, gitlabUserInfoUri);
            String gitlab_username = userInfo.get("username").toString();
            HttpSession session = request.getSession();
            redirect_uri = (String) session.getAttribute("redirect_uri");
            state = (String) session.getAttribute("state");
            String authorize_uri = (String) session.getAttribute("authorize_uri");
            String response_type = (String) session.getAttribute("response_type");
            String client_id = (String) session.getAttribute("client_id");
            String redirect = String.format("redirect:/login?gitlab_username=%s&redirect_uri=%s&state=%s&authorize_uri=%s&response_type=%s&client_id=%s", gitlab_username, redirect_uri, state, authorize_uri, response_type, client_id);
            return redirect;
        } else {
            throw new IllegalArgumentException("state_code_mismatch");
        }
    }

    @GetMapping("/login")
    public String login(@RequestParam String redirect_uri, @RequestParam String state,
                        @RequestParam String authorize_uri, @RequestParam String response_type,
                        @RequestParam String client_id, Map<String, String> module, HttpServletRequest request) {
        String gitlabState = UUID.randomUUID().toString();
        HttpSession session = request.getSession();
        session.setAttribute("gitlabState", gitlabState);
        session.setAttribute("redirect_uri", redirect_uri);
        session.setAttribute("state", state);
        session.setAttribute("authorize_uri", authorize_uri);
        session.setAttribute("response_type", response_type);
        session.setAttribute("client_id", client_id);
        module.put("client_id", gitlabClientId);
        module.put("redirect_uri", propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/gitlab/callback");
        module.put("authorize_uri", gitlabUserAuthorizationUri);
        module.put("state", gitlabState);
        module.put("response_type", OauthController.CODE);
        return "redirect_to_oauth2server";
    }
}
