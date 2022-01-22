package net.gvsun.teacherinformationcenter.controller.configcenter;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/configcenter/registration")
public class RegistrationController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${iotHost}")
    private String iotHost;
    @Value("${apiGateWayHost}")
    private String apiGateWayHostTest;
    @Value("${apiGateWayHost}")
    private String userCenterHost;
    @Value("${teachHost}")
    private String teachHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${dataSource}")
    private String dataSource;
    @Value("${oauth2Host}")
    private String oauth2;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Autowired
    public RegistrationController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    @RequestMapping({"/"})
    public String defaultPage(Map<String, String> map) {
        return "redirect:/configcenter/registration/mainIndex";
    }

    @RequestMapping({"/mainIndex"})
    public String mainIndex(Map<String, Object> map, HttpServletRequest request,String configType) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        String currHost = "";
        if(apiGateWayHost.indexOf("/api") != -1){
            currHost = apiGateWayHost.replaceAll("/api","");
        }else{
            currHost = apiGateWayHost;
        }
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        request.getSession().setAttribute("currHost", currHost);
        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("configType", configType);
        map.put("currHost", currHost);
        map.put("configType", configType);
        return "/configcenter/registration/mainindex";
    }
    /**
     * 发布通知
     */
    @RequestMapping({"/schoolMessage"})
    public String customSetting(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/schoolMessage";
    }
    /**
     * 导入成员
     */
    @RequestMapping({"/academicDeanTutorList"})
    public String academicDeanTutorList(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/academicDeanTutorList";
    }
    /**
     * 导师名单
     */
    @RequestMapping({"/initiatorList"})
    public String initiatorList(Map<String, Object> map,String timetableId,String type) {
        map.put("timetableId", timetableId);
        map.put("type", type);
        return "/configcenter/registration/initiatorList";
    }
    /**
     * 学生名单
     */
    @RequestMapping({"/targetList"})
    public String targetList(Map<String, Object> map,String timetableId,String type) {
        map.put("timetableId", timetableId);
        map.put("type", type);
        return "/configcenter/registration/targetList";
    }
    /**
     * 导师学生对应名单
     */
    @RequestMapping({"/academicRelationship"})
    public String academicRelationship(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/academicRelationship";
    }
    /**
     * 系主任调整学生
     */
    @RequestMapping({"/tutorChangeAcademicStudent"})
    public String tutorChangeAcademicStudent(Map<String, Object> map,String timetableId,String type,String teacher,String teacherusername) {
        map.put("timetableId", timetableId);
        map.put("type", type);
        map.put("teacher", teacher);
        map.put("teacherusername", teacherusername);
        return "/configcenter/registration/tutorChangeAcademicStudent";
    }
    /**
     * 发送通知
     */
    @RequestMapping({"/sendMessage"})
    public String sendMessage(Map<String, Object> map,String timetableId,String usernames,String cnames,String teacherUsername,String teacherCname) {
        map.put("timetableId", timetableId);
        map.put("usernames", usernames);
        map.put("cnames", cnames);
        map.put("teacherUsername", teacherUsername);
        map.put("teacherCname", teacherCname);
        return "/configcenter/registration/sendMessage";
    }
    /**
     * 操作记录
     */
    @RequestMapping({"academicDeanExamineTutor"})
    public String academicDeanExamineTutor(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/academicDeanExamineTutor";
    }
    /**
     * 导师工作管理
     */
    @RequestMapping({"academicStudentList"})
    public String academicStudentList(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/academicStudentList";
    }
    /**
     * 学生工作管理
     */
    @RequestMapping({"academicTutorList"})
    public String academicTutorList(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/academicTutorList";
    }
    /**
     * 学生日志
     */
    @RequestMapping({"editAcademicStudentWorkLog"})
    public String editAcademicStudentWorkLog(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/editAcademicStudentWorkLog";
    }
    /**
     * 学生日志新建
     */
    @RequestMapping({"newAcademicStudentWorkLog"})
    public String newAcademicStudentWorkLog(Map<String, Object> map,String timetableId) {
        map.put("timetableId", timetableId);
        return "/configcenter/registration/newAcademicStudentWorkLog";
    }
    /**
     * 学生成果
     */
    @RequestMapping({"editAcademicStudentWorkAchievement"})
    public String editAcademicStudentWorkAchievement(Map<String, Object> map,String configType) {
        map.put("configType", configType);
        return "/configcenter/registration/editAcademicStudentWorkAchievement";
    }
    
}
