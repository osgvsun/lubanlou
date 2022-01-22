package net.gvsun.teacherinformationcenter.controller.labSafe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("labSafe")
public class LabSafe {

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @Value("${iotWebSocketHost}")
    private String iotWebSocketHost;
    @RequestMapping("/labSecurity")
    public String labSecurity(Map<String, String> map, HttpServletRequest request, String templateId) {
//        map.put("timetableHost", apiGateWayHost + "/api/timetable");
        map.put("timetableHost", apiGateWayHost + "/timetable");
        request.getSession().setAttribute("apiGateWayHost", apiGateWayHost);
//        map.put("labRoomName", labRoomName);
        map.put("templateId", templateId);
        map.put("iotWebSocketHost",iotWebSocketHost);
        return "/labSafe/labSecurity";
    }

    @RequestMapping("/humiture")
    public String humiture(Map<String, String> map,HttpServletRequest request) {
        map.put("timetableHost", apiGateWayHost + "/api/timetable");
        map.put("labRoomId", request.getParameter("labRoomId"));
        return "/labSafe/humiture";
    }

    @RequestMapping("/video/flashvideo")
    public String flashvideo() {
        return "/labSafe/video/flashvideo";
    }

    @RequestMapping("/video/flvvideo")
    public String flvvideo() {
        return "/labSafe/video/flvvideo";
    }

    @RequestMapping("/video/videobox")
    public String videobox() {
        return "/labSafe/video/videobox";
    }
}
