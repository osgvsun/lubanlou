package net.gvsun.teacherinformationcenter.controller.labBranch;

import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("labBranch")
public class LabBranch {

    @Autowired
    private ShareService shareService;

    @Value("${apiGateWayHost}")
    private String userCenterHost;

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @Value("${authorization.siteEnName}")
    private String siteEnName;

    @Value("${authorization.siteSecret}")
    private String siteSecret;

    @Value("${oauth2Host}")
    private String oauth2;

    @Value("${logo}")
    private String logo;

    @Value("${resourceContainerHostForUpload}")
    //@Value("http://localhost:32008")
    private String resourceContainerHost;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    /**
     * 获取当前登陆人
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) {
        return shareService.getCurrentUserFromUnifySession(request);
    }

    @RequestMapping({"/labMain"})
    public String labSecurity(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("siteEnName", siteEnName);
        map.put("oauth2", oauth2);
        map.put("apiGateWayHost", apiGateWayHost);
        return "/labBranch/labMain";
    }

    @RequestMapping("/setManager")
    public String setManager(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/setManager";
    }

    @RequestMapping("/newLab")
    public String newLab(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/newLab";
    }

    @RequestMapping("/labCatalog")
    public String labCatalog(Map<String, String> map, HttpServletRequest request) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("logo", this.getCurrentSourceLogo(request));
        return "/labBranch/labCatalog";
    }

    @RequestMapping("/addAuthorizationList")
    public String addAuthorizationList(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addAuthorizationList";
    }

    @RequestMapping("/addEquipment")
    public String addEquipment(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addEquipment";
    }

    @RequestMapping("/addIOThardware")
    public String addIOThardware(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addIOThardware";
    }

    @RequestMapping("/addIOTmanager")
    public String addIOTmanager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addIOTmanager";
    }

    @RequestMapping("/addLabProject")
    public String addLabProject(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addLabProject";
    }

    @RequestMapping("/addManager")
    public String addManager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addManager";
    }

    @RequestMapping("/addNonLineBooking")
    public String addNonLineBooking(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addNonLineBooking";
    }

    @RequestMapping("/addNoReservationEquipment")
    public String addNoReservationEquipment(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addNoReservationEquipment";
    }

    @RequestMapping("/addSoftwareList")
    public String addSoftwareList(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/addSoftwareList";
    }

    @RequestMapping("/addVirtualApplianceBooking")
    public String addVirtualApplianceBooking(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addVirtualApplianceBooking";
    }

    @RequestMapping("/authorizationList")
    public String authorizationList(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/authorizationList";
    }

    @RequestMapping("/computerUseRecord")
    public String computerUseRecord(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/computerUseRecord";
    }

    @RequestMapping("/editLab")
    public String editLab(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/editLab";
    }

    @RequestMapping("/equipment")
    public String equipment(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/equipment";
    }

    @RequestMapping("/importEquipment")
    public String importEquipment(Map<String, String> map, @RequestParam String labRoomId, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        map.put("labRoomId", labRoomId);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("userCenterHost", userCenterHost);
        map.put("oauth2Host", oauth2);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/labBranch/importEquipment";
    }

    @RequestMapping("/importIOTmanager")
    public String importIOTmanager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2);
        map.put("userCenterHost", userCenterHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/labBranch/importIOTmanager";
    }

    @RequestMapping("/importManager")
    public String importManager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2);
        map.put("userCenterHost", userCenterHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/labBranch/importManager";
    }

    @RequestMapping("/IOThardware")
    public String IOThardware(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/IOThardware";
    }

    @RequestMapping("/IOTmanager")
    public String IOTmanager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/IOTmanager";
    }

    @RequestMapping("/labDetail")
    public String labDetail(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/labDetail";
    }

    @RequestMapping("/labProject")
    public String labProject(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/labProject";
    }

    @RequestMapping("/manager")
    public String manager(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/manager";
    }

    @RequestMapping("/nonLineBooking")
    public String nonLineBooking(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/nonLineBooking";
    }

    @RequestMapping("/noReservationEquipment")
    public String noReservationEquipment(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/noReservationEquipment";
    }

    @RequestMapping("/openReservationEquipment")
    public String openReservationEquipment(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/openReservationEquipment";
    }

    @RequestMapping("/operationLog")
    public String operationLog(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/operationLog";
    }

    @RequestMapping("/resource")
    public String resource(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("oauth2Host", oauth2);
        map.put("userCenterHost", userCenterHost);
        map.put("siteSecret", siteSecret);
        map.put("siteEnName", siteEnName);
        map.put("labRoomId", labRoomId);
        return "/labBranch/resource";
    }

    @RequestMapping("/setLabReservation")
    public String setLabReservation(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/setLabReservation";
    }

    @RequestMapping("/setOpenReservationEquipment")
    public String setOpenReservationEquipment(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/setOpenReservationEquipment";
    }

    @RequestMapping("/softwareList")
    public String softwareList(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/softwareList";
    }

    @RequestMapping("/virtualApplianceBooking")
    public String virtualApplianceBooking(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/virtualApplianceBooking";
    }

    @RequestMapping("/setStationReservation")
    public String setStationReservation(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/setStationReservation";
    }

    @RequestMapping("/accessControl")
    public String accessControl(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/accessControl";
    }

    @RequestMapping("/addNoReservationLab")
    public String addNoReservationLab(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addNoReservationLab";
    }

    @RequestMapping("/newExam")
    public String newExam(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/newExam";
    }

    @RequestMapping("/newSubject")
    public String newSubject(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/newSubject";
    }

    @RequestMapping("/noReservationLab")
    public String noReservationLab(Map<String, String> map, @RequestParam String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/noReservationLab";
    }

    @RequestMapping("/openReservationLab")
    public String openReservationLab(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/openReservationLab";
    }

    @RequestMapping("/setOpenReservationLab")
    public String setOpenReservationLab(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/setOpenReservationLab";
    }

    @RequestMapping("/subjectExam")
    public String subjectExam(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/subjectExam";
    }

    @RequestMapping("/access")
    public String access(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/access";
    }

    @RequestMapping("/accessList")
    public String accessList(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/accessList";
    }

    @RequestMapping("/addAccessList")
    public String addAccessList(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addAccessList";
    }

    @RequestMapping("/addIrregularTraining")
    public String addIrregularTraining(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addIrregularTraining";
    }

    @RequestMapping("/addTraining")
    public String addTraining(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addTraining";
    }

    @RequestMapping("/exam")
    public String exam(Map<String, String> map, String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("labRoomId", labRoomId);
        return "/labBranch/exam";
    }

    @RequestMapping("/importAccessList")
    public String importAccessList(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/importAccessList";
    }

    @RequestMapping("/newExamInfo")
    public String newExamInfo(Map<String, String> map, String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("labRoomId", labRoomId);
        return "/labBranch/newExamInfo";
    }

    @RequestMapping("/newSubjectInfo")
    public String newSubjectInfo(Map<String, String> map, String labRoomId) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("labRoomId", labRoomId);
        return "/labBranch/newSubjectInfo";
    }

    @RequestMapping("/labQualification")
    public String labQualification(Map<String, String> map, String labRoomId, String listId) {
        map.put("timetableHost", apiGateWayHost);
        map.put("labRoomId", labRoomId);
        map.put("listId", listId);
        return "/labBranch/labQualification";
    }

    @RequestMapping("/riskPoint")
    public String riskPoint(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/riskPoint";
    }

    @RequestMapping("/protectionPoint")
    public String protectionPoint(Map<String, String> map) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/protectionPoint";
    }
    @RequestMapping("/download")
    public String download(Map<String, String> map, String state) {
        map.put("timetableHost", apiGateWayHost + "/timetable");
        map.put("state", state);
        return "/labBranch/download";
    }

    /**
     * 实验室新建- 添加所属房间
     */
    @RequestMapping("/addSystemRoom")
    public String addSystemRoom(Map<String, String> map, String type) {
        map.put("type", type);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/addSystemRoom";
    }
    /**
     * 仪器设备- 设备迁移
     */
    @RequestMapping("/equipmentMigration")
    public String equipmentMigration(Map<String, String> map, String ids) {
        map.put("ids", ids);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/equipmentMigration";
    }
    /**
     * 视频播放展示页面
     */
    @RequestMapping("/videoPlayback")
    public String videoPlayback(Map<String, String> map, String agentId) {
        map.put("agentId", agentId);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/videoPlayback";
    }
    /**
     * 通过实验中心编号参数能查看该中心下的所有实验分室
     */
    @RequestMapping("/labCenter")
    public String labCenter(Map<String, String> map, String labCenterId, String type) {
        map.put("type", type);
        map.put("labCenterId", labCenterId);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/labCenter";
    }
    /**
     * 通过实验中心编号参数能查看该中心下的所有实验分室
     */
    @RequestMapping("/labAnnex")
    public String labAnnex(Map<String, String> map, String labAnnexId, String type) {
        map.put("type", type);
        map.put("labCenterId", labAnnexId);
        map.put("timetableHost", apiGateWayHost + "/timetable");
        return "/labBranch/labCenter";
    }
    public String getCurrentSourceLogo(HttpServletRequest request) {
        String cookieKey = "datasource.cookie";
        String cookieVal = "limsproduct";
        String datasource = null;
        // 获取cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieKey)) {
                    datasource = cookie.getValue();
                    break;
                }
            }
        }
        // 获取cookies里的值 并且是庚商源下的
        if (datasource != null && datasource != "" && datasource.equals(cookieVal)) {
            return "logo_basic.png";
        }
        // 没有cookie就是返回默认的logo
        return logo;
    }
}
