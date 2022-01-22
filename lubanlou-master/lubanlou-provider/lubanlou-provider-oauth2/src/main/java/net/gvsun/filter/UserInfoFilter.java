package net.gvsun.filter;

import net.gvsun.entity.Token;
import net.gvsun.service.redis.RedisService;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@WebFilter("/user/me")
public class UserInfoFilter implements Filter {
    private RedisService redisService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        ServletContext servletContext = filterConfig.getServletContext();
        ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        this.redisService = ctx.getBean("redisService", RedisService.class);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        String authorization = httpServletRequest.getHeader("Authorization");
        if (!StringUtils.isEmpty(authorization)) {
            //解析出访问令牌，查询数据库中是否存在该令牌
            authorization = authorization.substring("Bearer ".length());
            Token byAccessToken = redisService.findByAccessToken(authorization);
            if (byAccessToken != null) {
                chain.doFilter(request, response);
            } else
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
        } else if (!StringUtils.isEmpty(httpServletRequest.getParameter("access_token"))) {
            String access_token = httpServletRequest.getParameter("access_token");
            Token byAccessToken = redisService.findByAccessToken(access_token);
            if (byAccessToken != null) {
                chain.doFilter(request, response);
            } else
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
        } else {
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "invalid_client");
        }
    }

    @Override
    public void destroy() {

    }
}
