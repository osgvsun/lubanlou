package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("resourcesCloud")
public class ResourcesCloudController {
    @Autowired
    private ShareService shareService;
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

    @RequestMapping({"/mainindex"})
    public String mainIndex(Map<String, String> map, HttpServletRequest request) {
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
        return "/resourcesCloud/mainindex";
    }

    @RequestMapping({"/copyFiles"})
    public String copyFiles(Map<String, String> map) {
        return "/resourcesCloud/copyFiles";
    }

    @RequestMapping({"/deleteFiles"})
    public String deleteFiles(Map<String, String> map) {
        return "/resourcesCloud/deleteFiles";
    }

    @RequestMapping({"/documentList"})
    public String documentList(Map<String, String> map) {
        return "/resourcesCloud/documentList";
    }

    @RequestMapping({"/downloadFiles"})
    public String downloadFiles(Map<String, String> map) {
        return "/resourcesCloud/downloadFiles";
    }

    @RequestMapping({"/editFiles"})
    public String editFiles(Map<String, String> map) {
        return "/resourcesCloud/editFiles";
    }

    @RequestMapping({"/fileList"})
    public String fileList(Map<String, Integer> map, @RequestParam(defaultValue = "0") Integer folderType) {
        //文件夹的类型 0我的文件夹 1部门文件夹 2共享文件夹 3企业/学校文库 方便面包屑和方法判断
        map.put("folderType", folderType);
        return "/resourcesCloud/fileList";
    }

    @RequestMapping({"/imageList"})
    public String imageList(Map<String, String> map) {
        return "/resourcesCloud/imageList";
    }

    @RequestMapping({"/messageList"})
    public String messageList(Map<String, String> map) {
        return "/resourcesCloud/messageList";
    }

    @RequestMapping({"/moveFiles"})
    public String moveFiles(Map<String, String> map) {
        return "/resourcesCloud/moveFiles";
    }

    @RequestMapping({"/newFolder"})
    public String newFolder(Map<String, String> map) {
        return "/resourcesCloud/newFolder";
    }

    @RequestMapping({"/previewFiles"})
    public String previewFiles(Map<String, String> map, @RequestParam String url, @RequestParam String type) {
        map.put("fileUrl", url);
        map.put("fileType", type);
        return "/resourcesCloud/previewFiles";
    }

    @RequestMapping({"/shareLink"})
    public String shareLink(Map<String, String> map) {
        return "/resourcesCloud/shareLink";
    }

    @RequestMapping({"/transmissionList"})
    public String transmissionList(Map<String, String> map) {
        return "/resourcesCloud/transmissionList";
    }

    @RequestMapping({"/shareQrcode"})
    public String shareQrcode(Map<String, String> map) {
        return "/resourcesCloud/shareQrcode";
    }

    @RequestMapping({"/shareWithVarious"})
    public String shareWithVarious(Map<String, String> map) {
        return "/resourcesCloud/shareWithVarious";
    }

    @RequestMapping({"/switchPermissions"})
    public String switchPermissions(Map<String, String> map) {
        return "/resourcesCloud/switchPermissions";
    }

    @RequestMapping({"/tabList"})
    public String tabList(Map<String, String> map) {
        return "/resourcesCloud/tabList";
    }

    @RequestMapping({"/uploadFiles"})
    public String uploadFiles(Map<String, String> map) {
        return "/resourcesCloud/uploadFiles";
    }
}
