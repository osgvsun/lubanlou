package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.teacherinformationcenter.service.ShareService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

/**
 * @author addpd
 */
@Controller
@RequestMapping("openReservation")
public class OpenReservationController {

    @Value("${oauth2Host}")
    private String oauth2Host;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;

    private final ShareService shareService;

    public OpenReservationController(ShareService shareService) {
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

    @RequestMapping({"/mainindex"})
    public String mainIndex(Map<String, String> map) {

        return "/openReservation/mainindex";
    }

    @RequestMapping({"/appointmentExamine"})
    public String appointmentExamine(Map<String, String> map) {
        return "/openReservation/appointmentExamine";
    }

    @RequestMapping({"/appointmentList"})
    public String appointmentList(Map<String, String> map) {
        return "/openReservation/appointmentList";
    }

    @RequestMapping({"/appointmentListDetail"})
    public String appointmentListDetail(Map<String, String> map) {
        return "/openReservation/appointmentListDetail";
    }

    @RequestMapping({"/appointmentOverview"})
    public String appointmentOverview(Map<String, String> map) {
        return "/openReservation/appointmentOverview";
    }

    @RequestMapping({"/appointmentTypeSet"})
    public String appointmentTypeSet(Map<String, String> map) {
        return "/openReservation/appointmentTypeSet";
    }

    @RequestMapping({"/auditFreeList"})
    public String auditFreeList(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        return "/openReservation/auditFreeList";
    }

    @RequestMapping({"/batchAppointmentExamine"})
    public String batchAppointmentExamine(Map<String, String> map) {
        return "/openReservation/batchAppointmentExamine";
    }

    @RequestMapping({"/blackList"})
    public String blackList(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        return "/openReservation/blackList";
    }

    @RequestMapping({"/collegeTemplateSet"})
    public String collegeTemplateSet(Map<String, String> map) {
        return "/openReservation/collegeTemplateSet";
    }

    @RequestMapping({"/creditScoreDeduct"})
    public String creditScoreDeduct(Map<String, String> map) {
        return "/openReservation/creditScoreDeduct";
    }

    @RequestMapping({"/creditScoreDeductDetail"})
    public String creditScoreDeductDetail(Map<String, String> map) {
        return "/openReservation/creditScoreDeductDetail";
    }

    @RequestMapping({"/creditScoreInfo"})
    public String creditScoreInfo(Map<String, String> map) {
        return "/openReservation/creditScoreInfo";
    }

    @RequestMapping({"/creditScoreSet"})
    public String creditScoreSet(Map<String, String> map) {
        return "/openReservation/creditScoreSet";
    }

    @RequestMapping({"/creditScoreType"})
    public String creditScoreType(Map<String, String> map) {
        return "/openReservation/creditScoreType";
    }

    @RequestMapping({"/editCreditScoreSet"})
    public String editCreditScoreSet(Map<String, String> map) {
        return "/openReservation/editCreditScoreSet";
    }

    @RequestMapping({"/editField"})
    public String editField(Map<String, String> map) {
        return "/openReservation/editField";
    }

    @RequestMapping({"/editNoBooking"})
    public String editNoBooking(Map<String, String> map) {
        return "/openReservation/editNoBooking";
    }

    @RequestMapping({"/editOpenTime"})
    public String editOpenTime(Map<String, String> map, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/openReservation/editOpenTime";
    }

    @RequestMapping({"/editOtherField"})
    public String editOtherField(Map<String, String> map) {
        return "/openReservation/editOtherField";
    }

    @RequestMapping({"/equipmentAdmittanceMode"})
    public String equipmentAdmittanceMode(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/equipmentAdmittanceMode";
    }

    @RequestMapping({"/equipmentReserve"})
    public String equipmentReserve(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        return "/openReservation/equipmentReserve";
    }

    @RequestMapping({"/equipmentTimeBooking"})
    public String equipmentTimeBooking(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/equipmentTimeBooking";
    }

    @RequestMapping({"/authorizationList"})
    public String authorizationList(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        return "/openReservation/authorizationList";
    }

    @RequestMapping({"/equipmentTrainingManage"})
    public String equipmentTrainingManage(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/equipmentTrainingManage";
    }

    @RequestMapping({"/examFreeList"})
    public String examFreeList(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        return "/openReservation/examFreeList";
    }

    @RequestMapping({"/labAppointment"})
    public String labAppointment(Map<String, String> map, String configType, String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/labAppointment";
    }

    @RequestMapping({"/labMain"})
    public String labMain(Map<String, String> map) {
        return "/openReservation/labMain";
    }

    @RequestMapping({"/myAppointment"})
    public String myAppointment(Map<String, String> map) {
        return "/openReservation/myAppointment";
    }

    @RequestMapping({"/myAppointmentDetail"})
    public String myAppointmentDetail(Map<String, String> map) {
        return "/openReservation/myAppointmentDetail";
    }

    @RequestMapping({"/myCreditScore"})
    public String myCreditScore(Map<String, String> map) {
        return "/openReservation/myCreditScore";
    }

    @RequestMapping({"/newAuditFreeList"})
    public String newAuditFreeList(Map<String, String> map) {
        return "/openReservation/newAuditFreeList";
    }

    @RequestMapping({"/newAuthorizationList"})
    public String newAuthorizationList(Map<String, String> map) {
        return "/openReservation/newAuthorizationList";
    }

    @RequestMapping({"/newBlackList"})
    public String newBlackList(Map<String, String> map) {
        return "/openReservation/newBlackList";
    }

    @RequestMapping({"/newCreditScoreSet"})
    public String newCreditScoreSet(Map<String, String> map) {
        return "/openReservation/newCreditScoreSet";
    }

    @RequestMapping({"/newEquipmentTrainingManage"})
    public String newEquipmentTrainingManage(Map<String, String> map) {
        return "/openReservation/newEquipmentTrainingManage";
    }

    @RequestMapping({"/newExamFreeList"})
    public String newExamFreeList(Map<String, String> map) {
        return "/openReservation/newExamFreeList";
    }

    @RequestMapping({"/newField"})
    public String newField(Map<String, String> map) {
        return "/openReservation/newField";
    }

    @RequestMapping({"/newNoBooking"})
    public String newNoBooking(Map<String, String> map, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/openReservation/newNoBooking";
    }

    @RequestMapping({"/newOpenTime"})
    public String newOpenTime(Map<String, String> map, String configMachineUid) {
        map.put("configMachineUid", configMachineUid);
        return "/openReservation/newOpenTime";
    }

    @RequestMapping({"/newOtherField"})
    public String newOtherField(Map<String, String> map, String configUid, String uid) {
        map.put("configUid", configUid);
        map.put("uid", uid);
        return "/openReservation/newOtherField";
    }

    @RequestMapping({"/openMain"})
    public String openMain(Map<String, String> map) {
        return "/openReservation/openMain";
    }

    @RequestMapping({"/openTimeTemplate"})
    public String openTimeTemplate(Map<String, String> map) {
        return "/openReservation/openTimeTemplate";
    }

    @RequestMapping({"/personalTemplateSet"})
    public String personalTemplateSet(Map<String, String> map) {
        return "/openReservation/personalTemplateSet";
    }

    @RequestMapping({"/saveAsTimeTemplate"})
    public String saveAsTimeTemplate(Map<String, String> map) {
        return "/openReservation/saveAsTimeTemplate";
    }

    @RequestMapping({"/securityList"})
    public String securityList(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/securityList";
    }

    @RequestMapping({"/soloAppointmentExamine"})
    public String soloAppointmentExamine(Map<String, String> map) {
        return "/openReservation/soloAppointmentExamine";
    }

    @RequestMapping({"/stationAppointmentOne"})
    public String stationAppointmentOne(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        return "/openReservation/stationAppointmentOne";
    }

    @RequestMapping({"/stationAppointmentTwo"})
    public String stationAppointmentTwo(Map<String, String> map, @RequestParam String configType, @RequestParam String labRoomId) {
        map.put("configType", configType);
        map.put("labRoomId", labRoomId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        return "/openReservation/stationAppointmentTwo";
    }

    @RequestMapping({"/stationMain"})
    public String stationMain(Map<String, String> map) {
        return "/openReservation/stationMain";
    }

    @RequestMapping({"/switchPermissions"})
    public String switchPermissions(Map<String, String> map) {
        return "/openReservation/switchPermissions";
    }

    @RequestMapping({"/trainingDateList"})
    public String trainingDateList(Map<String, String> map) {
        return "/openReservation/trainingDateList";
    }

    @RequestMapping({"/trainingDetailList"})
    public String trainingDetailList(Map<String, String> map) {
        return "/openReservation/trainingDetailList";
    }

    /*
     * 图片 打点
     */
    @RequestMapping({"/imageTracingPoint"})
    public String imageTracingPoint(Map<String, String> map) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        return "/openReservation/imageTracingPoint";
    }
}
