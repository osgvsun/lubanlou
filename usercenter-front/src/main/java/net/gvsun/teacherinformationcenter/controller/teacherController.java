package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@CrossOrigin
@RequestMapping("/teacher")
public class teacherController {
    @Value("${apiGateWayHost}")
    private String userCenterHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;
    @Value("${dataSource}")
    private String dataSource;
    @Value("${oauth2Host}")
    private String oauth2;

    @Autowired
    private ShareService shareService;

    /**
     * 个人基本情况
     *
     * @return
     */
    @RequestMapping(value = "/personalInfo", method = {RequestMethod.GET})
    public String personalInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/personalInfo";
    }


    /**
     * 教育背景及工作经历
     *
     * @return
     */
    @RequestMapping(value = "/educationWork", method = {RequestMethod.GET})
    public String educationWork(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/educationWork";
    }


    /**
     * 教学相关
     *
     * @return
     */
    @RequestMapping(value = "/teachingRelated", method = {RequestMethod.GET})
    public String teachingRelated(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/teachingRelated";
    }

    /**
     * 科研相关
     *
     * @return
     */
    @RequestMapping(value = "/scientificResearch", method = {RequestMethod.GET})
    public String scientificResearch(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/scientificResearch";
    }

    /**
     * 代表作
     *
     * @return
     */
    @RequestMapping(value = "/masterwork", method = {RequestMethod.GET})
    public String masterwork(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/masterWork";
    }

    @RequestMapping(value = "/onloadPhoto", method = {RequestMethod.GET})
    public String onloadPhoto(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/onloadPhoto";
    }

    @RequestMapping(value = "/selectedMap", method = {RequestMethod.GET})
    public String selectedMap(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/selectedMap";
    }

    /**
     * 教师网站师资队伍配置页面
     *
     * @author 陈青
     * @date 2019/7/24
     */
    @RequestMapping(value = "/teacher_WebsiteConfig", method = {RequestMethod.GET})
    public String teacher_WebsiteConfig(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/teacher_WebsiteConfig";
    }

    /**
     * 个人主页信息联系我们页面
     *
     * @author 陈青
     * @date 2019/8/1
     */
    @RequestMapping(value = "/personMainPage/contactUs", method = {RequestMethod.GET})
    public String teacher_personMainPage(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/personMainPage/contactUs";
    }

    /**
     * 教师教学图谱页面
     *
     * @author 任健坤
     * @date 2020/3/21
     */
    @RequestMapping(value = "/personalMap", method = {RequestMethod.GET})
    public String personalMap(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/personalMap";
    }

    /**
     * 个人资源图谱
     *
     * @author 付世亮
     * @date 2020-04-07
     */
    @RequestMapping(value = "/personalResourceMap", method = {RequestMethod.GET})
    public String personalResourceMap(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("username", user.getUsername());
        map.put("userCenterHost", userCenterHost);
        map.put("apiGateWayHost", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("dataSource", dataSource);
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHostForUpload);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teacher/personalResourceMap";
    }
}

