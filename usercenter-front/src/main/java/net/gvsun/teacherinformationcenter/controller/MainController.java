package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class MainController {
    @PersistenceContext
    private final EntityManager entityManager;
    private final ShareService shareService;
    private final ClientDatabaseContext clientDatabaseContext;
    @Value("${security.oauth2.client.clientId}")
    private String clientId;
    @Value("${security.oauth2.client.clientSecret}")
    private String clientSecret;
    @Value("${security.oauth2.client.logoutOAuth2Uri}")
    private String logoutOAuth2Uri;
    @Value("${apiGateWayHost}")
    private String userCenterHost;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;
    @Value("${logo}")
    private String logo;
    @Value("${dataSource}")
    private String dataSource;
    @Value("${oauth2Host}")
    private String oauth2;
    @Value("${teachHost}")
    private String teachHost;

    @Autowired
    public MainController(EntityManager entityManager, ShareService shareService, ClientDatabaseContext clientDatabaseContext) {
        this.entityManager = entityManager;
        this.shareService = shareService;
        this.clientDatabaseContext = clientDatabaseContext;
    }

    @RequestMapping(value = {"/index", "/"})
    public String index(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/index";
    }

    @RequestMapping(value = "/index_student", method = {RequestMethod.GET})
    public String index_student(Map<String, String> map, HttpServletRequest request) {
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/index_student";
    }
    @RequestMapping(value = "/index_teacher", method = {RequestMethod.GET})
    public String index_teacher(Map<String, String> map, HttpServletRequest request) {
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/index_teacher";
    }

    @RequestMapping(value = "/system_index", method = {RequestMethod.GET})
    public String system_index(Map<String, String> map, HttpServletRequest request, HttpServletResponse resp) {
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/system_index";
    }

    @RequestMapping(value = "/register", method = {RequestMethod.GET})
    public String register(Map<String, String> map) {

        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("userCenterHost", userCenterHost);
        return "/register";
    }

    @RequestMapping(value = "/GSI_register", method = {RequestMethod.GET})
    public String GSI_register(Map<String, Object> map) {
        List<GvsunDataSourceDto> gvsunDataSource=clientDatabaseContext.getOAuth2SiteDto().getDataSourceDtos();
        map.put("gvsunDataSource",gvsunDataSource);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("oauth2Host", oauth2);
        map.put("userCenterHost", userCenterHost);
        map.put("siteSecret", siteSecret);
        map.put("siteEnName", siteEnName);
        return "/GSI_register";
    }

    @RequestMapping(value = "/enterprise_register", method = {RequestMethod.GET})
    public String enterprise_register(Map<String, Object> map) {
        List<GvsunDataSourceDto> gvsunDataSource=clientDatabaseContext.getOAuth2SiteDto().getDataSourceDtos();
        map.put("gvsunDataSource",gvsunDataSource);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("userCenterHost", userCenterHost);
        map.put("oauth2Host", oauth2);
        map.put("siteSecret", siteSecret);
        map.put("siteEnName", siteEnName);
        return "/enterprise_register";
    }


    @RequestMapping(value = "/registration_audit", method = {RequestMethod.GET})
    public String registration_audit(Map<String, String> map, HttpServletRequest request, HttpServletResponse resp) {
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/registration_audit";
    }

    @GetMapping(value = "testFileUpload")
    public String testFileUpload(HttpServletRequest request) {
        return "/uploadFileTest";
    }

    public String getCurrentSourceLogo(HttpServletRequest request) {
        String cookieKey = "datasource.cookie";
        String cookieVal = "limsproduct";
        String datasource = null;
        // 获取cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieKey)) {
                    datasource = cookie.getValue();
                    break;
                }
            }
        }
        // 获取cookies里的值 并且是庚商源下的
        if (datasource != null && datasource != "" && datasource.equals(cookieVal)) {
            return "logo_basic.png";
        }
        // 没有cookie就是返回默认的logo
        return logo;
    }
    /*
     *  用户档案
     */
    @RequestMapping("/userProfile")
    public String setUserProfile(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("oauth2", oauth2);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        return "/userProfile/userProfile";
    }
    /*
     *  用户档案 - 个人主页
     */
    @RequestMapping("/personMainPage")
    public String setPersonMainPage(Map<String, String> map, String username, String cname) {
        map.put("userCenterHost", userCenterHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("username", username);
        map.put("cname", cname);
        return "/userProfile/personMainPage";
    }
}
