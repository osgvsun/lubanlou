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
@RequestMapping("/configcenter/organization")
public class OrganizationController {
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
    public OrganizationController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    @RequestMapping({"/"})
    public String defaultPage(Map<String, String> map) {
        return "redirect:/configcenter/organization/mainIndex";
    }

    @RequestMapping({"/mainIndex"})
    public String mainIndex(Map<String, Object> map, HttpServletRequest request,String mode) throws IOException {
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
        map.put("mode", mode);
        map.put("currHost", currHost);
        return "/configcenter/organization/mainindex";
    }
    /**
     * 自定义设置
     */
    @RequestMapping({"/customSetting"})
    public String customSetting(Map<String, Object> map, Integer uid) {
        map.put("uid", uid);
        return "/configcenter/organization/customSetting";
    }
    /**
     * 建制架构
     */
    @RequestMapping({"/organizationalStructure"})
    public String organizationalStructure(Map<String, Object> map, Integer uid) {
        map.put("uid", uid);
        return "/configcenter/organization/organizationalStructure";
    }
    /**
     * 权限管理
     */
    @RequestMapping({"/authorityManage"})
    public String authorityManage(Map<String, String> map) {

        return "/configcenter/organization/authorityManage";
    }
    /**
     * 基础设置
     */
    @RequestMapping({"/basicSetting"})
    public String basicSetting(Map<String, String> map) {

        return "/configcenter/organization/basicSetting";
    }
    /**
     * 可视化前台展示
     */
    @RequestMapping({"/visualShow"})
    public String visualShow(Map<String, Object> map, Integer uid) {
        map.put("uid", uid);
        return "/configcenter/organization/visualShow";
    }
    /**
     * 架构详情
     */
    @RequestMapping({"/structureDetail"})
    public String structureDetail(Map<String, String> map) {

        return "/configcenter/organization/structureDetail";
    }
    /**
     * 架构详情(新)
     */
    @RequestMapping({"/organizationalSystemPortal"})
    public String organizationalSystemPortal(Map<String, Object> map, HttpServletRequest request,String mode, Integer uid) throws IOException {
        String currHost = "";
        if(apiGateWayHost.indexOf("/api") != -1){
            currHost = apiGateWayHost.replaceAll("/api","");
        }else{
            currHost = apiGateWayHost;
        }
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
        map.put("uid", uid);
        return "/configcenter/organization/organizationalSystemPortal";
    }
    /**
     * 新建字段
     */
    @RequestMapping({"/newField"})
    public String newField(Map<String, Object> map, Integer templateId, Integer processId, Integer configId) {
        map.put("templateId", templateId);
        map.put("processId", processId);
        map.put("configId", configId);
        return "/configcenter/organization/newField";
    }
    /**
     * 新建字段
     */
    @RequestMapping({"/labCatalog"})
    public String labCatalog(Map<String, Object> map, HttpServletRequest request,String ip) {
//        map.put("templateId", templateId);
//        map.put("processId", processId);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("ip", ip);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/configcenter/organization/labCatalog";
    }

}
