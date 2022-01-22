package net.gvsun.attendance.dbsource.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.gvsun.attendance.dbsource.entity.AttendanceCourse;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Description : 课程考勤
 *
 * @Author : cjl
 * @CreateTime : 2021/7/31 17:04
 **/
@Component
@Mapper
public interface AttendanceCourseMapper extends BaseMapper<AttendanceCourse> {
//    @Select("select course_no,academy_name,course_name,teacher_name,class_date," +
//            "CONCAT('第',start_class,'-',end_class,'节'),weeks,weekday,lab_name")
//    Page<AttendanceCourse> getCourseList(Page<AttendanceCourse> page, @Param(Constants.WRAPPER) Wrapper wrapper);
    /**
     * Description :获取课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" SELECT DISTINCT a.course_name " +
            " FROM attendance_course a"  )
    List<AttendanceCourse> getCourseList();
    /**
     * Description :获取授课老师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" SELECT DISTINCT a.teacher_name " +
            " FROM attendance_course a"  )
    List<AttendanceCourse> getTeacherList();
    /**
     * Description :学生考勤列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" select " +
            " ac.id, " +
            " ac.student_no as student_no, " +
            " ac.student_name as student_name, " +
            " ac.class_date as class_date," +
            " MIN(DATE_FORMAT(ch.datetime,'%H:%i:%s')) as datetime, " +
            " MAX(DATE_FORMAT(ch.datetime,'%H:%i:%s')) as datetime2, " +
            " ch.att_deviation as att_deviation, " +
            " ch.address as address, " +
            " ac.attendance_status as attendance_status" +
            " FROM " +
            " attendance_course as ac " +
            " left join common_hdwlog as ch on ch.username = ac.student_no " +
            " and DATE_FORMAT(ch.datetime,'%Y-%m-%d')=ac.class_date " +
            " and ch.hardware_type = 547 " +
            " ${ew.customSqlSegment}")
    Page<AttendanceStudentDTO> getAttendanceStudent(Page<AttendanceStudentDTO> page, @Param(Constants.WRAPPER)Wrapper<AttendanceStudentDTO> wrapper);
}
