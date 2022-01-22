package net.gvsun.teacherinformationcenter.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xx
 */
@Controller
@RequestMapping("rtc")
public class RtcController {
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @RequestMapping({"/index"})
    public String rtcIndex(Map<String, String> map) {
        return "/rtc/index";
    }

    @RequestMapping({"/index2"})
    public String rtcIndex2(Map<String, String> map) {
        map.put("apiGateWayHost", apiGateWayHost);
        return "/rtc/index2";
    }

    @RequestMapping({"/index3"})
    public String rtcIndex3(Map<String, String> map) {
        map.put("apiGateWayHost", apiGateWayHost);
        return "/rtc/index3";
    }

    @RequestMapping({"/index3s"})
    public String rtcIndex3s(Map<String, String> map) {
        map.put("apiGateWayHost", apiGateWayHost);
        return "/rtc/index3s";
    }

    @RequestMapping({"/z"})
    public String z(Map<String, String> map) {
        map.put("apiGateWayHost", apiGateWayHost);
        return "/rtc/z";
    }

    @ResponseBody
    @RequestMapping({"/getRoles"})
    public String getRoles(Map<String, String> map, HttpServletRequest request) {
        return request.getSession().getAttribute("str64")!=null?request.getSession().getAttribute("str64").toString():null;
    }

    @ResponseBody
    @RequestMapping({"/setRoles"})
    public Boolean setRoles(Map<String, String> map, HttpServletRequest request, @RequestParam String str64) {
        //把会议权限数据set到临时session中
        request.getSession().setAttribute("str64", str64);
        return true;
    }
}
