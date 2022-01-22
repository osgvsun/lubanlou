package net.gvsun.controller;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.Token;
import net.gvsun.oauth2.dto.Oauth2Authentication;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.TokenService;
import net.gvsun.service.UnifySessionService;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.redis.RedisService;
import net.gvsun.session.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Objects;

/**
 * 获取用户信息
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j
@RestController
@CrossOrigin
public class UserInfoController {
    private final TokenService tokenService;
    private final UserDetailService userDetailService;
    private final RedisService redisService;
    private final UserRepository userRepository;
    private final PropertiesConfigure propertiesConfigure;
    private final UnifySessionService unifySessionService;

    @Autowired
    public UserInfoController(TokenService tokenService,
                              UserDetailService userDetailService,
                              RedisService redisService,
                              UserRepository userRepository,
                              PropertiesConfigure propertiesConfigure,
                              UnifySessionService unifySessionService) {
        this.tokenService = tokenService;
        this.userDetailService = userDetailService;
        this.redisService = redisService;
        this.userRepository = userRepository;
        this.propertiesConfigure = propertiesConfigure;
        this.unifySessionService = unifySessionService;
    }

    @GetMapping(value = {"/me", "/user/me"})
    public Principal me(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long start = System.currentTimeMillis();
        String access_token = request.getParameter("access_token");
        if (StringUtils.isEmpty(access_token)) {
            access_token = tokenService.getTokenFromHeader(request);
        }
        Token token = redisService.findByAccessToken(access_token);
        if (tokenService.checkJwtToken(access_token)) {
            Map<String, String> map = tokenService.getJwtContent(access_token);
            String username = tokenService.getUsernameFromJwtTokenPayload(map.get("payload"));
            String phone = tokenService.getPhoneFromJwtTokenPayload(map.get("payload"));
            // 这里由于不同数据源下会存在username不一致的问题，添加以下代码
            if (Objects.isNull(userRepository.findByUsername(username))&&!StringUtils.isEmpty(phone)){
                net.gvsun.entity.User phoneUser = userRepository.findByPhone(phone);
                username = Objects.isNull(phoneUser)?username:phoneUser.getUsername();
            }
            // 为什么从载荷里获取数据源，而不是从HEADER里，是因为发起请求方是后端代码，而不是浏览器
            String schoolName = tokenService.getSchoolNameFromJwtTokenPayload(map.get("payload"));
            ClientDatabaseContextHolder.set(schoolName);
            String clientId = request.getParameter("clientId");
            if (StringUtils.isEmpty(clientId)) {
                clientId = token.getClientId();
            }
            Oauth2Authentication userAuthentication = new Oauth2Authentication(null, null);
            try {
                userAuthentication = userDetailService.getUserAuthentication(username, phone,clientId, UserDetailService.FROM_OAUTH2);
            } catch (Exception e) {
                log.warn(String.format("从OAuth2获取用户%s的权限失败:%s", username, e.getMessage()));
                response.sendError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
                return null;
            }
            ClientDatabaseContextHolder.clear();
            log.info("/me耗时:{}ms", System.currentTimeMillis() - start);
            return userAuthentication;
        } else {
            log.error("invalid_access_token");
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_access_token");
            return null;
        }
    }

    /**
     * 查询用户是否被禁用
     *
     * @param username 用户名
     */
    @GetMapping("/enabled/{username}")
    public ResultDataDto<Boolean> enabled(@PathVariable String username) {
        ResultDataDto<Boolean> res = new ResultDataDto<>(0, "success");
        try {
            boolean enabled = userDetailService.enabled(username);
            res.setData(enabled);
        } catch (RuntimeException e) {
            res.setCode(1);
            res.setMsg(e.getMessage());
        }
        return res;
    }
// TODO:开放接口存在安全问题，暂时隐掉
//    /**
//     * 获取用户信息
//     */
//    @GetMapping("/user/{username}")
//    public net.gvsun.entity.User getUser(@PathVariable String username) {
//        net.gvsun.entity.User user = userRepository.findByUsername(username);
//        return user;
//    }

    @GetMapping("/session/user")
    public net.gvsun.session.dto.User getUser2(@RequestParam String username) {
        System.out.println(ClientDatabaseContextHolder.getClientDatabaseOri());
        final User user = unifySessionService.getUser(username);
        System.out.println(user);
        return user;
    }

    @GetMapping("/enableLoginByPhone")
    public boolean enableLoginByPhone() {
        return propertiesConfigure.getEnableLoginByPhone();
    }
}
