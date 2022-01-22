package net.gvsun.teacherinformationcenter.controller.teachResource;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/teachResource")
public class ResourceController {
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
    public ResourceController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    /**
     * 获取当前登陆人
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }

    @RequestMapping("/switchPermissions")
    public String switchPermissions(HttpServletRequest request, Map<String, Object> map) {
        return "/teachResource/switchPermissions";
    }
    /**
     * 首页
     */
    @RequestMapping("/mainindex")
    public String mainindex(HttpServletRequest request, Map<String, Object> map, Integer cid, String type) throws IOException {
        // 获取用户信息
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        if(cid==null){
            cid=1218;
        }
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("cid", cid);
        map.put("cid", cid);
        map.put("type", type);
        map.put("apiGateWayHost", apiGateWayHost);
        return "/teachResource/mainindex";
    }

    /**
     * 知识
     * @param request
     * @param map
     * @param type
     * @param title
     * @return
     * @throws IOException
     */
    @RequestMapping("/knowledgeResource")
    public String knowledgeResource(HttpServletRequest request, Map<String, Object> map,  Integer type, String title, String name ) throws IOException {
        map.put("type", type);
        map.put("title", title);
        map.put("name",name);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/knowledgeResource";
    }


    @RequestMapping("/addVideo")
    public String addVideo(HttpServletRequest request, Map<String, Object> map,String name) throws IOException {
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("name",name);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/resourceUnit/addVideo";
    }
    @RequestMapping("/addpicture")
    public String addpicture(HttpServletRequest request, Map<String, Object> map, String name) throws IOException {
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("name",name);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/resourceUnit/addpicture";
    }
    @RequestMapping("/addfile")
    public String addfile(HttpServletRequest request, Map<String, Object> map,String name) throws IOException {
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("name",name);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/resourceUnit/addfile";
    }

    @RequestMapping("/addlink")
    public String addlink(HttpServletRequest request, Map<String, Object> map,String name) throws IOException {
        // 获取用户信息
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("name",name);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/resourceUnit/addlink";
    }

    @RequestMapping("/sectionList")
    public String sectionList(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/sections";
    }
    @RequestMapping("/videoList")
    public String videoList(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/video";
    }
    @RequestMapping("/pictureList")
    public String pictureList(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/picture";
    }
    @RequestMapping("/fileList")
    public String fileList(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/files";
    }
    @RequestMapping("/linkList")
    public String linkList(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/links";
    }

    @RequestMapping("/newchapter")
    public String newchapter(HttpServletRequest request, Map<String, Object> map,String chapterId) throws IOException {
        map.put("chapterId",chapterId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/newchapter";
    }

    @RequestMapping("/newsection")
    public String newsection(HttpServletRequest request, Map<String, Object> map,String sectionId) throws IOException {
        map.put("sectionId",sectionId);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/teachResource/views/newsection";
    }
}
