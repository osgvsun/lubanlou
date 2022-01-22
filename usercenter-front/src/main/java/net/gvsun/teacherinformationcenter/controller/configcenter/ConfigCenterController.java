package net.gvsun.teacherinformationcenter.controller.configcenter;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/configcenter")
public class ConfigCenterController {
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
    public ConfigCenterController(ResourceContainerService resourceContainerService, ShareService shareService) {
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
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }
    /**
     * 获取当前登陆人
     *
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser2")
    public net.gvsun.session.dto.User getCurrentUserFromUnifySession(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }


    /**
     * 业务列表
     */
    @RequestMapping(value = "/commonList", method = {RequestMethod.GET})
    public String commonList(Map<String, Object> map, HttpServletRequest request, Integer configType, String clientId, String extendsField) throws IOException {
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
        request.getSession().setAttribute("apiGateWayHostTest", apiGateWayHostTest);
        request.getSession().setAttribute("currHost", currHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("currHost", currHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("extendsField", extendsField);
        map.put("clientId", clientId);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/process/commonList";
    }
    /**
     * 中层列表
     */
    @RequestMapping(value = "/linkList", method = {RequestMethod.GET})
    public String linkList(Map<String, Object> map, HttpServletRequest request, Integer configType, Integer nextConfig, String clientId) throws IOException {
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
        request.getSession().setAttribute("apiGateWayHostTest", apiGateWayHostTest);
        request.getSession().setAttribute("currHost", currHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("currHost", currHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("nextConfig", nextConfig);
        map.put("clientId", clientId);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/process/linkList";
    }
    /**
     * 业务列表
     */
    @RequestMapping(value = "/tableReport", method = {RequestMethod.GET})
    public String tableReport(Map<String, Object> map, HttpServletRequest request, Integer configType, String clientId) throws IOException {
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
        request.getSession().setAttribute("apiGateWayHostTest", apiGateWayHostTest);
        request.getSession().setAttribute("currHost", currHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("currHost", currHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("clientId", clientId);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/process/tableReport";
    }

    /**
     * 新建业务
     */
    @RequestMapping(value = "/newTimetable", method = {RequestMethod.GET})
    public String newTimetable(Map<String, Object> map, Integer flag, Integer templateId,String clientId) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("flag", flag);
        map.put("templateId", templateId);
        map.put("clientId", clientId);
        return "/configcenter/process/newTimetable";
    }
    /**
     * 下一阶段
     */
    @RequestMapping(value = "/stepCircle", method = {RequestMethod.GET})
    public String stepCircle(Map<String, Object> map, Integer timetableId,String clientId,String firstStepName,String extendsField,
                             Integer templateId, Integer step, Integer task, Integer businessId) {
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("timetableId", timetableId);
        map.put("templateId", templateId);
        map.put("clientId", clientId);
        map.put("firstStepName", firstStepName);
        map.put("extendsField", extendsField);
        map.put("step", step);
        map.put("task", task);
        map.put("businessId", businessId);
        return "/configcenter/process/stepCircle";
    }
    /**
     * 阶段总览
     */
    @RequestMapping(value = "/stepInfo", method = {RequestMethod.GET})
    public String stepInfo(Map<String, Object> map, Integer timetableId,String clientId, Integer templateId, Integer step) {
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("timetableId", timetableId);
        map.put("templateId", templateId);
        map.put("clientId", clientId);
        map.put("currentStep", step);
        return "/configcenter/process/stepInfo";
    }
    /**
     * 阶段总览
     */
    @RequestMapping(value = "/wechatPay", method = {RequestMethod.GET})
    public String wechatPay(Map<String, Object> map, Integer timetableId,String clientId, Integer templateId, Integer step) {
        map.put("oauth2", oauth2);
//        map.put("resourceContainerHost", resourceContainerHost);
//        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("timetableId", timetableId);
        map.put("templateId", templateId);
        map.put("clientId", clientId);
        map.put("currentStep", step);
        return "/configcenter/process/wechatPay";
    }
    /**
     * 课程资源
     */
    @RequestMapping(value = "/resourceCloud", method = {RequestMethod.GET})
    public String wechatPay(Map<String, Object> map, String courses) {
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("courses", courses);
        map.put("teachHost", teachHost);
        return "/configcenter/process/resourceCloud/resourceMainIndex";
    }
    @RequestMapping({"/fileList"})
    public String fileList(Map<String, Integer> map, @RequestParam(defaultValue = "0") Integer folderType) {
        //文件夹的类型 0我的文件夹 1部门文件夹 2共享文件夹 3企业/学校文库 方便面包屑和方法判断
        map.put("folderType", folderType);
        return "/configcenter/process/resourceCloud/fileList";
    }
    /**
     * 个人基本情况
     *
     * @return
     */
    @RequestMapping(value = "/personalInfo", method = {RequestMethod.GET})
    public String personalInfo(Map<String, String> map, HttpServletRequest request, String username, String id) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        if(username!=null&&username!=""){
            map.put("username", username);
        }else{
            map.put("username", id);
        }
        return "/configcenter/process/personalInfo";
    }
    /**
     * 教育背景及工作经历
     *
     * @return
     */
    @RequestMapping(value = "/educationWork", method = {RequestMethod.GET})
    public String educationWork(Map<String, String> map, HttpServletRequest request, String username) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("username", username);
        return "/configcenter/process/educationWork";
    }
    /**
     * 评分项设置列表
     */
    @RequestMapping(value = "/settingList", method = {RequestMethod.GET})
    public String settingList(Map<String, Object> map, HttpServletRequest request, Integer configType, String clientId) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("clientId", clientId);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/settingList";
    }
    /**
     * 评分项设置列表
     */
    @RequestMapping(value = "/indicatorSetting", method = {RequestMethod.GET})
    public String indicatorSetting(Map<String, Object> map, HttpServletRequest request, String proId, Integer configType, String sourceProject, Integer state) {
        map.put("proId", proId);
        map.put("configType", configType);
        map.put("sourceProject", sourceProject);
        map.put("state", state);
        return "/configcenter/transcript/indicatorSetting";
    }
    /**
     * 评分项设置列表
     */
    @RequestMapping(value = "/newIndicator", method = {RequestMethod.GET})
    public String newIndicator(Map<String, Object> map, HttpServletRequest request, String proId, Integer configType, String sourceProject) {
        map.put("proId", proId);
        map.put("configType", configType);
        map.put("sourceProject", sourceProject);
        return "/configcenter/transcript/newIndicator";
    }
    /**
     * 评分项设置列表
     */
    @RequestMapping(value = "/reviewList", method = {RequestMethod.GET})
    public String reviewList(Map<String, Object> map, HttpServletRequest request, Integer configType, String targetUser) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("iotHost",iotHost);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("targetUser", targetUser);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/reviewList";
    }
    /**
     * 目标者列表
     */
    @RequestMapping(value = "/targetList", method = {RequestMethod.GET})
    public String targetList(Map<String, Object> map, HttpServletRequest request, Integer configType) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2",oauth2);
        request.getSession().setAttribute("iotHost",iotHost);
        request.getSession().setAttribute("teachHost",teachHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("configType", configType);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/targetList";
    }
    /**
     * 评分项设置列表
     */
    @RequestMapping(value = "/startReview", method = {RequestMethod.GET})
    public String startReview(Map<String, Object> map, HttpServletRequest request) {
//        map.put("proId", proId);
//        map.put("configType", configType);
//        map.put("templateId", templateId);
//        map.put("timetableId", timetableId);
        map.put("oauth2", oauth2);
//        map.put("iotHost", iotHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/startReview";
    }
    /**
     * 评分项查看列表
     */
    @RequestMapping(value = "/reviewDetail", method = {RequestMethod.GET})
    public String reviewDetail(Map<String, Object> map, HttpServletRequest request) {
//        map.put("proId", proId);
//        map.put("configType", configType);
//        map.put("templateId", templateId);
//        map.put("timetableId", timetableId);
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/reviewDetail";
    }
    /**
     * 评审结果报表
     */
    @RequestMapping(value = "/reviewReport", method = {RequestMethod.GET})
    public String reviewReport(Map<String, Object> map, HttpServletRequest request) {
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/configcenter/transcript/reviewReport";
    }
    /**
     * 评分项评语设置
     */
    @RequestMapping(value = "/commentInfo", method = {RequestMethod.GET})
    public String commentInfo(Map<String, Object> map, HttpServletRequest request, Integer commentId, String commentinfoDeatil) {
        map.put("commentId", commentId);
        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/commentInfo";
    }
    /**
     * 评分项评语查看
     */
    @RequestMapping(value = "/commentDetail", method = {RequestMethod.GET})
    public String commentDetail(Map<String, Object> map, HttpServletRequest request, String commentinfoDeatil) {
        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/commentDetail";
    }
    /**
     * 更换学生
     */
    @RequestMapping(value = "/changeStudent", method = {RequestMethod.GET})
    public String changeStudent(Map<String, Object> map, HttpServletRequest request,Integer timetableId) {
        map.put("timetableId", timetableId);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/changeStudent";
    }
    /**
     * 更换教师(打分者)
     */
    @RequestMapping(value = "/changeTeacher", method = {RequestMethod.GET})
    public String changeTeacher(Map<String, Object> map, HttpServletRequest request,Integer timetableId) {
        map.put("timetableId", timetableId);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/changeTeacher";
    }
    /**
     * 图片资源
     */
    @RequestMapping(value = "/photographFile", method = {RequestMethod.GET})
    public String photographFile(Map<String, Object> map, HttpServletRequest request,String files) {
        map.put("files", files);
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/photographFile";
    }
    /**
     * 打开图片
     */
    @RequestMapping(value = "/imgShow", method = {RequestMethod.GET})
    public String imgShow(Map<String, Object> map, HttpServletRequest request,String fileUrl) {
        map.put("fileUrl", fileUrl);
        map.put("oauth2", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/imgShow";
    }
    /**
     * 视频(无flash)
     */
    @RequestMapping(value = "/video/flvvideo", method = {RequestMethod.GET})
    public String flvvideo(Map<String, Object> map, HttpServletRequest request) {
//        map.put("commentId", commentId);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/video/flvvideo";
    }
    /**
     * 视频(有flash)
     */
    @RequestMapping(value = "/video/flashvideo", method = {RequestMethod.GET})
    public String flashvideo(Map<String, Object> map, HttpServletRequest request) {
//        map.put("commentId", commentId);
//        map.put("commentinfoDeatil", commentinfoDeatil);
        return "/configcenter/transcript/video/flashvideo";
    }


}
