package net.gvsun.teacherinformationcenter.filter;


import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.teacherinformationcenter.controller.timetable.tUtils;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.web.util.Authorization;
import net.gvsun.web.util.AuthorizationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import util.HttpClientUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

@WebFilter(filterName = "CustomFilter")
public class CustomFilter implements Filter {

    @Autowired
    private ShareService shareService;
    @Value("${apiGateWayHost}")
    private String userCenterHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${dataSource}")
    private String dataSource;
    @Value("${oauth2Host}")
    private String oauth2;
    @Value("${teachHost}")
    private String teachHost;
    @Value("${datashareHost}")
    private String datashareHost;
    @Value("${deviceHost}")
    private String deviceHost;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${gvsunWork}")
    private String gvsunWork;
    @Value("${gvsunExam}")
    private String gvsunExam;
    @Value("${accessHost}")
    private String accessHost;
    @Value("${limsproductHost}")
    private String limsproductHost;
    @Value("${appointmentHost}")
    private String appointmentHost;
    @Value("${labroomHost}")
    private String labroomHost;
    @Value("${usercenterHost}")
    private String usercenterHost;
    @Value("${auditserverHost}")
    private String auditserverHost;
    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String path = request.getRequestURI();
        if (path.contains("/datashare/")) {

            System.out.println("datashare=========" + ClientDatabaseContextHolder.getClientDatabaseOri());
            request.getSession().setAttribute("datashareHost", datashareHost + "/");

        } else if (path.contains("/timetable/") && !path.contains(".")) {

            net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
            request.getSession().setAttribute("user", user);
            request.getSession().setAttribute("limsproductHost", limsproductHost);

        } else if(path.contains("/openReservation/") && !path.contains(".")){

            net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
            request.getSession().setAttribute("user", user);
            request.getSession().setAttribute("timetableHost", apiGateWayHost + "/timetable");
            request.getSession().setAttribute("datashareHost", datashareHost + "/");

        }
        request.setAttribute("gvsunWork", gvsunWork);
        request.setAttribute("deviceHost", deviceHost);
        request.setAttribute("gvsunExam", gvsunExam);
        request.setAttribute("accessHost", accessHost);
        request.setAttribute("appointmentHost", appointmentHost);
        request.setAttribute("labRoomHost", labroomHost);
        request.setAttribute("usercenterHost", usercenterHost);
        request.setAttribute("auditserverHost", auditserverHost);
        request.setAttribute("datashareHost", datashareHost + "/");

        try {
            final HttpSession session = request.getSession();
            if(session.getAttribute("user") == null) {
                net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
                request.getSession().setAttribute("user", user);
            }
            if(session.getAttribute("userCenterHost") == null) {
                request.getSession().setAttribute("userCenterHost", userCenterHost);
            }
            if(session.getAttribute("apiGateWayHost") == null) {
                request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
            }
            if(session.getAttribute("siteEnName") == null) {
                request.getSession().setAttribute("siteEnName", siteEnName);
            }
            if(session.getAttribute("siteSecret") == null) {
                request.getSession().setAttribute("siteSecret", siteSecret);
            }
            if(session.getAttribute("dataSource") == null) {
                request.getSession().setAttribute("dataSource", dataSource);
            }
            if(session.getAttribute("oauth2") == null) {
                request.getSession().setAttribute("oauth2", oauth2);
            }
            if(session.getAttribute("teachHost") == null) {
                request.getSession().setAttribute("teachHost", teachHost);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }


        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
