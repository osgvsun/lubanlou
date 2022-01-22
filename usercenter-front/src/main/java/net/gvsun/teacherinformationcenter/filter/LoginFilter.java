//package net.gvsun.teacherinformationcenter.filter;
//
//import org.springframework.beans.factory.annotation.Value;
//
//import javax.servlet.*;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@WebFilter(filterName = "LoginFilter",urlPatterns = "/*")
//public class LoginFilter implements Filter {
//    @Value("${server.servlet.context-path:''}")
//    public String contextPath;
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//
//    }
//
//    @Override
//    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
//        String url = httpServletRequest.getRequestURI();
//        //不需要过滤的url
//        String[] urls = {"/login","/json",".js",".css",".ico",".jpg",".png",".gif","/oauth", "/register"};
//        boolean flag = false;
//        for (String str : urls) {
//            if (url.contains(str)) {
//                flag = true;
//                break;
//            }
//        }
//        if(flag){
//            filterChain.doFilter(servletRequest,servletResponse);
//        }else if(httpServletRequest.getSession().getAttribute("user")!=null){
//            filterChain.doFilter(servletRequest,servletResponse);
//        }else{
//            ((HttpServletResponse)servletResponse).sendRedirect(contextPath+"/login");
//        }
//    }
//
//    @Override
//    public void destroy() {
//
//    }
//
//}
//
