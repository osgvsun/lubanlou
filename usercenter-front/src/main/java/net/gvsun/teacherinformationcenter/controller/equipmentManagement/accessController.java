package net.gvsun.teacherinformationcenter.controller.equipmentManagement;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/access")
public class accessController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;
    @Value("${oauth2Host}")
    private String oauth2;

    public accessController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    /**
     * 获取当前登陆人
     *
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }
    /**
     * 准入设置- 准入方式页面
     */
    @RequestMapping(value = "/equipmentAdmittanceMode", method = {RequestMethod.GET})
    public String equipmentList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/equipmentAdmittanceMode";
    }
    /**
     * 准入设置- 考试管理页面
     */
    @RequestMapping(value = "/equipmentExamManage", method = {RequestMethod.GET})
    public String equipmentExamManage(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/equipmentExamManage";
    }
    /**
     * 准入设置- 培训管理页面
     */
    @RequestMapping(value = "/equipmentTrainingManage", method = {RequestMethod.GET})
    public String equipmentTrainingManage(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/equipmentTrainingManage";
    }
    /**
     * 准入设置- 培训管理- 期望培训页面
     */
    @RequestMapping(value = "/trainingDateList", method = {RequestMethod.GET})
    public String trainingDateList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/trainingDateList";
    }
    /**
     * 准入设置- 培训管理- 新增
     */
    @RequestMapping(value = "/newEquipmentTrainingManage", method = {RequestMethod.GET})
    public String newEquipmentTrainingManage(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType, String type) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        map.put("type", type);
        map.put("oauth2Host", oauth2);
        return "/access/newEquipmentTrainingManage";
    }
    /**
     * 准入设置- 培训管理- 结果录入页面
     */
    @RequestMapping(value = "/trainingDetailList", method = {RequestMethod.GET})
    public String trainingDetailList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/trainingDetailList";
    }
    /**
     * 准入设置- 安全准入页面
     */
    @RequestMapping(value = "/equipmentSecurityProtocol", method = {RequestMethod.GET})
    public String equipmentSecurityProtocol(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/equipmentSecurityProtocol";
    }
    /**
     * 准入名单- 准入/等级名单页面
     */
    @RequestMapping(value = "/accessList", method = {RequestMethod.GET})
    public String accessList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/accessList";
    }
    /**
     * 准入名单- 授权名单页面
     */
    @RequestMapping(value = "/authorizationList", method = {RequestMethod.GET})
    public String authorizationList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/authorizationList";
    }
    /**
     * 准入名单- 授权名单- 新增页面
     */
    @RequestMapping(value = "/newAuthorizationList", method = {RequestMethod.GET})
    public String newAuthorizationList(Map<String, Object> map, HttpServletRequest request) {
        return "/access/newAuthorizationList";
    }
    /**
     * 准入名单- 免审核名单页面
     */
    @RequestMapping(value = "/auditFreeList", method = {RequestMethod.GET})
    public String auditFreeList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/auditFreeList";
    }
    /**
     * 准入名单- 免考试名单页面
     */
    @RequestMapping(value = "/examFreeList", method = {RequestMethod.GET})
    public String examFreeList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/examFreeList";
    }
    /**
     * 准入名单- 免考试名单- 新增页面
     * 免审核页面新增
     */
    @RequestMapping(value = "/newExamFreeList", method = {RequestMethod.GET})
    public String newExamFreeList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType, Integer flag, String parentTable) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        map.put("flag", flag);
        map.put("parentTable", parentTable);
        map.put("oauth2Host", oauth2);
        return "/access/newExamFreeList";
    }
    /**
     * 准入名单- 黑名单页面
     */
    @RequestMapping(value = "/blackList", method = {RequestMethod.GET})
    public String blackList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/blackList";
    }
    /**
     * 准入名单- 安全协议页面
     */
    @RequestMapping(value = "/securityList", method = {RequestMethod.GET})
    public String securityList(Map<String, Object> map, HttpServletRequest request, String entityId) {
        map.put("entityId", entityId);
        return "/access/securityList";
    }
    /**
     * 准入名单- 安全协议- 新增页面
     */
    @RequestMapping(value = "/newSecurityList", method = {RequestMethod.GET})
    public String newSecurityList(Map<String, Object> map, HttpServletRequest request) {
        map.put("oauth2Host", oauth2);
        return "/access/newSecurityList";
    }

    /**
     * 安全准入管理 - 培训准入
     */
    @RequestMapping(value = "/traningAccessList", method = {RequestMethod.GET})
    public String traningAccessList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/securityAccess/traningAccessList";
    }
    /**
     * 安全准入管理 - 培训准入- 新建培训
     */
    @RequestMapping(value = "/newTraningList", method = {RequestMethod.GET})
    public String newTraningList(Map<String, Object> map, HttpServletRequest request) {
        return "/access/securityAccess/newTraningList";
    }
    /**
     * 安全准入管理 - 考试准入
     */
    @RequestMapping(value = "/examAccessList", method = {RequestMethod.GET})
    public String examAccessList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/securityAccess/examAccessList";
    }
    /**
     * 安全准入管理 - 期望培训时间
     */
    @RequestMapping(value = "/expectTraningAccessList", method = {RequestMethod.GET})
    public String expectTraningAccessList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/securityAccess/expectTraningAccessList";
    }
    /**
     * 仪器培训
     */
    @RequestMapping(value = "/instrumentTrainingList", method = {RequestMethod.GET})
    public String instrumentTrainingList(Map<String, Object> map, HttpServletRequest request, String entityId, String entityType) {
        map.put("entityId", entityId);
        map.put("entityType", entityType);
        return "/access/instrumentExpect/instrumentTrainingList";
    }
}
