package net.gvsun.teacherinformationcenter.controller.equipmentManagement;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.session.dto.User;
import net.gvsun.teacherinformationcenter.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;


@Controller
@RequestMapping("/instrumentmanagement")
public class InstrumentManagementController {
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


    @Autowired
    public InstrumentManagementController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    /**
     * 仪器列表页面
     */
    @RequestMapping(value = "/equipmentList", method = {RequestMethod.GET})
    public String equipmentList(Map<String, Object> map, HttpServletRequest request) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/equipmentList";
    }
    /**
     * 仪器基本信息页面
     */
    @RequestMapping(value = "/equipmentBasicInfo", method = {RequestMethod.GET})
    public String equipmentBasicInfo(Map<String, Object> map, HttpServletRequest request, String uid, String configType) {
        map.put("uid", uid);
        map.put("configType", configType);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/equipmentBasicInfo";
    }
    /**
     * 预约设置页面
     */
    @RequestMapping(value = "/equipmentReserve", method = {RequestMethod.GET})
    public String equipmentReserve(Map<String, Object> map, HttpServletRequest request, String uid) {
        map.put("uid", uid);
        return "/instrumentManagement/equipmentReserve";
    }
    /**
     * 机时预约页面
     */
    @RequestMapping(value = "/equipmentTimeBooking", method = {RequestMethod.GET})
    public String equipmentTimeBooking(Map<String, Object> map, HttpServletRequest request, String uid) {
        User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/equipmentTimeBooking";
    }
    /**
     * 送样检测页面
     */
    @RequestMapping(value = "/equipmentSampleInspection", method = {RequestMethod.GET})
    public String equipmentSampleInspection(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/equipmentSampleInspection";
    }
    /**
     * 仪器公告页面
     */
    @RequestMapping(value = "/noticeManage", method = {RequestMethod.GET})
    public String noticeManage(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/noticeManage";
    }
    /**
     * 电源控制器页面
     */
    @RequestMapping(value = "/powerControllerSet", method = {RequestMethod.GET})
    public String powerControllerSet(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/instrumentManagement/powerControllerSet";
    }
    /**
     * 开放设置从模版处添加页面
     */
    @RequestMapping(value = "/openTimeTemplate", method = {RequestMethod.GET})
    public String openTimeTemplate(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/openTimeTemplate";
    }
    /**
     * 机时预约收费设置页面
     */
    @RequestMapping(value = "/equipmentTimeCharge", method = {RequestMethod.GET})
    public String equipmentTimeCharge(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/equipmentTimeCharge";
    }
    /**
     * 送样检测检测项目页面
     */
    @RequestMapping(value = "/equipmentInspectProject", method = {RequestMethod.GET})
    public String equipmentInspectProject(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/equipmentInspectProject";
    }
    /**
     * 送样检测检测项目页面
     */
    @RequestMapping(value = "/equipmentSampleCharge", method = {RequestMethod.GET})
    public String equipmentSampleCharge(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/equipmentSampleCharge";
    }
    /**
     * 设备管理员添加页面
     */
    @RequestMapping(value = "/newEquipmentManager", method = {RequestMethod.GET})
    public String newEquipmentManager(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/newEquipmentManager";
    }
    /**
     * 仪器公告添加页面
     */
    @RequestMapping(value = "/newNoticeManage", method = {RequestMethod.GET})
    public String newNoticeManage(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/newNoticeManage";
    }
    /**
     * 仪器公告添加页面
     */
    @RequestMapping(value = "/editNoticeManage", method = {RequestMethod.GET})
    public String editNoticeManage(Map<String, Object> map, HttpServletRequest request, String uid) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("uid", uid);
        return "/instrumentManagement/editNoticeManage";
    }
    /**
     * 机时预约开放时间设置页面
     */
    @RequestMapping(value = "/newOpenTime", method = {RequestMethod.GET})
    public String newOpenTime(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/newOpenTime";
    }
    /**
     * 机时预约开放时间设置编辑页面
     */
    @RequestMapping(value = "/editOpenTime", method = {RequestMethod.GET})
    public String editOpenTime(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/editOpenTime";
    }
    /**
     * 机时预约不开放时间设置页面
     */
    @RequestMapping(value = "/newNoBooking", method = {RequestMethod.GET})
    public String newNoBooking(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/newNoBooking";
    }
    /**
     * 机时预约不开放时间设置编辑页面
     */
    @RequestMapping(value = "/editNoBooking", method = {RequestMethod.GET})
    public String editNoBooking(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/editNoBooking";
    }
    /**
     * 机时预约- 收费设置- 附加收费- 新增
     */
    @RequestMapping(value = "/newTimeExtraCharge", method = {RequestMethod.GET})
    public String newTimeExtraCharge(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/newTimeExtraCharge";
    }
    /**
     * 机时预约- 收费设置- 收费项目- 新增
     */
    @RequestMapping(value = "/newChargeItem", method = {RequestMethod.GET})
    public String newChargeItem(Map<String, Object> map, HttpServletRequest request, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/instrumentManagement/newChargeItem";
    }
    /**
     * 送样检测- 基础设置- 样品送样检测属性准入- 新增
     */
    @RequestMapping(value = "/newSampleAttribute", method = {RequestMethod.GET})
    public String newSampleAttribute(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newSampleAttribute";
    }
    /**
     * 送样检测- 基础设置- 可接样时间设置- 新增
     */
    @RequestMapping(value = "/newReceiveSample", method = {RequestMethod.GET})
    public String newReceiveSample(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newReceiveSample";
    }
    /**
     * 送样检测- 基础设置- 不可预约时间设置- 新增
     */
    @RequestMapping(value = "/newNoReceiveSample", method = {RequestMethod.GET})
    public String newNoReceiveSample(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newNoReceiveSample";
    }
    /**
     * 送样检测- 检测项目- 新增
     */
    @RequestMapping(value = "/newInspectProject", method = {RequestMethod.GET})
    public String newInspectProject(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newInspectProject";
    }
    /**
     * 送样检测- 检测项目- 添加收费项
     */
    @RequestMapping(value = "/newInspectProjectCharge", method = {RequestMethod.GET})
    public String newInspectProjectCharge(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newInspectProjectCharge";
    }
    /**
     * 送样检测- 附加收费
     */
    @RequestMapping(value = "/newSampleExtraCharge", method = {RequestMethod.GET})
    public String newSampleExtraCharge(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/newSampleExtraCharge";
    }
    /**
     * 电源控制器- 新增
     */
    @RequestMapping(value = "/newPowerControllerSet", method = {RequestMethod.GET})
    public String newPowerControllerSet(Map<String, Object> map, HttpServletRequest request, String uid) {
        map.put("uid", uid);
        return "/instrumentManagement/newPowerControllerSet";
    }
    /**
     * 机时预约- 其他字段新增
     */
    @RequestMapping(value = "/newOtherContent", method = {RequestMethod.GET})
    public String newOtherContent(Map<String, Object> map, HttpServletRequest request, String configUid, String uid) {
        map.put("configUid", configUid);
        map.put("uid", uid);
        return "/instrumentManagement/newOtherContent";
    }
    /**
     * 机时预约- 计费费用新增
     */
    @RequestMapping(value = "/newBilling", method = {RequestMethod.GET})
    public String newBilling(Map<String, Object> map, HttpServletRequest request, String configUid) {
        map.put("configUid", configUid);
        return "/instrumentManagement/newBilling";
    }
    /**
     * 机时预约- 另存模版
     */
    @RequestMapping(value = "/saveAsTimeTemplate", method = {RequestMethod.GET})
    public String saveAsTimeTemplate(Map<String, Object> map, HttpServletRequest request) {
        return "/instrumentManagement/saveAsTimeTemplate";
    }
}
