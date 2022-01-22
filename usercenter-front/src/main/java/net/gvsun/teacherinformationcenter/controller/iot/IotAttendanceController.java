package net.gvsun.teacherinformationcenter.controller.iot;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author 魏好
 */
@Controller
@RequestMapping("/iotAttendance")
public class IotAttendanceController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
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
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Autowired
    public IotAttendanceController(ShareService shareService,ResourceContainerService resourceContainerService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }


    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    /**
     * 获取当前登陆人
     *
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) {
        return shareService.getCurrentUserFromUnifySession(request);
    }

    @RequestMapping({"/"})
    public String defaultPage(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "redirect:/iotAttendance/mainIndex";
    }

    @RequestMapping({"/mainIndex"})
    public String mainIndex(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/mainIndex";
    }

    @RequestMapping({"/courseAttendance"})
    public String courseAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/courseAttendance";
    }

    @RequestMapping({"/courseAttendanceDetail"})
    public String courseAttendanceDetail(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        map.put("id",request.getParameter("id"));
        map.put("classDate",request.getParameter("classDate"));
        map.put("startTime",request.getParameter("startTime"));
        map.put("endTime",request.getParameter("endTime"));
        map.put("hardwareIps",request.getParameter("hardwareIps"));
        return "/iotAttendance/courseAttendanceDetail";
    }

    @RequestMapping({"/courseStatistic"})
    public String courseStatistic(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        map.put("teachers",request.getParameter("teachers"));
        map.put("courseName",request.getParameter("courseName"));
        return "/iotAttendance/courseStatistic";
    }
    @RequestMapping({"/reservationAttendance"})
    public String reservationAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/reservationAttendance";
    }

    @RequestMapping({"/editSetAttendance"})
    public String editSetAttendance(Map<String, String> map) {
        return "/iotAttendance/editSetAttendance";
    }

    @RequestMapping({"/myAttendance"})
    public String myAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/myAttendance";
    }

    @RequestMapping({"/newSetAttendance"})
    public String newSetAttendance(Map<String, String> map) {
        return "/iotAttendance/newSetAttendance";
    }

    @RequestMapping({"/setAttendance"})
    public String setAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/setAttendance";
    }

    /**
     * 运营- 打卡记录页面
     */
    @RequestMapping({"/creditCardRecordsAttendce"})
    public String creditCardRecordsAttendce(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/creditCardRecordsAttendce";
    }
    /**
     * 运营- 查看考勤页面
     */
    @RequestMapping({"/checkAttendce"})
    public String checkAttendce(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/checkAttendce";
    }

    @RequestMapping({"/switchPermissions"})
    public String switchPermissions(Map<String, String> map) {
        return "/iotAttendance/switchPermissions";
    }

    //成绩开始

    /**
     * 成绩入口
     * @param map
     * @param request
     * @return
     */
    @RequestMapping({"/scoreMainIndex"})
    public String scoreMainIndex(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/scoreMainIndex";
    }

    @RequestMapping({"/courseScore"})
    public String courseScore(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/courseScore";
    }

    @RequestMapping({"/courseScoreDetail"})
    public String courseScoreDetail(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        map.put("transcriptHost", apiGateWayHost +"/transcript");
        map.put("id",request.getParameter("id"));
        map.put("weeks",request.getParameter("weeks"));
        map.put("weekday",request.getParameter("weekday"));
        map.put("startClass",request.getParameter("startClass"));
        map.put("endClass",request.getParameter("endClass"));
        map.put("classDate",request.getParameter("classDate"));
        map.put("startTime",request.getParameter("startTime"));
        map.put("endTime",request.getParameter("endTime"));
        map.put("hardwareIps",request.getParameter("hardwareIps"));
        map.put("courseName",request.getParameter("courseName"));
        return "/iotAttendance/courseScoreDetail";
    }
    @RequestMapping({"/scoreStatistic"})
    public String scoreStatistic(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        map.put("transcriptHost", apiGateWayHost +"/transcript");
        map.put("teachers",request.getParameter("teachers"));
        map.put("courseName",request.getParameter("courseName"));
        return "/iotAttendance/scoreStatistic";
    }

    @RequestMapping({"/myScore"})
    public String myScore(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("attendanceHost", apiGateWayHost + "/attendance");
        return "/iotAttendance/myScore";
    }

}
