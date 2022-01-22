package net.gvsun.teacherinformationcenter.controller.answeringQuestions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/answering")
public class AnsweringController {
    @Value("${datashareHost}")
    private String datashareHost;

    /*
     * 首页
     */
    @RequestMapping("/mainindex")
    public String mainindex(HttpServletRequest request, Map<String, Object> map) throws IOException {
        map.put("datashareHost", datashareHost);
        return "/answering/mainIndex";
    }
    /*
     * 新建计划
     */
    @RequestMapping("/newPlan")
    public String newPlan(HttpServletRequest request, Map<String, Object> map) throws IOException {
        map.put("datashareHost", datashareHost);
        return "/answering/newPlan";
    }
    /**
     * 学生名单
     */
    @RequestMapping("/schoolCourseStudnetList")
    public String schoolCourseStudnetList(HttpServletRequest request, Map<String, Object> map, String termId, String courseNo, String type) throws IOException {
        map.put("termId", termId);
        map.put("courseNo", courseNo);
        map.put("type", type);
        return "/answering/schoolCourseStudnetList";
    }
    /**
     * 编辑
     */
    @RequestMapping("/editCource")
    public String editCource(HttpServletRequest request, Map<String, Object> map, String courseNo, Integer timetableStyle, String status) throws IOException {
        map.put("courseNo", courseNo);
        map.put("timetableStyle", timetableStyle);
        map.put("status", status);
        return "/answering/editCource";
    }
    /**
     * 调课
     */
    @RequestMapping("/theClasses")
    public String theClasses(HttpServletRequest request, Map<String, Object> map, Integer timetableStyle) throws IOException {
        map.put("timetableStyle", timetableStyle);
        return "/answering/theClasses";
    }
}
