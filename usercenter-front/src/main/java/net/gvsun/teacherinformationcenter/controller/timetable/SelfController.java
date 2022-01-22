package net.gvsun.teacherinformationcenter.controller.timetable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import util.HttpClientUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/****************************************************************************
 * Descriptions：自主排课管理模块
 *
 * author 魏诚
 * date 2018-09-04
 ****************************************************************************/
@Controller("selfController")
@RequestMapping("/lims/timetable/self")
public class SelfController<JsonResult> {
    @Autowired
    private HttpServletRequest request;

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    /************************************************************
     * Descriptions：自主排课管理-显示自主排课排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/selfCourseList")
    public String selfCourseList(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/self/selfCourseList";
    }

    /************************************************************
     * Descriptions：自主排课管理-显示自主排课排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/selfCourseListByDate")
    public String selfCourseListByDate(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/selfCourseListByDate");
    }

    /**
     * Description 自主排课的主入口页面
     *
     * @return org.springframework.web.servlet.ModelAndView
     * @author weicheng
     * @date 2021/1/27 15:19
     */
    @RequestMapping("/selfCourseAdjustListByDate")
    public String eduCourseAdjustListByDate(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/selfCourseAdjustListByDate");

    }

    /************************************************************
     * Descriptions：自主排课管理-自主排课二次不分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newSelfReTimetableCourse")
    public String newSelfReTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/newSelfReTimetableCourse");
    }

    /**
     * Description 自主排课管理-自主排课二次不分批排课的日历主显示页面
     *
     * @return org.springframework.web.servlet.ModelAndView
     * @author weicheng
     * @date 2021/1/22 15:15
     */
    @RequestMapping("/newSelfReTimetableCourseByDateFormat")
    public String newSelfReTimetableCourseByDateFormat(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/newSelfReTimetableCourseByDateFormat");
    }

    /************************************************************
     * Descriptions：自主排课管理-自主排课二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newSelfReGroupTimetableCourse")
    public String newSelfReGroupTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/newSelfReGroupTimetableCourse");
    }

    /************************************************************
     * Descriptions：自主排课管理-自主排课二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newSelfReGroupCourse")
    public String newSelfReGroupCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/newSelfReGroupCourse");
    }

    /**************************************************************************************
     * Descriptions： 自主排课管理-新建自主排课的选课组
     * author 魏诚
     * date 2018-10-26
     *************************************************************************************/
    @RequestMapping("/newSelfCourse")
    public String newSelfCourse(Map<String, Object> map,@RequestParam Integer id, Integer term) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/self/newSelfCourse";
    }


    /************************************************************
     * Descriptions：自主排课管理-显示自主排课的学生名单页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/timetableCourseStudentList")
    public String timetablecourseStudentList(Map<String, Object> map, int term, int selfId) {
        // 获取可选的教师列表列表
        map.put("selfId", selfId);
        map.put("termId", term);
        map.put("zuulServerUrl", apiGateWayHost);
        return "/timetable/self/timetableCourseStudentList";

    }

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/updateSelfReTimetableCourse")
    public String updateSelfReTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/self/updateSelfReTimetableCourse");
    }
}
