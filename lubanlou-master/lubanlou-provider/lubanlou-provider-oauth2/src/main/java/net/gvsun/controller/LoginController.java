package net.gvsun.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.code.kaptcha.Producer;
import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabase;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.entity.OperationLog;
import net.gvsun.entity.User;
import net.gvsun.repository.OperationLogRepository;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.*;
import net.gvsun.service.datasource.DatasourceService;
import net.gvsun.service.datasource.InvalidCacheService;
import net.gvsun.service.redis.RedisService;
import net.gvsun.service.usercenter.UserCenterService;
import net.gvsun.util.AesUtil;
import net.gvsun.oauth2.internal.Encoder;
import org.hibernate.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.*;

/**
 * 单点登录功能
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j
@Controller
@CrossOrigin
public class LoginController {
    public static String DATASOURCE_PASSWORD_KEY = "datasource.ppp";
    public static String DATASOURCE_PHONE_KEY = "datasource.phone";
    private final UserRepository userRepository;
    private final PropertiesConfigure propertiesConfigure;
    private final Producer captchaProducer;
    private final UserDetailService userDetailService;
    private final UserCenterService userCenterService;
    private final LoginStatisticService loginStatisticService;
    private final InvalidCacheService invalidCacheService;
    private final UnifySessionService unifySessionService;
    private final JdbcOperations jdbcOperations;
    private final RedisService redisService;
    private final OperationLogRepository operationLogRepository;
    @Value("${resourceContainerHost}")
    public String resourceContainerHost;
    @Value("${apiSuccessfulJump}")
    public String apiSuccessfulJump;
    private CookieService cookieService;
    private LoginService loginService;
    private DatasourceService datasourceService;
    private final TokenService tokenService;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public LoginController(UserRepository userRepository,
                           PropertiesConfigure propertiesConfigure,
                           Producer captchaProducer,
                           UserDetailService userDetailService,
                           UnifySessionService unifySessionService, CookieService cookieService, LoginService loginService,
                           DatasourceService datasourceService,
                           UserCenterService userCenterService,
                           LoginStatisticService loginStatisticService,
                           InvalidCacheService invalidCacheService,
                           JdbcOperations jdbcOperations,
                           RedisService redisService, OperationLogRepository operationLogRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.propertiesConfigure = propertiesConfigure;
        this.captchaProducer = captchaProducer;
        this.userDetailService = userDetailService;
        this.unifySessionService = unifySessionService;
        this.cookieService = cookieService;
        this.loginService = loginService;
        this.datasourceService = datasourceService;
        this.userCenterService = userCenterService;
        this.loginStatisticService = loginStatisticService;
        this.invalidCacheService = invalidCacheService;
        this.jdbcOperations = jdbcOperations;
        this.redisService = redisService;
        this.operationLogRepository = operationLogRepository;
        this.tokenService = tokenService;
    }

    /**
     * 用户首次登录系统
     *
     * @param username      用户名
     * @param password      密码
     * @param redirect_uri  客户端重定向地址
     * @param state         客户端发来的状态
     * @param authorize_uri 获取授权码的地址
     * @param response_type 授权类型
     * @param client_id     客户端ID
     */
    @PostMapping("/login")
    public String formLogin(@RequestParam String username, @RequestParam String password,
                            @RequestParam String redirect_uri, @RequestParam String state,
                            @RequestParam String authorize_uri, @RequestParam String response_type,
                            @RequestParam String client_id, HttpServletRequest request,
                            HttpServletResponse response,
                            Map<String, Object> module) throws Exception {
        System.out.println("进入login");
        if (propertiesConfigure.getPasswordEncode())
            password = loginService.aesDecrypt(password);
        module.put("enableLoginByPhone", propertiesConfigure.getEnableLoginByPhone());
        String targetSchoolName = null;
        User user = null;
        String phone = null;
        LoginService loginService = this.loginService.checkForLogin(request);
        LoginService.ERROR errorType = loginService.getErrorType();
        // 无任何报错来这里
        if (errorType == null) {
            user = loginService.getUser();
            targetSchoolName = loginService.getTargetSchoolName();
            System.out.println("targetSchoolName=" + targetSchoolName);
            ClientDatabaseContextHolder.set(targetSchoolName);
            username = user.getUsername();
            phone = user.getPhone();
            net.gvsun.session.dto.User u = unifySessionService.addUser2Session(null, user, request);
            if (u != null) {
                Map<String, String> payload = new HashMap<>();
                try {
                    Map<String, String> map = new HashMap<>();
                    map.put("username", u.getUsername());
                    map.put("phone", u.getPhone());
                    payload.put("user", objectMapper.writeValueAsString(map));
                    log.error("payload2:"+payload.toString());
                    Map<String, String> token = tokenService.generateToken("oauth2", payload);
                    System.out.println(token.get("uaa.access_token"));
                    Cookie tokenC = new Cookie("uaa.access_token", token.get("access_token"));
                    tokenC.setHttpOnly(true);
                    tokenC.setPath("/");
                    //注意Cookie太长
                    response.addCookie(tokenC);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        if (errorType == null) {
            Object wechat_openid = request.getSession().getAttribute("wechat_openid");
            Object gitlab_username = request.getSession().getAttribute("gitlab_username");
            Object qq_opeid = request.getSession().getAttribute("qq_opeid");
            Object unionid = request.getSession().getAttribute("unionid");
            if (wechat_openid != null) {
                request.getSession().removeAttribute("wechat_openid");
                userDetailService.boundUserWeChat(username, password, wechat_openid.toString());
                invalidCacheService.getUserDataSourcesByWechat(wechat_openid.toString());
            }
            if (gitlab_username != null) {
                request.getSession().removeAttribute("gitlab_username");
                userDetailService.boundUserGitlab(username, password, gitlab_username.toString());
                invalidCacheService.getUserDataSourcesByGitlab(gitlab_username.toString());
            }
            if (qq_opeid != null) {
                request.getSession().removeAttribute("qq_opeid");
                userDetailService.boundUserQQ(username, password, qq_opeid.toString());
                invalidCacheService.getUserDataSourcesByQQ(qq_opeid.toString());
            }
            if (unionid != null) {
                request.getSession().removeAttribute("unionid");
                userDetailService.boundUserUnionId(username, password, unionid.toString(), UserDetailService.BoundType.USERNAME);
                invalidCacheService.getUserDataSourcesByUnionId(unionid.toString());
            }
            //生成cookie
            String cookieValue = UUID.randomUUID().toString();
            Cookie cookie = new Cookie(propertiesConfigure.OAUTH2COOKIE, cookieValue);
            cookie.setPath("/");

            Cookie datasourceCookie = new Cookie(ClientDatabase.COOKIE_KEY, targetSchoolName);
            datasourceCookie.setPath("/");

            Cookie pw = new Cookie(DATASOURCE_PASSWORD_KEY, Encoder.encode2Base64(password));
            pw.setPath("/");
            pw.setHttpOnly(true);

            if (!StringUtils.isEmpty(phone)) {
                Cookie ph = new Cookie(DATASOURCE_PHONE_KEY, phone);
                ph.setPath("/");
                ph.setHttpOnly(true);
                response.addCookie(ph);
            }

            response.addCookie(cookie);
            response.addCookie(datasourceCookie);
            response.addCookie(pw);
            cookieService.addCookieToRedis(username, cookieValue);
            module.put("redirect_uri", redirect_uri);
            module.put("authorize_uri", authorize_uri);
            module.put("client_id", client_id);
            module.put("state", state);
            module.put("response_type", response_type);
            request.getSession().setAttribute("username", user.getUsername());
            return "redirect_to_oauth2server";
        } else {
            String error;
            if (errorType == LoginService.ERROR.USERNAME_NOT_EXIST) {
                error = "登录失败：用户名不存在/密码错误";
            } else if (errorType == LoginService.ERROR.CAPTCHA_INCORRECT) {
                error = "登录失败：验证码错误";
            } else if (errorType == LoginService.ERROR.USER_DISABLED) {
                error = "登录失败：该用户已被禁用";
            } else if (errorType == LoginService.ERROR.USER_PHONE_NOT_EXIST) {
                error = "登录失败：手机号不存在/密码错误";
            } else if (errorType == LoginService.ERROR.FIRST_LOGGING) {
                error = "登录失败：首次登陆，请点击右下角【忘记密码】进行修改密码";
            } else {
                error = "未知错误";
            }
            System.out.println("登录失败提示：" + error);
            if (request.getSession().getAttribute("wechatEnable") == null) {
                request.getSession().setAttribute("gitlabEnable", propertiesConfigure.getGitlabEnable());
                request.getSession().setAttribute("wechatEnable", propertiesConfigure.getWechatEnable());
                request.getSession().setAttribute("qqEnable", propertiesConfigure.getQqEnable());
                request.getSession().setAttribute("passwordEncode", propertiesConfigure.getPasswordEncode());
            }


            module.put("error", error);
            module.put("redirect_uri", redirect_uri);
            module.put("authorize_uri", authorize_uri);
            module.put("client_id", client_id);
            module.put("state", state);
            module.put("response_type", response_type);
            module.put("resourceContainerHost", resourceContainerHost);
            module.put("AES_KEY", AesUtil.AES_KEY);
            return String.format("redirect:%s?redirect_uri=%s&client_id=%s&response_type=%s&state=%s&error=%s", authorize_uri, redirect_uri, client_id, response_type, state, URLEncoder.encode(error, "UTF8"));
        }
    }

    /**
     * 第三方账号登录系统
     */
    @GetMapping("/login")
    public String thirdPartyLogin(@RequestParam(required = false) String gitlab_username,
                                  @RequestParam(required = false) String qq_opeid,
                                  @RequestParam(required = false) String wechat_openid,
                                  @RequestParam(required = false) String unionid,
                                  @RequestParam(required = false) String SJTU_user_no,
                                  @RequestParam(required = false) String HDU_user_no,
                                  @RequestParam(required = false) String SUFE_user_no,
                                  @RequestParam(required = false) String zisu_user_no,
                                  @RequestParam(required = false) String dljt_user_no,
                                  @RequestParam(required = false) String wz_user_no,
                                  @RequestParam(required = false) String skd_user_no,
                                  @RequestParam(required = false) String cd_user_no,
                                  @RequestParam(required = false) String xaau_user_no,
                                  @RequestParam(required = false) String hust_user_no,
                                  @RequestParam(required = false) String swufe_user_no,
                                  @RequestParam String redirect_uri,
                                  @RequestParam String state,
                                  @RequestParam String authorize_uri, @RequestParam String response_type,
                                  @RequestParam String client_id, HttpServletRequest request,
                                  HttpServletResponse response,
                                  Map<String, Object> module) {
        module.put("enableLoginByPhone", propertiesConfigure.getEnableLoginByPhone());
        int USER_NOT_FOUND_ERR = 1;
        int MULTI_OPENID_ERR = 2;
        int error_type = 0;
        User user = null;
        String s = "";
        String[] targetSchoolName = new String[1];
        String savedSchoolName = cookieService.getCookie(request, ClientDatabase.COOKIE_KEY);
        try {
            if (!StringUtils.isEmpty(gitlab_username)) {
                s = "gitlab";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByGitlab(gitlab_username);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByGitlabUsername(gitlab_username);
                    ClientDatabaseContextHolder.clear();
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                if (user == null) {
                    request.getSession().setAttribute("gitlab_username", gitlab_username);
                }
                loginStatisticService.stat(DatasourceService.LoginType.GITLAB, gitlab_username);
            } else if (!StringUtils.isEmpty(qq_opeid)) {
                s = "qq";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByQQ(qq_opeid);
                LinkedList<GvsunDataSourceDto> lds = new LinkedList<>(ds);
                lds.sort((o1, o2) -> {
                    if (o1.isDefaultDataSource())
                        return -1;
                    else if (o2.isDefaultDataSource())
                        return 1;
                    else
                        return 0;
                });
                if (lds.size() > 0) {
                    ClientDatabaseContextHolder.set(lds.get(0).getSchoolName());
                    targetSchoolName[0] = lds.get(0).getSchoolName();
                    user = userRepository.findByQqOpenId(qq_opeid);
                    ClientDatabaseContextHolder.clear();
                    if (!StringUtils.isEmpty(savedSchoolName))
                        for (GvsunDataSourceDto d : lds) {
                            if (d.getSchoolName().equals(savedSchoolName)) {
                                targetSchoolName[0] = savedSchoolName;
                                break;
                            }
                        }
                }
                if (user == null) {
                    request.getSession().setAttribute("qq_opeid", qq_opeid);
                }
                loginStatisticService.stat(DatasourceService.LoginType.QQ, qq_opeid);
            } else if (!StringUtils.isEmpty(wechat_openid)) {
                s = "wechat";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByWechat(wechat_openid);
                LinkedList<GvsunDataSourceDto> lds = new LinkedList<>(ds);
                lds.sort((o1, o2) -> {
                    if (o1.isDefaultDataSource())
                        return -1;
                    else if (o2.isDefaultDataSource())
                        return 1;
                    else
                        return 0;
                });
                if (lds.size() > 0) {
                    ClientDatabaseContextHolder.set(lds.get(0).getSchoolName());
                    targetSchoolName[0] = lds.get(0).getSchoolName();
                    user = userRepository.findByWechatOpenId(wechat_openid);
                    ClientDatabaseContextHolder.clear();
                    if (!StringUtils.isEmpty(savedSchoolName))
                        for (GvsunDataSourceDto d : lds) {
                            if (d.getSchoolName().equals(savedSchoolName)) {
                                targetSchoolName[0] = savedSchoolName;
                                break;
                            }
                        }
                }
                if (user == null) {
                    request.getSession().setAttribute("wechat_openid", wechat_openid);
                    request.getSession().setAttribute("unionid", unionid);
                }
                loginStatisticService.stat(DatasourceService.LoginType.WECHAT, unionid);
            } else if (!StringUtils.isEmpty(SJTU_user_no)) {
                s = "SJTU";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesBySJTUUserNo(SJTU_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(SJTU_user_no);
                    ClientDatabaseContextHolder.clear();
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.SJTU, SJTU_user_no);
            } else if (!StringUtils.isEmpty(HDU_user_no)) {
                s = "HDU";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByHDUUserNo(HDU_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(HDU_user_no);
                    ClientDatabaseContextHolder.clear();
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.HDU, HDU_user_no);
            } else if (!StringUtils.isEmpty(SUFE_user_no)) {
                s = "SUFE";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesBySUFEUserNo(SUFE_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(SUFE_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.SUFE, SUFE_user_no);
            } else if (!StringUtils.isEmpty(zisu_user_no)) {
                s = "ZISU";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByZISUUserNo(zisu_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUserNo(zisu_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.ZISU, zisu_user_no);
            } else if (!StringUtils.isEmpty(wz_user_no)) {
                s = "WZ";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByWZUserNo(wz_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(wz_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.WZ, wz_user_no);
            } else if (!StringUtils.isEmpty(skd_user_no)) {
                s = "SKD";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesBySKDUserNo(skd_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(skd_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.SKD, skd_user_no);
            } else if (!StringUtils.isEmpty(cd_user_no)) {
                s = "CD";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByCDUserNo(cd_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(cd_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.CD, cd_user_no);
            } else if (!StringUtils.isEmpty(xaau_user_no)) {
                s = "XAAU";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByXAAUUserNo(xaau_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(xaau_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.XAAU, xaau_user_no);
            } else if (!StringUtils.isEmpty(hust_user_no)) {
                s = "HUST";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByHUSTUserNo(hust_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(hust_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.HUST, hust_user_no);
            }
            else if (!StringUtils.isEmpty(swufe_user_no)) {
                s = "SWUFE";
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesBySWUFEUserNo(swufe_user_no);
                if (ds.size() > 0) {
                    ClientDatabaseContextHolder.set(ds.get(0).getSchoolName());
                    targetSchoolName[0] = ds.get(0).getSchoolName();
                    user = userRepository.findByUsername(swufe_user_no);
                    for (GvsunDataSourceDto d : ds) {
                        if (d.getSchoolName().equals(savedSchoolName)) {
                            targetSchoolName[0] = savedSchoolName;
                            break;
                        }
                    }
                }
                loginStatisticService.stat(DatasourceService.LoginType.SWUFE, swufe_user_no);
            }
            if (user == null)
                error_type = USER_NOT_FOUND_ERR;
            else
                ClientDatabaseContextHolder.set(targetSchoolName[0]);
        } catch (NonUniqueResultException e) {
            error_type = MULTI_OPENID_ERR;
        }

        module.put("redirect_uri", redirect_uri);
        module.put("authorize_uri", authorize_uri);
        module.put("client_id", client_id);
        module.put("state", state);
        module.put("response_type", response_type);

        if (error_type == USER_NOT_FOUND_ERR) {
            String error;
            switch (s) {
                case "SJTU":
                    error = "登录失败：未查询到您的上交账号";
                    break;
                case "HDU":
                    error = "登录失败：未查询到您的杭电账号";
                    break;
                case "SUFE":
                    error = "登录失败：未查询到您的上财账号";
                    break;
                case "ZISU":
                    error = "登录失败：未查询到您的浙江外国语账号";
                    break;
                case "WZ":
                    error = "登录失败：未查询到您的温州大学账号";
                    break;
                case "SKD":
                    error = "登录失败：未查询到您的陕科大账号";
                    break;
                case "CD":
                    error = "登录失败：未查询到您的成都电子科技大学账号";
                    break;
                case "XAAU":
                    error = "登录失败：未查询到您的西安航空学院账号";
                    break;
                case "HUST":
                    error = "登录失败：未查询到您的华中科技大学账号";
                    break;
                case "SWUFE":
                    error = "登录失败：未查询到您的西南财经账号";
                    break;
                default:
                    error = String.format("登录失败：未查询到%s账号(请使用用户名/密码登录，随后系统将自动绑定到%s)", s, s);
                    break;
            }
            System.out.println("登录失败提示：" + error);
            module.put("error", error);
            module.put("resourceContainerHost", resourceContainerHost);
            module.put("AES_KEY", AesUtil.AES_KEY);
            return "login";
        }

        if (error_type == MULTI_OPENID_ERR) {
            String error = String.format("登录失败：发现多个账户拥有同一个%s账号，您的账号可能被泄露", s);
            System.out.println("登录失败提示：" + error);
            module.put("error", error);
            module.put("resourceContainerHost", resourceContainerHost);
            return "login";
        }

        //生成cookie
        String cookieValue = UUID.randomUUID().toString();
        Cookie cookie = new Cookie(propertiesConfigure.OAUTH2COOKIE, cookieValue);
        cookie.setPath("/");
        Cookie datasourceCookie = new Cookie(ClientDatabase.COOKIE_KEY, targetSchoolName[0]);
        datasourceCookie.setPath("/");

        //把微信号、gitlab号、qq号设置为cookie
        if (!StringUtils.isEmpty(wechat_openid)) {
            Cookie wCookie = new Cookie("datasource.wechat", wechat_openid);
            wCookie.setHttpOnly(true);
            wCookie.setPath("/");
            response.addCookie(wCookie);
        }
        if (!StringUtils.isEmpty(gitlab_username)) {
            Cookie gCookie = new Cookie("datasource.gitlab", gitlab_username);
            gCookie.setHttpOnly(true);
            gCookie.setPath("/");
            response.addCookie(gCookie);
        }
        if (!StringUtils.isEmpty(qq_opeid)) {
            Cookie qCookie = new Cookie("datasource.qq", qq_opeid);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }

        if (!StringUtils.isEmpty(SJTU_user_no)) {
            Cookie qCookie = new Cookie("datasource.SJTU_user_no", SJTU_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }

        if (!StringUtils.isEmpty(HDU_user_no)) {
            Cookie qCookie = new Cookie("datasource.HDU_user_no", HDU_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(SUFE_user_no)) {
            Cookie qCookie = new Cookie("datasource.SUFE_user_no", SUFE_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(zisu_user_no)) {
            Cookie qCookie = new Cookie("datasource.ZISU_user_no", zisu_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(wz_user_no)) {
            Cookie qCookie = new Cookie("datasource.WZ_user_no", wz_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(skd_user_no)) {
            Cookie qCookie = new Cookie("datasource.SKD_user_no", skd_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(cd_user_no)) {
            Cookie qCookie = new Cookie("datasource.CD_user_no", cd_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(xaau_user_no)) {
            Cookie qCookie = new Cookie("datasource.XAAU_user_no", xaau_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(hust_user_no)) {
            Cookie qCookie = new Cookie("datasource.HUST_user_no", hust_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }
        if (!StringUtils.isEmpty(swufe_user_no)) {
            Cookie qCookie = new Cookie("datasource.SWUFE_user_no", swufe_user_no);
            qCookie.setHttpOnly(true);
            qCookie.setPath("/");
            response.addCookie(qCookie);
        }


        response.addCookie(cookie);
        response.addCookie(datasourceCookie);
        cookieService.addCookieToRedis(user.getUsername(), cookieValue);
        request.getSession().setAttribute("username", user.getUsername());
        net.gvsun.session.dto.User u = unifySessionService.addUser2Session(null, user, request);

        if (u != null) {
            Map<String, String> payload = new HashMap<>();
            try {
                Map<String, String> map = new HashMap<>();
                map.put("username", u.getUsername());
                map.put("phone", u.getPhone());
                payload.put("user", objectMapper.writeValueAsString(map));
                log.error("payload3:"+payload.toString());
                Map<String, String> token = tokenService.generateToken("oauth2", payload);
                Cookie tokenC = new Cookie("uaa.access_token", token.get("access_token"));
                tokenC.setHttpOnly(true);
                tokenC.setPath("/");
                response.addCookie(tokenC);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "redirect_to_oauth2server";
    }

    @GetMapping("/images/imagecode")
    public void getCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("image/jpeg");
        String text = captchaProducer.createText();
        request.getSession().setAttribute("captcha", text);
        BufferedImage image = captchaProducer.createImage(text);
        ServletOutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, "jpg", outputStream);
        try {
            outputStream.flush();
        } finally {
            outputStream.close();
        }
    }

    @PostMapping("/boundPhoneNumber")
    public String boundPhoneNumber(@RequestParam String username,
                                   @RequestParam String password,
                                   @RequestParam String email,
                                   @RequestParam String cname,
                                   @RequestParam String phone,
                                   @RequestParam String schoolName,
                                   @RequestParam String securityCode,
                                   @RequestParam(defaultValue = "") String testerPhone,
                                   HttpServletRequest request,
                                   Map<String, Object> module) {
        if (phone.endsWith(",")) {
            phone = phone.substring(0, phone.length() - 1);
        }
        HttpSession session = request.getSession();
        String mySecurityCode = (String) session.getAttribute("securityCode");
        module.put("web_title", "绑定结果");
        module.put("original_uri", "/index");
        if (RegisterService.isPhone(phone) == RegisterService.INPUT_TYPE.VIRTUAL_PHONE || securityCode.equals(mySecurityCode)) {
            ClientDatabaseContextHolder.set(schoolName);
            User user = userRepository.findByUsername(username);
            if (user == null) {
                module.put("success", false);
                module.put("msg", "请输入正确的工号");
            } else if (!password.equals(user.getPassword())) {
                module.put("success", false);
                module.put("msg", "请输入正确的初始密码");
            } else {
                jdbcOperations.update("update users set phone = ?, email = ?, cname = ? where username = ? and password = ?", phone, email, cname, username, password);
                userCenterService.boundPhoneNumber(username, phone, email);
                module.put("success", true);
                module.put("msg", "绑定成功");
                invalidCacheService.getUserDataSourcesByPhone(phone);
                invalidCacheService.getUserDataSourcesByUsernameAndPassword(username, password);

                OperationLog log = new OperationLog();
                log.setUsername(username);
                log.setDatetime(new Date());
                log.setResult("绑定成功");
                log.setType("绑定手机号");
                operationLogRepository.save(log);
            }
        } else {
            module.put("success", false);
            module.put("msg", "验证码不正确");
        }
        if (!((Boolean) module.get("success"))) {
            // 注册失败,值传入页面
            module.put("username", username);
            module.put("password", password);
            module.put("email", email);
            module.put("cname", cname);
            module.put("phone", phone);
            module.put("testerPhone", testerPhone);
            module.put("schoolName", schoolName);
            module.put("securityCode", securityCode);
            SiteDto siteDto = redisService.getSiteDtoFromRedis();
            List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
            module.put("dataSourceDtos", dataSourceDtos);

            OperationLog log = new OperationLog();
            log.setUsername(username);
            log.setDatetime(new Date());
            log.setResult("绑定失败：" + module.get("msg"));
            log.setType("绑定手机号");
            operationLogRepository.save(log);
        }
        module.put("resourceContainerHost", resourceContainerHost);
        module.put("apiSuccessfulJump", apiSuccessfulJump);
        return "result";
    }
}
