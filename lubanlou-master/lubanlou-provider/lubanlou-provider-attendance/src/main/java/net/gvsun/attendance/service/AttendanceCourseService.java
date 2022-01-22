package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import net.gvsun.attendance.dbsource.entity.AttendanceCourse;
import net.gvsun.attendance.dto.AttendanceCourseDTO;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.common.Result;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.security.core.parameters.P;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Description : 课程考勤
 *
 * @Author : cjl
 * @CreateTime : 2021/7/31 16:46
 **/
public interface AttendanceCourseService extends IService<AttendanceCourse> {
    /**
     * Description :获取课程考勤列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    Page<AttendanceCourse> getAttendanceCourseList(String courseName, String teacher, String classDate, Integer page, Integer size);
    /**
     * Description :获取课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    List<Map<String, Object>> getCourseList();
    /**
     * Description :获取教师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    List<Map<String, Object>> getTeacherList();
    /**
     * Description :学生考勤列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    Page<AttendanceStudentDTO> getAttendanceStudent(String courseNo, String classDate, Integer startClass, Integer endClass,
                                                    String startTime, String endTime, String search,Integer page, Integer size);


    /**
     * Description 排课学生名单
     *
     * @Author chenjiali 2021-08-13
     */
    List<AttendanceStudentDTO> getTimetableAttendanceList(TimetableQueryParam param);

    /**
     * Description 排课课程
     *
     * @Author chenjiali 2021-08-13
     */
    List<AttendanceCourseDTO> getTimetableCourse(TimetableQueryParam param,String termName);
    /**
     * Description 排课课程记录数
     *
     * @Author chenjiali 2021-08-13
     */
    Integer countTimetableCourse(TimetableQueryParam param);


    /**
     * Description 排课课程考勤统计
     *
     * @Author chenjiali 2021-08-13
     */
    List<AttendanceItemDTO> courseStatistics(TimetableQueryParam param,String termName);



}

