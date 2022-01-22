package net.gvsun.gsquestionpool.filter;

import lombok.SneakyThrows;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.logging.Logger;

@Component
public class WebLogFilter implements Filter {

    private final static Logger logger = Logger.getLogger(WebLogFilter.class.getName());

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void destroy() {

    }

    @SneakyThrows
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String uri = request.getRequestURI();
        if (!uri.contains(".")) {
            String user = getCurrUser();
            if (user.equals("anonymousUser")) {
                user = "匿名用户";
            }
            Set<Map.Entry<String, String[]>> entrySet = request.getParameterMap().entrySet();
            Iterator<Map.Entry<String, String[]>> iterator = entrySet.iterator();
            StringBuilder parameters = new StringBuilder();
            parameters.append("[");
            while (iterator.hasNext()) {
                Map.Entry<String, String[]> next = iterator.next();
                if (Objects.nonNull(next)) {
                    parameters.append("{");
                    parameters.append(next.getKey());
                    parameters.append("->");
                    parameters.append(Arrays.toString(next.getValue()));
                    parameters.append("}");
                }
            }
            parameters.append("]");
            logger.info(String.format("请求信息------>用户：%s,数据源：%s,请求路径：%s,请求参数：%s,IP：%s",
                    user.toString(), ClientDatabaseContextHolder.getClientDatabase(), uri,
                    parameters, getIpAddr(request)));
        }
        filterChain.doFilter(servletRequest, servletResponse);

    }

    /**
     * 获取用户真实IP地址，不使用request.getRemoteAddr()的原因是有可能用户使用了代理软件方式避免真实IP地址,
     * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值
     *
     * @return ip
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个ip值，第一个ip才是真实ip
            if (ip.contains(",")) {
                ip = ip.split(",")[0];
            }
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
    /**************************************************************************
     * Description 工具方法-获取当前登陆用户
     *
     * @author 罗璇
     * @date 2017年9月7日
     **************************************************************************/
    private String getCurrUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String un = "anonymousUser";
        if (auth != null && auth.getPrincipal() != null) {
            if (auth.getPrincipal() instanceof User) {
                un = ((User) auth.getPrincipal()).getUsername().toString();
            } else {
                un = auth.getPrincipal().toString();
            }
        }
        return un;
    }
}
