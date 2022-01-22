package net.gvsun.attendance.dbsource.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.ItemParameter;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.sql.Wrapper;
import java.util.List;

/**
 * Description :学生考勤状态
 *
 * @Author : cjl
 * @CreateTime : 2021/8/13 9:27
 **/
@Component
@Mapper
public interface AttendanceStatusMapper extends BaseMapper<AttendanceStatus> {

    /**
     * Description 获取课程统计
     *
     * @Author chenjiali 2021-08-13
     * @param page
     * @param wrapper
     */
    @Select(" select " +
            " ai.id, " +
            " ai.username, " +
            " ac.cname, " +
            " ai.course_name, " +
            " ai.item_name, " +
            " ai.teachers, " +
            " ai.weeks, " +
            " ai.school_year, " +
            " ac.status " +
            " FROM " +
            " attendance_items as ai " +
            " inner join attendance_status as ac on ai.id = ac.id " +
            " and ai.username = ac.username " +
//            " where ac.class_date <= curdate() " +
            " ${ew.customSqlSegment}")
    Page<AttendanceItemDTO> getCourseStatistics(Page<AttendanceItemDTO> page, @Param(Constants.WRAPPER) QueryWrapper<AttendanceItemDTO> wrapper);

    /**
     * Description :根据id及username获取考勤状态
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" SELECT a.id,a.username,a.status " +
            " FROM attendance_status a " +
            " where a.id = #{id}"  )
    List<AttendanceStatus> getStatus(String id);
    /**
     * Description :根据id及username获取考勤状态
     *
     * @Author : cjl
     * @CreateTime : 2021/9/14
     **/
    @Select(" SELECT a.id,a.username,a.status " +
            " FROM attendance_status a " +
            " where a.id = #{id}" +
            " and a.username = #{username}"  )
    List<AttendanceStatus> getAttendanceStatus(String id, String username);
}
