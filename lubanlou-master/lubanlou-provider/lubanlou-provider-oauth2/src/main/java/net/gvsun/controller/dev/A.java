package net.gvsun.controller.dev;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.entity.Token;
import net.gvsun.entity.User;
import net.gvsun.oauth2.dto.Oauth2Authentication;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.TokenService;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@Slf4j
@RestController
@CrossOrigin
public class A {
    private final TokenService tokenService;
    private final UserDetailService userDetailService;
    private final PropertiesConfigure propertiesConfigure;
    private final RedisService redisService;
    private final UserRepository userRepository;

    @Autowired
    public A(TokenService tokenService,
             UserDetailService userDetailService,
             PropertiesConfigure propertiesConfigure,
             RedisService redisService,
             UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userDetailService = userDetailService;
        this.propertiesConfigure = propertiesConfigure;
        this.redisService = redisService;
        this.userRepository = userRepository;
    }

    @GetMapping(value = {"/user/me/phone"})
    public Principal phone(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String access_token = request.getParameter("access_token");
        String phone = request.getParameter("phone");
        if (StringUtils.isEmpty(access_token)) {
            access_token = tokenService.getTokenFromHeader(request);
        }
        Token token = redisService.findByAccessToken(access_token);
        if (!StringUtils.isEmpty(phone)) {
            User user = userRepository.findByPhone(phone);
            String clientId = token.getClientId();
            Oauth2Authentication userAuthentication = new Oauth2Authentication(null, null);
            try {
                userAuthentication = userDetailService.getUserAuthentication(user.getUsername(),phone, clientId, UserDetailService.FROM_OAUTH2);
            } catch (Exception e) {
                log.warn(String.format("从OAuth2获取用户%s的权限失败:%s", user.getUsername(), e.getMessage()));
            }
            ClientDatabaseContextHolder.clear();
            return userAuthentication;
        } else {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_access_token");
            return null;
        }
    }
}
