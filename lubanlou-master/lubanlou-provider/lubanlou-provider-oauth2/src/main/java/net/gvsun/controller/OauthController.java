package net.gvsun.controller;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabase;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.entity.User;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.OauthClientDetail;
import net.gvsun.repository.OauthClientDetailRepository;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.AuthorizationService;
import net.gvsun.service.CookieService;
import net.gvsun.service.TokenService;
import net.gvsun.service.redis.RedisService;
import net.gvsun.util.AesUtil;
import net.gvsun.oauth2.internal.Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;


/**
 * Oauth2核心协议，支持的协议包括：
 * 1. 授权码许可类型
 * 2. 客户端凭据许可类型
 * 第一个协议用于单点登陆，或者访问微服务时由用户介入进行授权
 * 第二个协议不由用户介入进行授权，返回JWT令牌
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j
@Controller
@CrossOrigin
@RequestMapping("/oauth")
public class OauthController {
    public final static String AUTHORIZATION_CODE = "authorization_code";
    public final static String CLIENT_CREDENTIALS = "client_credentials";
    public final static String REFRESH_TOKEN = "refresh_token";
    public final static String CODE = "code";//授权码许可类型
    private final OauthClientDetailRepository oauthClientDetailRepository;
    private final TokenService tokenService;
    private final CookieService cookieService;
    private final AuthorizationService authorizationService;
    private final PropertiesConfigure propertiesConfigure;
    private final RedisService redisService;
    private final ClientDatabaseContext clientDatabaseContext;
    @Value("${resourceContainerHost}")
    public String resourceContainerHost;

    @Autowired
    public OauthController(OauthClientDetailRepository oauthClientDetailRepository,
                           TokenService tokenService,
                           CookieService cookieService,
                           AuthorizationService authorizationService,
                           PropertiesConfigure propertiesConfigure,
                           ClientDatabaseContext clientDatabaseContext,
                           RedisService redisService) {
        this.oauthClientDetailRepository = oauthClientDetailRepository;
        this.tokenService = tokenService;
        this.cookieService = cookieService;
        this.authorizationService = authorizationService;
        this.propertiesConfigure = propertiesConfigure;
        this.clientDatabaseContext = clientDatabaseContext;
        this.redisService = redisService;
    }

    /**
     * 获取授权码
     *
     * @param client_id     客户端ID
     * @param redirect_uri  客户端指定的重定向地址
     * @param response_type 授权类型（授权码许可类型:code）
     * @param state         客户端指定的state
     * @param scope         请求哪些权限
     */
    @RequestMapping(value = "/authorize", method = {RequestMethod.POST, RequestMethod.GET})
    public String authorize(@RequestParam String client_id,
                            @RequestParam String redirect_uri,
                            @RequestParam String response_type,
                            @RequestParam(required = false) String state,
                            @RequestParam(required = false) String scope,
                            @RequestParam(required = false) String error,
                            HttpServletRequest request,
                            HttpServletResponse response,
                            Map<String, Object> module) {
        long start = System.currentTimeMillis();
        module.put("enableLoginByPhone", propertiesConfigure.getEnableLoginByPhone());
        //检查客户端是否注册
        OauthClientDetail client = oauthClientDetailRepository.findByClientId(client_id);
        if (client == null) {
            log.warn(String.format("客户端[%s]未注册，禁止访问", client_id));
            return "redirect:/login";
        }
        if (!CODE.equals(response_type)) {
            log.warn(String.format("授权类型[%s]不支持，禁止访问", response_type));
            return "redirect:/login";
        }
        request.getSession().setAttribute("gitlabEnable", propertiesConfigure.getGitlabEnable());
        request.getSession().setAttribute("wechatEnable", propertiesConfigure.getWechatEnable());
        request.getSession().setAttribute("qqEnable", propertiesConfigure.getQqEnable());

        request.getSession().setAttribute("passwordEncode", propertiesConfigure.getPasswordEncode());
        boolean exist = cookieService.hasCookieFromRedis(request, propertiesConfigure.OAUTH2COOKIE);
        String authorize_uri;
        if (redirect_uri.contains("/uia")) {
            authorize_uri = redirect_uri.substring(0, redirect_uri.indexOf("/uia")) + "/uaa/oauth/authorize";
            authorize_uri =  authorize_uri.replace("8550","8765");
        } else {
            authorize_uri = propertiesConfigure.getServerHost(request) + propertiesConfigure.getContextPath() + "/oauth/authorize";
        }
        System.out.printf("authorize_uri=%s\n", authorize_uri);

        if (exist) {
            //用户已经授权，直接生成授权码
            String username = (String) request.getSession().getAttribute("username");
            if (username == null) {//会话过期
                String cookie = cookieService.getCookie(request, propertiesConfigure.OAUTH2COOKIE);
                cookieService.deleteCookieFromRedis(cookie);
                module.put("client_id", client_id);
                module.put("redirect_uri", redirect_uri);
                module.put("authorize_uri", authorize_uri);
                module.put("state", state);
                module.put("response_type", response_type);
                module.put("resourceContainerHost", resourceContainerHost);
                module.put("AES_KEY", AesUtil.AES_KEY);
                log.error("会话过期,authorize耗时：{}ms", System.currentTimeMillis() - start);
                return "login";
            } else {
                String schoolName = cookieService.getCookie(request, ClientDatabase.COOKIE_KEY);
                if (StringUtils.isEmpty(schoolName)) {
                    schoolName = clientDatabaseContext.getCurrentDataSourceDto().getSchoolName();
                }

                // 这里把从cookie中拿到的参数phone也放进去
                Cookie[] cookies = request.getCookies();
                String phone = "";
                for (int i = 0; i < cookies.length; i++) {
                    if (Objects.equals(cookies[i].getName(),LoginController.DATASOURCE_PHONE_KEY)){
                        phone = cookies[i].getValue();
                    }
                }
                String code = Encoder.encode2Base64(StringUtils.isEmpty(schoolName) ? username : (username + ":" + schoolName+(StringUtils.isEmpty(phone)?"":":"+phone)));
                code = code.replaceAll("\\+", "-").replaceAll("/", "_");
                module.put("redirect_uri", redirect_uri);
                module.put("code", code);
                module.put("state", state);

                Cookie cookie = new Cookie(PropertiesConfigure.SSOUT_USERNAME, schoolName + "." + username+(StringUtils.isEmpty(phone)?"":"."+phone));
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                response.addCookie(cookie);
                log.info("authorize耗时：{}ms", System.currentTimeMillis() - start);
                return "redirect_to_client";
            }
        } else {//重定向到登陆页面
            if (!StringUtils.isEmpty(error)) {
                module.put("error", error);
            }
            module.put("client_id", client_id);
            module.put("redirect_uri", redirect_uri);
            module.put("authorize_uri", authorize_uri);
            module.put("state", state);
            module.put("response_type", response_type);
            module.put("resourceContainerHost", resourceContainerHost);
            module.put("AES_KEY", AesUtil.AES_KEY);
            log.info("重定向到登陆页面,authorize耗时：{}ms", System.currentTimeMillis() - start);
            return "login";
        }
    }

    @PostMapping("/token")
    @ResponseBody
    public Map<String, String> token(HttpServletRequest request,
                                     HttpServletResponse response,
                                     @RequestParam String grant_type,
                                     @RequestParam(defaultValue = "") String code) throws Exception {
        long start = System.currentTimeMillis();
        // 首先，需要确定发出请求的是哪一个客户端。OAuth提供了多种供客户端向授权服务器进行身份认证的方法。
        // 对于这个简单的授权服务器，支持最常用的方法：使用HTTP基本认证传递客户端ID和客户端密钥
        String[] authorization = authorizationService.getUsernameAndSecretFromHeader(request);
        if (authorization != null) {
            String clientId = authorization[0];
            String clientSecret = authorization[1];
            // 检查客户端是否注册过
            OauthClientDetail client = oauthClientDetailRepository.findByClientIdAndClientSecret(clientId, clientSecret);
            // 如果找到客户端端ID并且接收到的客户端密钥与正确的客户端密钥一致，则生成访问令牌
            // 否则，返回错误信息
            if (client != null) {
                // 应该检查grant_type参数，以确保收到的许可类型是本服务支持的。
                // 如果接收到不支持的许可类型，则需要返回错误信息。
                Map<String, String> map = new HashMap<>();
                String username = null;
                Map<String, String> payload = null;
                switch (grant_type) {
                    case AUTHORIZATION_CODE:
                        // 客户端通过授权码获取访问令牌
                        if (/*code.equals(client.getCode())*/true) {
                            // 颁发JWT令牌，该令牌用于访问用户信息
                            code = code.replaceAll("-", "+").replaceAll("_", "/");
                            String s = Encoder.decodeFromBase64(code);
                            String[] split = s.split(":");
                            username = split[0];
                            String schoolName = split[1];
                            payload = new HashMap<>();
                            payload.put("username", username);
                            // 如果长度大于2才赋值给phone
                            payload.put("phone",split.length > 2 ?split[2]:"");
                            payload.put("datasource.token.schoolName", schoolName);
                            log.error("payload4:"+payload.toString());
                            map = tokenService.generateToken(clientId, payload);
                        } else {
                            response.sendError(HttpStatus.BAD_REQUEST.value(), "invalid_grant");
                        }
                        break;
                    case CLIENT_CREDENTIALS://客户端通过凭据获取访问令牌
                        payload = getPayloadFromRequest(request);
                        log.error("payload5:"+payload.toString());
                        map = tokenService.generateToken(clientId, payload);
                        break;
                    case REFRESH_TOKEN://通过刷新令牌获取访问令牌
                        payload = getPayloadFromRequest(request);
                        String refresh_token = request.getParameter("refresh_token");
                        log.error("payload6:"+payload.toString());
                        map = tokenService.generateToken(clientId, payload);
                        if (map == null) {
                            response.sendError(HttpStatus.BAD_REQUEST.value(), "invalid_refresh_token");
                        }
                        break;
                    default:
                        response.sendError(HttpStatus.BAD_REQUEST.value(), "unsupported_grant_type");
                        break;
                }
                log.info("token耗时:{}ms", System.currentTimeMillis() - start);
                return map;
            } else {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
            }
        } else {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
        }
        return null;
    }

    @GetMapping("/checkToken")
    @ResponseBody
    public ResultDataDto<String> checkToken(@RequestParam String access_token) {
        ResultDataDto<String> resultDataDto = new ResultDataDto<>(0, "success");
        if (!tokenService.checkJwtToken(access_token)) {
            redisService.deleteAccessToken(access_token);
            resultDataDto.setCode(1);
            resultDataDto.setMsg("验证失败：JWT令牌被被篡改或已经过期，请重新获取令牌");
        }
        return resultDataDto;
    }


    /**
     * 用户退出某个系统之后，所有系统都退出登陆，清除cookie，回收给该系统颁发的令牌
     */
    @RequestMapping("/logout")
    public void logout(@RequestParam(value = "url") String callbackUrl,
                       HttpServletRequest request, HttpServletResponse response) throws IOException {
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
        request.getSession().invalidate();
        response.sendRedirect(callbackUrl);
    }

    @GetMapping("/OAuth2.js")
    public void getResourceContainerJS(HttpServletResponse response) {
        InputStream in = this.getClass().getResourceAsStream("/static/js/OAuth2.js");
        byte[] bytes = new byte[1024];
        int length = 0;
        try {
            response.setHeader("Content-Type", "application/javascript; charset=UTF-8");
            ServletOutputStream out = response.getOutputStream();
            while ((length = in.read(bytes)) != -1) {
                out.write(bytes, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Map<String, String> getPayloadFromRequest(HttpServletRequest request) {
        Map<String, String> payload = new HashMap<>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String name = parameterNames.nextElement();
            if (!name.equals(AUTHORIZATION_CODE) && !name.equals(REFRESH_TOKEN)
                    && !name.equals(CLIENT_CREDENTIALS) && !name.equals(CODE)
                    && !name.equals("access_token") && !name.equals("expires_in")
                    && !name.equals("token_type")) {
                payload.put(name, request.getParameter(name));
            }
        }
        return payload;
    }
}
