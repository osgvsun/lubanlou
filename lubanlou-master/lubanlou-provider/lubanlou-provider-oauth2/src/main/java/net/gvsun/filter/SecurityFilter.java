package net.gvsun.filter;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.entity.OauthClientDetail;
import net.gvsun.entity.Token;
import net.gvsun.repository.OauthClientDetailRepository;
import net.gvsun.service.redis.RedisService;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

//@WebFilter("/security/*")
public class SecurityFilter implements Filter {
    private OauthClientDetailRepository oauthClientDetailRepository;
    private PropertiesConfigure propertiesConfigure;
    private RedisService redisService;

    @Override
    public void init(FilterConfig filterConfig) {
        ServletContext servletContext = filterConfig.getServletContext();
        ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        this.oauthClientDetailRepository = ctx.getBean("oauthClientDetailRepository", OauthClientDetailRepository.class);
        this.propertiesConfigure = ctx.getBean("propertiesConfigure", PropertiesConfigure.class);
        this.redisService = ctx.getBean("redisService", RedisService.class);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        String authorization = httpServletRequest.getHeader("Authorization");
        if (!StringUtils.isEmpty(authorization)) {
            if (authorization.startsWith("Basic")) {
                authorization = authorization.substring("Basic ".length());
                Base64.Decoder decoder = Base64.getDecoder();
                byte[] decode = decoder.decode(authorization);
                String decodedAuthorization = new String(decode, StandardCharsets.UTF_8);
                String[] split = decodedAuthorization.split(":");
                if (split.length < 2) {
                    httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
                } else {
                    String clientId = URLDecoder.decode(split[0], "UTF-8");
                    String clientSecret = URLDecoder.decode(split[1], "UTF-8");
                    if (clientId.equals("oauth2") && clientSecret.equals("oauth2")) {
                        chain.doFilter(request, response);
                    } else {
                        OauthClientDetail client = oauthClientDetailRepository.findByClientIdAndClientSecret(clientId, clientSecret);
                        if (client != null) {
                            chain.doFilter(request, response);
                        } else {
                            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
                        }
                    }
                }
            } else if (authorization.startsWith("Bearer")) {
                authorization = authorization.substring("Bearer ".length());
                Token byAccessToken = redisService.findByAccessToken(authorization);
                if (byAccessToken != null) {
                    chain.doFilter(request, response);
                } else
                    httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
            } else {
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "authorization_not_support");
            }
        } else {
            httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
            httpServletResponse.addHeader("WWW-Authenticate", "Basic realm=\"did you want to manager user?\"");
        }
    }

    @Override
    public void destroy() {

    }
}
