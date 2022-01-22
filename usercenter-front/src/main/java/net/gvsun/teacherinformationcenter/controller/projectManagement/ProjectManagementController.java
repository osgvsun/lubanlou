package net.gvsun.teacherinformationcenter.controller.projectManagement;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("/project")
public class ProjectManagementController {
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
    public ProjectManagementController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    @RequestMapping({"/"})
    public String defaultPage(Map<String, String> map) {
        return "redirect:/project/myProject";
    }

    /**
     * 自定义设置
     */
    @RequestMapping({"/myProject"})
    public String myProject(Map<String, Object> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/projectManagement/myProject";
    }

    /**
     * 所有项目
     */
    @RequestMapping({"/allProject"})
    public String allProject(Map<String, Object> map) {
       return "/projectManagement/allProject";
    }
    /**
     * 外部页面
     */
    @RequestMapping({"/projectList"})
    public String projectList(Map<String, Object> map, HttpServletRequest request, String itemName, String auditor, String labId, String termId, String status, String courseNumber
            , String username, String academyNumber, String itemNumber, String courseName, String subjectNumber, String categoryMainId
            , String categoryAppId, String categoryNatureId, String categoryStudentId) {
        map.put("itemName", itemName);
        map.put("auditor", auditor);
        map.put("labId", labId);
        map.put("termId", termId);
        map.put("status", status);
        map.put("courseNumber", courseNumber);
        map.put("username", username);
        map.put("academyNumber", academyNumber);
        map.put("itemNumber", itemNumber);
        map.put("courseName", courseName);
        map.put("subjectNumber", subjectNumber);
        map.put("categoryMainId", categoryMainId);
        map.put("categoryNatureId", categoryNatureId);
        map.put("categoryStudentId", categoryStudentId);
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        request.getSession().setAttribute("teachHost", teachHost);
        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/projectManagement/projectList";
    }
    /**
     * 我的审核
     */
    @RequestMapping({"/myExamine"})
    public String myExamine(Map<String, Object> map) {
       return "/projectManagement/myExamine";
    }
    /**
     * 导入项目
     */
    @RequestMapping({"/uploadAllProject"})
    public String uploadAllProject(Map<String, Object> map) {
       return "/projectManagement/uploadAllProject";
    }
    /**
     * 新建项目
     */
    @RequestMapping({"/newProject"})
    public String newProject(Map<String, Object> map, Integer proId) {
        map.put("proId", proId);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
       return "/projectManagement/newProject";
    }
   /**
     * 新增材料
     */
    @RequestMapping({"/addMaterial"})
    public String addMaterial(Map<String, Object> map, Integer proId) {
        map.put("proId", proId);
       return "/projectManagement/addMaterial";
    }
    /**
     * 新增材料
     */
    @RequestMapping({"/addEquipment"})
    public String addEquipment(Map<String, Object> map, Integer proId) {
        map.put("proId", proId);
       return "/projectManagement/addEquipment";
    }
    /**
     * 新增材料
     */
    @RequestMapping({"/uploadEnclosure"})
    public String uploadEnclosure(Map<String, Object> map, Integer proId) {
        map.put("proId", proId);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
       return "/projectManagement/uploadEnclosure";
    }

    /**
     * 所有项目详情
     */
    @RequestMapping({"/allProjectDetail"})
    public String allProjectDetail(Map<String, Object> map, Integer proId, String audit) {
        map.put("proId", proId);
        map.put("audit", audit);
       return "/projectManagement/allProjectDetail";
    }

}
