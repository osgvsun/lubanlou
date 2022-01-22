package net.gvsun.config;
import net.gvsun.vo.OauthVO;
import net.gvsun.web.util.AuthorizationUtil;
import net.gvsun.web.util.CheckAuthorization;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(filterName = "GvsunSecurityFilter", urlPatterns = "/*")
public class GvsunSecurityFilter implements Filter {

    @Value("${gvsun.security.secretCode:null}")
    String secretCode;
    @Value("${authorization.enable:true}")
    Boolean enable;
    @Value("${gvsun.security.mapping.ignore:null}")
    String[] ignoreMapping;
    @Value("${gvsun.security.mapping.include:null}")
    String[] includeMapping;



    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String uri = httpServletRequest.getRequestURI();
        if(!includeMapping[0].equals("null")){
            for(String map:includeMapping){
                if(!checkUri(uri,map)){
                    filterChain.doFilter(servletRequest,servletResponse);
                    return;
                }
            }
        }else if(!ignoreMapping[0].equals("null")){
            for(String map:ignoreMapping){
                if(checkUri(uri,map)){
                    filterChain.doFilter(servletRequest,servletResponse);
                    return;
                }
            }
        }
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        if("OPTIONS".equalsIgnoreCase(httpServletRequest.getMethod())){
            return;
        }
        HttpSession session = httpServletRequest.getSession();
        //判断是否登录
        //后门判断rvl
        if(!secretCode.equals("null") && servletRequest.getParameter("uniCode")!=null && !servletRequest.getParameter("uniCode").equals("")){
            System.out.println(servletRequest.getParameter("uniCode"));
            if(servletRequest.getParameter("uniCode").equals(secretCode)){
                session.setAttribute("username",servletRequest.getParameter("username"));
                session.setAttribute("userCname",servletRequest.getParameter("userCname"));
                session.setAttribute("siteEnName",servletRequest.getParameter("siteEnName"));
                filterChain.doFilter(servletRequest,servletResponse);
            }
        }
        //session判断
        else if(session.getAttribute("oauth")!=null){
            OauthVO oauthVO = (OauthVO)session.getAttribute("oauth");
            session.setAttribute("username",oauthVO.getUserInfoVO().getUsername());
            session.setAttribute("userCname",oauthVO.getUserInfoVO().getCname());
            session.setAttribute("siteEnName",servletRequest.getParameter("siteEnName"));
            filterChain.doFilter(servletRequest,servletResponse);
        }
        //jwt判断
        else{
            if(!enable){
                filterChain.doFilter(servletRequest,servletResponse);
            }else{
                CheckAuthorization checkAuthorization = null;
                checkAuthorization = AuthorizationUtil.checkAuthorization(httpServletRequest);
                if(checkAuthorization.getCheckState().equals("success")&&!checkAuthorization.getUsername().equals("")){
                    for(String key : checkAuthorization.getParams().keySet()){
                        session.setAttribute(key,checkAuthorization.getParams().get(key));
                    }
                    filterChain.doFilter(servletRequest,servletResponse);
                }else{
                    httpServletResponse.sendError(401,checkAuthorization.getErrorCode());
                }
            }
        }
    }

    @Override
    public void destroy() {

    }


    private boolean checkUri(String uri,String flag){
        switch (flag.split("/")[flag.split("/").length-1]){
            case "":
                return uri.equals(flag);
            case "*":
               return  (uri.startsWith(flag.substring(0,flag.length()-2)) && uri.lastIndexOf('/')<=flag.lastIndexOf('/'));
            case "**":
                return uri.startsWith(flag.substring(0,flag.length()-3));
        }
        return false;
    }
}

