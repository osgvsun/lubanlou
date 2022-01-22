package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.extension.service.IService;
import net.gvsun.attendance.dbsource.entity.AttendanceItems;

import java.util.List;
import java.util.Map;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/19 18:26
 **/
public interface AttendanceItemsService extends IService<AttendanceItems> {
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
}
