package net.gvsun.teacherinformationcenter.controller.resourcePermissions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("/resourcePermissions")
public class resourcePermissions {

    @Value("${oauth2Host}")
    private String oauth2;

    /**
     * 资源权限
     */
    @RequestMapping(value = "/resourceTree", method = {RequestMethod.GET})
    public String resourceTree(Map<String, Object> map, HttpServletRequest request) {
        map.put("oauth2Host", oauth2);
        return "/resourcePermissions/resourceTree";
    }

    /**
     * 角色管理
     */
    @RequestMapping(value = "/roleManagement", method = {RequestMethod.GET})
    public String roleManagement(Map<String, Object> map, HttpServletRequest request) {
        map.put("oauth2Host", oauth2);
        return "/resourcePermissions/roleManagement";
    }
    /**
     * 角色授权
     */
    @RequestMapping(value = "/roleAuthorization", method = {RequestMethod.GET})
    public String roleAuthorization(Map<String, Object> map, HttpServletRequest request, String roleId) {
        map.put("roleId", roleId);
        map.put("oauth2Host", oauth2);
        return "/resourcePermissions/roleAuthorization";
    }
    /**
     * 许可列表
     */
    @RequestMapping(value = "/resourceLicense", method = {RequestMethod.GET})
    public String resourceLicense(Map<String, Object> map, HttpServletRequest request, String roleId) {
        map.put("roleId", roleId);
        map.put("oauth2Host", oauth2);
        return "/resourcePermissions/resourceLicense";
    }
}
