package net.gvsun.feign;

import net.gvsun.auditserver.external.RestResult;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.datashare.external.reportdata.ReportLabRoomUsageDTO;
import net.gvsun.timetable.internal.labroom.LabRoomVO;
import net.gvsun.timetable.internal.school.SchoolDeviceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

/**
 * Description Feign-实验室管理
 *
 * @author weicheng
 * @date 2021/2/2 18:18
 */
@FeignClient(value = "limsproduct", path = "/limsproduct")
public interface LimsproductFeign {

    /**
     * Description
     *
     * @return java.util.List
     * @author weicheng
     * @date 2021/2/2 18:19
     */
    @PostMapping(value = "/public/getAllLabroomsForTeach")
    Result<List<LabRoomVO>> getAllLabroomsForTeach();

    /**
     * Description
     *
     * @param labRoomId
     * @return java.util.List
     * @author weicheng
     * @date 2021/2/2 18:19
     */
    @PostMapping(value = "/public/getDeviceByLabRoom")
    Result<List<String>> getDeviceByLabRoom(@RequestParam(value = "labRoomId") Integer labRoomId);

    /**
     * Description
     *
     * @param deviceId
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 18:19
     */
    @PostMapping(value = "/public/getDeviceByDeviceId")
    Result<SchoolDeviceDTO> getDeviceByDeviceId(@RequestParam(value = "deviceId") String deviceId);

    /**
     * Description
     *
     * @param id,
     * @param termId,
     * @param itemName,
     * @param courseName,
     * @param currPage,
     * @param pageSize
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 18:20
     */
    @PostMapping(value = "/public/getOperationItem")
    String getOperationItem(@RequestParam(value = "id") String id, @RequestParam(value = "termId") Integer termId,
                            @RequestParam(value = "itemName") String itemName,
                            @RequestParam(value = "courseName") String courseName, @RequestParam(value = "currPage")
                                    String currPage, @RequestParam(value = "pageSize") String pageSize);

    /**
     * Description
     *
     * @param type,
     * @param courseNo,
     * @param courseNo,
     * @param academyNumber
     * @param username
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 18:28
     */
    @PostMapping(value = "/openOperationItem/saveAssetApp")
    String saveAssetApp(@RequestParam(value = "type") String type, @RequestParam(value = "courseNo") String courseNo,
                        @RequestParam(value = "academyNumber") String academyNumber, @RequestParam(value =
            "username") String username);


    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/updateEduAdjustCourse")
    RestResult updateEduAdjustCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-显示教务排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/schoolCourseStudnetList")
    RestResult schoolCourseStudnetList(@RequestParam(value = "term")int term, @RequestParam(value = "courseNo")String courseNo,@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务直接排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/newEduAdjustCourse")
    RestResult newEduAdjustCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-学生判冲的主显示页面
     * author Hezhaoyi
     * date 2019-5-14
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/judgeTimetableConflictByStudent")
     RestResult judgeTimetableConflictByStudent(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务直接排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/newEduDirectCourse")
    RestResult newEduCourseList(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次不分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/newEduReTimetableCourse")
    RestResult newEduReTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/updateEduReTimetableCourse")
    RestResult updateEduReTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/newEduReGroupCourse")
    RestResult newEduReGroupCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/newEduReGroupTimetableCourse")
    RestResult newEduReGroupTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/chooseCopyTimetableGroup")
    RestResult chooseCopyTimetableGroup(@RequestParam(value = "id") Integer id,@RequestParam(value = "batchId") Integer batchId,@RequestParam(value = "courseNo") String courseNo,@RequestParam(value = "termId")Integer termId);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/educationalSchedulingCourse")
    RestResult educationalSchedulingCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/listofScheduledStudents")
    RestResult listofScheduledStudents(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/addLesson")
    RestResult addLesson(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/educationalSchedulingReGroupCourse")
    RestResult educationalSchedulingReGroupCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/allotOfStudentBySelf")
    RestResult allotOfStudentBySelf(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/allotOfStudentByClass")
    RestResult allotOfStudentByClass(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/adjustGroupStudent")
    RestResult adjustGroupStudent(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/getStudentConflictInfo")
    RestResult getStudentConflictInfo(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/educationalSchedulingCourseNoBatch")
    RestResult educationalSchedulingCourseNoBatch(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/auditTimetable")
    RestResult auditTimetable(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/educourse/batchManageList")
    RestResult batchManageList(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/engineer/eduCourseList")
    RestResult eduCourseList(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/selfCourseList")
    RestResult selfCourseList(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSelfReTimetableCourse")
    RestResult newSelfReTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSelfReTimetableCourseByDateFormat")
    RestResult newSelfReTimetableCourseByDateFormat(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSelfReGroupTimetableCourse")
    RestResult newSelfReGroupTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSelfReGroupCourse")
    RestResult newSelfReGroupCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSelfCourse")
    RestResult newSelfCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/newSchoolCourseInfoForSelf")
    RestResult newSchoolCourseInfoForSelf(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/self/updateSelfReTimetableCourse")
    RestResult updateSelfReTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/course/classHourStatisticsOfTeacher")
    RestResult classHourStatisticsOfTeacher(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/course/eduCourseAdustList")
    RestResult eduCourseAdustList(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/api/lims/timetable/course/adjustEduReTimetableCourse")
    RestResult adjustEduReTimetableCourse(@RequestParam(value = "request") MultipartHttpServletRequest request);

    /************************************************************
     * Descriptions：考勤-实验室课程考勤列表
     *
     * author 陈佳利
     * date 2021-07-26
     ************************************************************/
    @RequestMapping("/apiAttendanceList")
    Result getCourseAttendance(@RequestParam(value = "acno") String acno,
                                   @RequestParam(value = "currpage") Integer currpage,
                                   @RequestParam(value = "pageSize") Integer pageSize,
                                   @RequestParam(value = "schoolTerm") String schoolTerm,
                                   @RequestParam(value = "courseName") String courseName,
                                   @RequestParam(value = "teacher") String teacher,
                                   @RequestParam(value = "classDate") String classDate);
    /************************************************************
     * Descriptions：考勤-实验室课程考勤列表
     *
     * author 陈佳利
     * date 2021-07-29
     ************************************************************/
    @RequestMapping("/apiStudentAttendance")
    Result getStudentAttendance(@RequestParam(value = "courseNo") String courseNo,
                                    @RequestParam(value = "classDate") String classDate,
                                    @RequestParam(value = "classes") String classes);
    /************************************************************
     * Descriptions：实验中心和实验分室做联动(供流程引擎-安全督导)
     *
     * author 陈佳利
     * date 2021-08-30
     ************************************************************/
    @RequestMapping("/findLabRoomByLabCenter")
    Result findLabRoomByLabCenter(@RequestParam(value = "labCenterNo") String labCenterNo);

    @GetMapping(value = "/getLabRoomUsageInfo")
    LayTableVO<List<ReportLabRoomUsageDTO>> getLabRoomUsageInfo(@RequestParam(value = "page") Integer page, @RequestParam(value = "limit") Integer limit,
                                                                @RequestParam(value = "academyNumber") String academyNumber, @RequestParam(value = "search") String search);
}
