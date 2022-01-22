package net.gvsun.teacherinformationcenter.controller.gvsunWork;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/gvsunwork")
public class WorkController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @Value("${oauth2Host}")
    private String oauth2Host;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Value("${authorization.siteEnName}")
    private String siteEnName;

    @Value("${authorization.siteSecret}")
    private String siteSecret;

    @Autowired
    public WorkController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
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
     * 首页
     */
    @RequestMapping("/mainindex")
    public String learningResource(HttpServletRequest request, Map<String, Object> map, Integer cid, String type, String title) throws IOException {
        // 获取用户信息
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("cid", cid);
        map.put("cid", cid);
        map.put("type", type);
        map.put("title", title);
        map.put("apiGateWayHost", apiGateWayHost);
        return "/gvsunWork/views/mainIndex";
    }

    /**
     * 教师作业列表 页面
     */
    @RequestMapping("/teacherNormalHomeworkList")
    public String teacherNormalHomeworkList(HttpServletRequest request, Map<String, Object> map, String type, String title) {
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/teacherNormalHomeworkList";
    }
    /**
     * 新建作业页面
     */
    @RequestMapping("/newHomework")
    public String newHomework(HttpServletRequest request, Map<String, Object> map, String type, String title) {
        // 获取用户信息
//        net.gvsun.teacherinformationcenter.vo.User user = shareService.getCurrentUser();
        Integer cid = (Integer) request.getSession().getAttribute("cid");
        map.put("cid",cid);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/newHomework";
    }

    /**
     * 编辑作业页面
     */
    @RequestMapping("/editHomework")
    public String editHomework(HttpServletRequest request, Map<String, Object> map,Integer assignmentId, String type, String title) {
        Integer cid = (Integer) request.getSession().getAttribute("cid");
        map.put("cid",cid);
        map.put("assignmentId",assignmentId);
        map.put("type", type);
        map.put("title", title);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        return "/gvsunWork/views/editHomework";
    }
    /**
     * 切换权限页面
     */
    @RequestMapping("/switchPermissions")
    public String switchPermissions(Map<String, Object> map, HttpServletRequest request, String cid) {
        map.put("cid", cid);
        return "/gvsunWork/views/switchPermissions";
    }
    /**
     * 设置页面
     */
    @RequestMapping("/setHomework")
    public String setHomework(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/setHomework";
    }
    /**
     * 普通作业查看页面
     */
    @RequestMapping("/teacherNormalHomeworkDetail")
    public String teacherNormalHomeworkDetail(HttpServletRequest request, Map<String, Object> map,Integer assignmentId, String type, String title) {
        // 获取用户信息
        map.put("assignmentId",assignmentId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/teacherNormalHomeworkDetail";
    }

    /**
     * 批改作业页面
     */
    @RequestMapping("/teacherNormalCorrectList")
    public String teacherNormalCorrectList(HttpServletRequest request, Map<String, Object> map,Integer assignmentId) {
        map.put("assignmentId",assignmentId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        return "/gvsunWork/views/teacherNormalCorrectList";
    }
    /**
     * 批改作业- 批量下载
     */
    @RequestMapping("/teacherNormalBatchFileDownload")
    public String teacherNormalBatchFileDownload(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/teacherNormalBatchFileDownload";
    }
    /**
     * 批改作业- 批量评分
     */
    @RequestMapping("/teacherNormalBatchScore")
    public String teacherNormalBatchScore(HttpServletRequest request, Map<String, Object> map,Integer assignmentId) {
        map.put("assignmentId",assignmentId);
        return "/gvsunWork/views/teacherNormalBatchScore";
    }
    /**
     * 批改作业 - 批量评语
     */
    @RequestMapping("/teacherNormalBatchComment")
    public String teacherNormalBatchComment(HttpServletRequest request, Map<String, Object> map,Integer assignmentId) {
        map.put("assignmentId",assignmentId);
        return "/gvsunWork/views/teacherNormalBatchComment";
    }
    /**
     * 小组作业
     */
    @RequestMapping("/teacherTeamHomeworkList")
    public String teacherTeamHomeworkList(HttpServletRequest request, Map<String, Object> map, String type, String title) {
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/teacherTeamHomeworkList";
    }
    /**
     * 小组作业- 查看页面
     */
    @RequestMapping("/teacherteamHomeworkDetail")
    public String teacherteamHomeworkDetail(HttpServletRequest request, Map<String, Object> map, String type, String title, String assignmentId) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("type", type);
        map.put("title", title);
        map.put("assignmentId", assignmentId);
        return "/gvsunWork/views/teacherTeamHomeworkDetail";
    }
    /**
     * 小组作业- 查看- 文件批量下载
     */
    @RequestMapping("/teacherteamBatchFileDownload")
    public String teacherteamBatchFileDownload(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/teacherTeamBatchFileDownload";
    }
    /**
     * 小组作业 - 批改
     */
    @RequestMapping("/teacherteamCorrectList")
    public String teacherteamCorrectList(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunWork/views/teacherTeamCorrectList";
    }
    /**
     * 学生-作业列表页面
     */
    @RequestMapping("/studentNormalHomeworkList")
    public String studentNormalHomeworkList(HttpServletRequest request, Map<String, Object> map, String type, String title) {
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/studentNormalHomeworkList";
    }
    /**
     * 学生- 普通作业- 编辑/查看页面
     */
    @RequestMapping("/studentSubmitNormalHomework")
    public String studentNormalHomeworkList(HttpServletRequest request, Map<String, Object> map,Integer assignmentId, String type, String title, String assignmentApi) {
        map.put("assignmentId",assignmentId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("type", type);
        map.put("title", title);
        map.put("assignmentApi", assignmentApi);
        return "/gvsunWork/views/studentSubmitNormalHomework";
    }
    /**
     * 学生 - 普通作业- 查看
     */
    @RequestMapping("/studentNormalHomeworkDetail")
    public String studentNormalHomeworkDetail(HttpServletRequest request, Map<String, Object> map,Integer assignmentId) {
        map.put("assignmentId",assignmentId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        return "/gvsunWork/views/studentNormalHomeworkDetail";
    }
    /**
     * 学生- 小组作业- 列表
     */
    @RequestMapping("/studentTeamHomeworkList")
    public String studentTeamHomeworkList(HttpServletRequest request, Map<String, Object> map, String type, String title) {
        map.put("type", type);
        map.put("title", title);
        return "/gvsunWork/views/studentTeamHomeworkList";
    }
    /**
     * 学生- 小组作业- 新建/编辑
     */
    @RequestMapping("/studentSubmitTeamHomework")
    public String studentSubmitTeamHomework(HttpServletRequest request, Map<String, Object> map, String type, String title, String categoryId) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("type", type);
        map.put("title", title);
        map.put("categoryId", categoryId);
        return "/gvsunWork/views/studentSubmitTeamHomework";
    }
    /**
     * 学生- 小组作业- 查看
     */
    @RequestMapping("/studentTeamHomeworkDetail")
    public String studentTeamHomeworkDetail(HttpServletRequest request, Map<String, Object> map) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        return "/gvsunWork/views/studentTeamHomeworkDetail";
    }
    /**
     * 教师- 普通作业作业- 单个评语
     */
    @RequestMapping("/teacherNormalComment")
    public String teacherNormalComment(HttpServletRequest request, Map<String, Object> map ,String comment) {
        map.put("comment",comment);
        return "/gvsunWork/views/teacherNormalComment";
    }
    /**
     * 教师-普通作业- 单个在线批阅
     */
    @RequestMapping("/onlineMarking")
    public String onlineMarking(HttpServletRequest request, Map<String, Object> map, String gradingId, String fileUrl, String assignmentId, String username,String comment ,String grading) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("siteEnName", siteEnName);
        map.put("siteSecret", siteSecret);
        map.put("gradingId", gradingId);
        map.put("fileUrl", fileUrl);
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("comment",comment);
        map.put("grading",grading);
        return "/gvsunWork/views/onlineMarking";
    }
    /**
     * 教师- 小组作业- 小组评语
     */
    @RequestMapping("/teacherTeamComment")
    public String teacherTeamComment(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunWork/views/teacherTeamComment";
    }
    /**
     * 教师- 小组作业- 成员评分/评语
     */
    @RequestMapping("/teacherTeamMember")
    public String teacherTeamMember(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunWork/views/teacherTeamMember";
    }
    /**
     * 教师- 作业新增- 选择节次
     */
    @RequestMapping("/chooseClass")
    public String chooseClass(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/chooseClass";
    }
    /**
     * 教师- 作业新增- 普通作业- 开始重复作业- 批量添加
     */
    @RequestMapping("/moreNormalHomework")
    public String moreNormalHomework(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/moreNormalHomework";
    }
    /**
     * 教师- 作业新增- 小组作业- 自定义- 批量添加
     */
    @RequestMapping("/moreTeamHomework")
    public String moreTeamHomework(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/moreTeamHomework";
    }
    /**
     * 小组管理
     */
    @RequestMapping("/groupSetting")
    public String groupSetting(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunWork/views/groupSetting";
    }
    /**
     * 发送短信/邮件
     */
    @RequestMapping("/openMessage")
    public String openMessage(HttpServletRequest request, Map<String, Object> map, String userName, String assignmentId) {
        map.put("userName", userName);
        map.put("assignmentId", assignmentId);
        return "/gvsunWork/views/openMessage";
    }
}

