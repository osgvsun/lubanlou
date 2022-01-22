package net.gvsun.teacherinformationcenter.controller.iot;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;
@Controller
@RequestMapping("/iot")
public class IotAccessController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${apiGateWayHost}")
    private String userCenterHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${dataSource}")
    private String dataSource;
    @Value("${oauth2Host}")
    private String oauth2;
    @Value("${teachHost}")
    private String teachHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Autowired
    public IotAccessController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }


    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    /**
     *  Description iot的增删改查入口
     *
     *  @param map
     *  @return java.lang.String
     *  @author cjl
     *  @date 2020/9/17
     */
    @RequestMapping(value = "/iotAccessControl", method = {RequestMethod.GET})
    public String iotAccessControl(Map<String, String> map, HttpServletRequest request) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotAccessControl";
    }

    @RequestMapping(value = "/authorityAccessControl", method = {RequestMethod.GET})
    public String authorityAccessControl(Map<String, String> map, HttpServletRequest request) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityAccessControl";
    }

    @RequestMapping(value = "/iotPowerController", method = {RequestMethod.GET})
    public String iotPowerController(Map<String, String> map, HttpServletRequest request) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotPowerController";
    }

    @RequestMapping(value = "/iotAttendanceMachine", method = {RequestMethod.GET})
    public String iotAttendanceMachine(Map<String, String> map, HttpServletRequest request) throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotAttendanceMachine";
    }

    @RequestMapping(value = "/iotClassCard", method = {RequestMethod.GET})
    public String iotClassCard(Map<String, String> map, HttpServletRequest request) throws IOException{
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotClassCard";
    }

    @RequestMapping(value = "/iotVideo", method = {RequestMethod.GET})
    public String iotVideo(Map<String, String> map, HttpServletRequest request)throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotVideo";
    }

    @RequestMapping(value = "/iotStationInstrument", method = {RequestMethod.GET})
    public String iotStationInstrument(Map<String, String> map, HttpServletRequest request)throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotStationInstrument";
    }

    @RequestMapping(value = "/authorityPowerController", method = {RequestMethod.GET})
    public String authorityPowerController(Map<String, String> map, HttpServletRequest request)throws IOException {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityPowerController";
    }


    @RequestMapping(value = "/authorityAttendanceMachine", method = {RequestMethod.GET})
    public String authorityAttendanceMachine(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityAttendanceMachine";
    }


    @RequestMapping(value = "/authorityClassCard", method = {RequestMethod.GET})
    public String authorityClassCard(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityClassCard";
    }

    @RequestMapping(value = "/authorityVideo", method = {RequestMethod.GET})
    public String authorityVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityVideo";
    }

    @RequestMapping(value = "/authorityStationInstrument", method = {RequestMethod.GET})
    public String authorityStationInstrument(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/authorityStationInstrument";
    }
    @RequestMapping(value = "/iotLogAccess", method = {RequestMethod.GET})
    public String iotLogAccess(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogAccess";
    }
    @RequestMapping(value = "/iotLogPower", method = {RequestMethod.GET})
    public String iotLogPower(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogPower";
    }
    @RequestMapping(value = "/iotLogAttendance", method = {RequestMethod.GET})
    public String iotLogAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogAttendance";
    }
    @RequestMapping(value = "/iotLogClassCard", method = {RequestMethod.GET})
    public String iotLogClassCard(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogClassCard";
    }
    @RequestMapping(value = "/iotLogVideo", method = {RequestMethod.GET})
    public String iotLogVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogVideo";
    }
    @RequestMapping(value = "/iotLogStation", method = {RequestMethod.GET})
    public String iotLogStation(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotLogStation";
    }

    @RequestMapping(value = "/iotEditAccess", method = {RequestMethod.GET})
    public String iotEditAccess(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditAccess";
    }
    @RequestMapping(value = "/iotEditPower", method = {RequestMethod.GET})
    public String iotEditPower(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditPower";
    }
    @RequestMapping(value = "/iotEditAttendance", method = {RequestMethod.GET})
    public String iotEditAttendance(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditAttendance";
    }
    @RequestMapping(value = "/iotEditClassCard", method = {RequestMethod.GET})
    public String iotEditClassCard(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditClassCard";
    }
    @RequestMapping(value = "/iotEditVideo", method = {RequestMethod.GET})
    public String iotEditVideo(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditVideo";
    }
    @RequestMapping(value = "/iotEditStation", method = {RequestMethod.GET})
    public String iotEditStation(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotEditStation";
    }


    @RequestMapping(value = "/iotNewAccess", method = {RequestMethod.GET})
    public String iotNewAccess(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewAccess";
    }
    @RequestMapping(value = "/iotNewPower", method = {RequestMethod.GET})
    public String iotNewPower(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewPower";
    }
    @RequestMapping(value = "/iotNewAttendance", method = {RequestMethod.GET})
    public String iotNewAttendance(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewAttendance";
    }
    @RequestMapping(value = "/iotNewClassCard", method = {RequestMethod.GET})
    public String iotNewClassCard(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewClassCard";
    }
    @RequestMapping(value = "/iotNewVideo", method = {RequestMethod.GET})
    public String iotNewVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewVideo";
    }
    @RequestMapping(value = "/iotNewStation", method = {RequestMethod.GET})
    public String iotNewStation(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotNewStation";
    }
    @RequestMapping(value = "/logAtt", method = {RequestMethod.GET})
    public String logAtt(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logAtt";
    }
    @RequestMapping(value = "/logAcc", method = {RequestMethod.GET})
    public String logAcc(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logAcc";
    }
    @RequestMapping(value = "/logIns", method = {RequestMethod.GET})
    public String logIns(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logIns";
    }
    @RequestMapping(value = "/logClass", method = {RequestMethod.GET})
    public String logClass(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logClass";
    }
    @RequestMapping(value = "/logVideo", method = {RequestMethod.GET})
    public String logVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logVideo";
    }
    @RequestMapping(value = "/logStation", method = {RequestMethod.GET})
    public String logStation(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/logStation";
    }
    @RequestMapping(value = "/iotCloudDownAccess", method = {RequestMethod.GET})
    public String iotCloudDownAccess(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownAccess";
    }
    @RequestMapping(value = "/iotCloudDownPower", method = {RequestMethod.GET})
    public String iotCloudDownPower(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownPower";
    }
    @RequestMapping(value = "/iotCloudDownAtt", method = {RequestMethod.GET})
    public String iotCloudDownAtt(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownAtt";
    }
    @RequestMapping(value = "/iotCloudDownClass", method = {RequestMethod.GET})
    public String iotCloudDownClass(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownClass";
    }
    @RequestMapping(value = "/iotCloudDownPlan", method = {RequestMethod.GET})
    public String iotCloudDownPlan(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownPlan";
    }
    @RequestMapping(value = "/iotCloudDownLog", method = {RequestMethod.GET})
    public String iotCloudDownLog(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/iotCloudDownLog";
    }
    @RequestMapping(value = "/guideAcc", method = {RequestMethod.GET})
    public String guideAcc(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideAcc";
    }
    @RequestMapping(value = "/guideIns", method = {RequestMethod.GET})
    public String guideIns(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideIns";
    }
    @RequestMapping(value = "/guideAtt", method = {RequestMethod.GET})
    public String guideAtt(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideAtt";
    }
    @RequestMapping(value = "/guideClass", method = {RequestMethod.GET})
    public String guideClass(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideClass";
    }
    @RequestMapping(value = "/guideVideo", method = {RequestMethod.GET})
    public String guideVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideVideo";
    }
    @RequestMapping(value = "/guideStation", method = {RequestMethod.GET})
    public String guideStation(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("userCenterHost", userCenterHost);
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
        request.getSession().setAttribute("siteEnName", siteEnName);
        request.getSession().setAttribute("siteSecret", siteSecret);
        request.getSession().setAttribute("dataSource", dataSource);
        request.getSession().setAttribute("oauth2", oauth2);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideStation";
    }
    @RequestMapping(value = "/guideEditAcc", method = {RequestMethod.GET})
    public String guideEditAcc(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditAcc";
    }
    @RequestMapping(value = "/guideEditIns", method = {RequestMethod.GET})
    public String guideEditIns(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditIns";
    }
    @RequestMapping(value = "/guideEditAtt", method = {RequestMethod.GET})
    public String guideEditAtt(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditAtt";
    }
    @RequestMapping(value = "/guideEditClass", method = {RequestMethod.GET})
    public String guideEditClass(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditClass";
    }
    @RequestMapping(value = "/guideEditVideo", method = {RequestMethod.GET})
    public String guideEditVideo(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditVideo";
    }
    @RequestMapping(value = "/guideEditStation", method = {RequestMethod.GET})
    public String guideEditStation(Map<String, String> map, HttpServletRequest request,@RequestParam String id) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("id", id);
        return "/iot/guideEditStation";
    }
    @RequestMapping(value = "/guideNewAcc", method = {RequestMethod.GET})
    public String guideNewAcc(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewAcc";
    }
    @RequestMapping(value = "/guideNewIns", method = {RequestMethod.GET})
    public String guideNewIns(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewIns";
    }
    @RequestMapping(value = "/guideNewAtt", method = {RequestMethod.GET})
    public String guideNewAtt(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewAtt";
    }
    @RequestMapping(value = "/guideNewClass", method = {RequestMethod.GET})
    public String guideNewClass(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewClass";
    }
    @RequestMapping(value = "/guideNewVideo", method = {RequestMethod.GET})
    public String guideNewVideo(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewVideo";
    }
    @RequestMapping(value = "/guideNewStation", method = {RequestMethod.GET})
    public String guideNewStation(Map<String, String> map, HttpServletRequest request) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        return "/iot/guideNewStation";
    }
    /**
     * 视频查看页面
     */
    @RequestMapping(value = "/iotToViewsVideo", method = {RequestMethod.GET})
    public String iotToViewsVideo(Map<String, String> map, HttpServletRequest request, String url) {
        map.put("url", url);
        return "/iot/iotToViewsVideo";
    }
    /**
     * 绑定设备/实验室
     */
    @RequestMapping(value = "/iotBindAccess", method = {RequestMethod.GET})
    public String iotBindAccess(Map<String, String> map, HttpServletRequest request,@RequestParam String sn) {
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("iotHost", apiGateWayHost + "/iot");
        map.put("sn", sn);
        return "/iot/iotBindAccess";
    }
}

