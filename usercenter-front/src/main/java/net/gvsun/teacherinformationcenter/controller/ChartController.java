package net.gvsun.teacherinformationcenter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/chart")
public class ChartController {
    @RequestMapping(value = "/bar", method = {RequestMethod.GET})
    public String personalInfo(HttpServletRequest request, HttpServletResponse response) {
        return "/chart/bar";
    }

    @RequestMapping(value = "/line", method = {RequestMethod.GET})
    public String line(HttpServletRequest request, HttpServletResponse response) {
        return "/chart/line";
    }

    @RequestMapping(value = "/map", method = {RequestMethod.GET})
    public String map(HttpServletRequest request, HttpServletResponse response) {
        return "/chart/map";
    }
}
