package net.gvsun.attendance.dbsource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.attendance.dbsource.entity.AttendanceItems;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Description : 课程统计
 *
 * @Author : cjl
 * @CreateTime : 2021/8/19 18:13
 **/
@Component
@Mapper
public interface AttendanceItemsMapper extends BaseMapper<AttendanceItems> {
    /**
     * Description :获取课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" SELECT DISTINCT a.course_name " +
            " FROM attendance_items a"  )
    List<AttendanceItems> getCourseList();
    /**
     * Description :获取授课老师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Select(" SELECT DISTINCT a.teachers " +
            " FROM attendance_items a"  )
    List<AttendanceItems> getTeacherList();
}
