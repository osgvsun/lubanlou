package net.gvsun.teacherinformationcenter.controller.timetable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import util.HttpClientUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/****************************************************************************
 * Descriptions：教务排课管理模块
 *
 * author 魏诚
 * date 2018-09-04
 ****************************************************************************/
@Controller("timetableCourseController")
@RequestMapping("/lims/timetable/course")
public class TimetableCourseController<JsonResult> {
    @Autowired
    private HttpServletRequest request;

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    /************************************************************
     * Descriptions：教务排课管理-显示教务排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/eduCourseList")
    public String listTimetableTerm(Map<String, Object> map, String type) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        map.put("type", type);
        return "/timetable/course/eduCourseList";
    }

    /************************************************************
     * Descriptions：教务排课管理-教师的学时量统计页面
     *
     * author Hezhaoyi
     * date 2019-10-17
     ************************************************************/
    @RequestMapping("/classHourStatisticsOfTeacher")
    public String classHourStatisticsOfTeacher(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/classHourStatisticsOfTeacher");

    }


    /************************************************************
     * Descriptions：教务排课管理-显示教务排课的调停课主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/eduCourseAdjustList")
    public String eduCourseAdustList(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/eduCourseAdjustList";
    }

    /************************************************************
     * Descriptions：教务排课管理-教务直接排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newEduDirectCourse")
    public String newEduCourseList(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/newEduDirectCourse";
    }

    /************************************************************
     * Descriptions：教务排课管理-教务直接排课的主显示页面--新
     *
     * author Hezhaoyi
     * date 2019-7-30
     ************************************************************/
    @RequestMapping("/educationalSchedulingCourse")
    public String educationalSchedulingCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        int step = 1;
        if (request.getParameter("step") != null) {
            step = Integer.valueOf(request.getParameter("step"));
        }
        if (step == 1) {
            return "/timetable/course/definiteListStepOne";
        } else if (step == 2) {
            return "/timetable/course/definiteListStepTwo";
        } else if (step == 3) {
            return "/timetable/course/definiteListStepThree";
        } else {
            return "/timetable/course/definiteListStepFour";
        }
    }

    /************************************************************
     * Descriptions：教务排课管理-教务排课学生页面--新
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/listofScheduledStudents")
    public String listofScheduledStudents(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/studentList");


    }

    /************************************************************
     * Descriptions：教务排课管理-教务排课学生页面--新
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/getStudentConflictInfo")
    public String getStudentConflictInfo(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/getStudentConflictInfo");
    }

    /************************************************************
     * Descriptions：教务排课管理-教务排课学生页面--新-学生分配-行政班安排
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/allotOfStudentByClass")
    public String allotOfStudentByClass(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/allotOfStudentByClass");
    }

    /************************************************************
     * Descriptions：教务排课管理-教务排课学生页面--新-学生分配-自行安排
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/allotOfStudentBySelf")
    public String allotOfStudentBySelf(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/allotOfStudentBySelf");
    }

    /************************************************************
     * Descriptions：教务排课管理-教务排课学生页面--新-学生分配-自行安排
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/addTeacherAdjust")
    public String addTeacherAdjust(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/addTeacherAdjust");
    }

    /************************************************************
     * Descriptions：教务排课管理-添加其他时间段排课页面--新
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/addLesson")
    public String addLesson(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/addLesson");
    }


    /************************************************************
     * Descriptions：教务排课管理-学生判冲的主显示页面
     * author Hezhaoyi
     * date 2019-5-14
     ************************************************************/
    @RequestMapping("/judgeTimetableConflictByStudent")
    public String judgeTimetableConflictByStudent(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/judgeTimetableConflictByStudent";
    }

    /************************************************************
     * Descriptions：教务排课管理-教务分批判冲排课的主显示页面--新
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/educationalSchedulingReGroupCourse")
    public String educationalSchedulingReGroupCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        int step = 1;
        if (request.getParameter("step") != null) {
            step = Integer.valueOf(request.getParameter("step"));
        }
        if (step == 2) {
            return ("/timetable/course/judgmentBatchesListStepTwo");
        } else if (step == 3) {
            return ("/timetable/course/judgmentBatchesListStepThree");
        } else if (step == 1) {
            return ("/timetable/course/judgmentBatchesListStepOne");
        } else if (step == 0) {
            return ("/timetable/course/judgmentBatchesListRecord");
        }
        return "";
    }


    /************************************************************
     * Descriptions：教务排课管理-教务分批判冲排课的主显示页面--新
     *
     * author Hezhaoyi
     * date 2019-8-12
     ************************************************************/
    @RequestMapping("/educationalSchedulingCourseNoBatch")
    public String educationalSchedulingCourseNoBatch(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        int step = 1;
        if (request.getParameter("step") != null) {
            step = Integer.valueOf(request.getParameter("step"));
        }
        if (step == 2) {
            return "/timetable/course/judgmentNobatchesListStepTwo";
        } else if (step == 3) {
            return "/timetable/course/judgmentNobatchesListStepThree";
        } else {
            return "/timetable/course/judgmentNobatchesListStepOne";
        }
    }

    /************************************************************
     * Descriptions：教务排课管理-教务直接排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newEduAdjustCourse")
    public String newEduAdjustCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/newEduAdjustCourse";
    }

    /************************************************************
     * Descriptions：教务排课管理-显示教务二次排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/eduReCourseList")
    public String eduReCourseList(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/eduReCourseList";
    }


    /************************************************************
     * Descriptions：教务排课管理-教务二次不分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newEduReTimetableCourse")
    public String newEduReNoGroupCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/newEduReTimetableCourse";
    }

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newEduReGroupTimetableCourse")
    public String newEduReGroupTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/newEduReGroupTimetableCourse";
    }

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/updateEduReTimetableCourse")
    public String updateEduReTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/updateEduReTimetableCourse");
    }

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/adjustEduReTimetableCourse")
    public String adjustEduReTimetableCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/adjustEduReTimetableCourse");
    }
    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/batchProcessingTeacher")
    public String batchProcessingTeacher(Map<String, Object> map,String courseNo, Integer timetableStyle) {
        map.put("courseNo", courseNo);
        map.put("timetableStyle", timetableStyle);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/course/batchProcessingTeacher");
    }


    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/newEduReGroupCourse")
    public String newEduReGroupCourse(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return "/timetable/course/newEduReGroupCourse";
    }

    /************************************************************
     * Descriptions：教务排课管理-显示教务排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/schoolCourseStudnetList")
    public String schoolCourseStudnetList(Map<String, Object> map, int term, String courseNo) {
        // 获取可选的教师列表列表
        map.put("courseNo", courseNo);
        map.put("termId", term);
        map.put("groupId", request.getParameter("groupId"));
        map.put("zuulServerUrl", apiGateWayHost);
        return "/timetable/course/schoolCourseStudentList";
    }

    /************************************************************
     * Descriptions：教务排课管理-学生名单-名单列表导出学生名单
     *
     * author Hezhaoyi
     * date 2021-1-21
     ************************************************************//*
    @RequestMapping("/exportSchoolCourseStudentList")
    public void exportSchoolCourseStudentList(HttpServletRequest request, HttpServletResponse response) throws Exception {
        timetableCommonService.exportSchoolCourseStudentList(request, response);
    }

    */

    /************************************************************
     * Descriptions：项目预约自主课程已选学生名单
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/selfGroupStudentList")
    public String selfGroupStudentList(Map<String, Object> map) {
        // 获取可选的教师列表列表
        map.put("groupId", request.getParameter("groupId"));
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/course/selfCourseStudentList");

    }


    /************************************************************
     * Descriptions 教务排课管理-调整排课编辑页面
     * @param request
     * return
     * author 陈乐为 2019-1-14
     ************************************************************/
    @RequestMapping("/updateEduAdjustCourse")
    public String updateEduAdjustCourse(Map<String, Object> map, HttpServletRequest request) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/updateEduAdjustCourse");
    }


    /**
     * Description 教务排课管理-审核主页面
     *
     * @param request author 陈乐为 2019-1-8
     */
    @RequestMapping("/auditTimetable")
    public String auditTimetable(Map<String, Object> map, HttpServletRequest request) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/course/auditTimetable");
    }

    /**
     * 教务排课管理-审核iframe页面
     *
     * @param request author 陈乐为 2019-1-8
     */
    @RequestMapping("/auditTimetableList")
    public String auditTimetableList(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/course/auditTimetableList");
    }

    @RequestMapping("/chooseCopyTimetableGroup")
    public String chooseCopyTimetableGroup(Map<String, Object> map, @RequestParam Integer id, @RequestParam Integer batchId, @RequestParam String courseNo, Integer termId) {
        map.put("batchId", batchId);
        map.put("sourceId", id);
        map.put("courseNo", courseNo);
        map.put("termId", termId);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/course/chooseCopyGroup");
    }


    /**
     * Description 获取课程的批次信息
     *
     * @param course_no return
     *                  author 陈乐为 2019年6月18日
     */
    @RequestMapping("/batchManageList")
    public String batchManageList(Map<String, Object> map, String courseNo, String type) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        map.put("course_no", courseNo);
        map.put("type", type);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/self/batchManageList");
    }

    /************************************************************
     * Descriptions：教务排课管理-批/组管理-导出批组学生名单
     *
     * author Hezhaoyi
     * date 2021-1-21
     ************************************************************/
    @RequestMapping("/exportBatchGroupStudentList")
    public void exportBatchGroupStudentList(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        timetableCommonService.exportBatchGroupStudentList(request, response);
    }

    /**
     * Description 分组学生名单列表
     *
     * @param group_id return
     *                 author 陈乐为 2019-6-20
     */
    @RequestMapping("/adjustGroupStudent")
    public String adjustGroupStudent(Map<String, Object> map, String course_no, String group_id, String type, String term) {
        Map<String,String> maps = new HashMap<String,String>();
        maps.put("groupId", group_id);
        maps.put("courseNo", course_no);
        maps.put("type", type);
        maps.put("term", term);
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                maps, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        map.put("group_id", group_id);
        map.put("course_no", course_no);
        map.put("type", type);
        map.put("term", term);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/self/adjustGroupStudent");
    }

    /**
     * Description 学生名单管理--添加学生--未分组学生列表
     *
     * @param course_no
     * @param group_id  return
     *                  author 陈乐为 2019-6-25
     */
    @RequestMapping("/addGroupStudent")
    public String addGroupStudent(Map<String, Object> map, String course_no, Integer group_id, String type, String term) {
        map.put("group_id", group_id);
        map.put("course_no", course_no);
        map.put("type", type);
        map.put("term", term);
        map.put("zuulServerUrl", apiGateWayHost);
        return ("/timetable/self/addGroupStudent");
    }

}
