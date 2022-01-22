package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.ItemParameter;
import net.gvsun.timetable.internal.params.TimetableQueryParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/13 10:31
 **/
public interface AttendanceStatusService extends IService<AttendanceStatus> {
    /**
     * Description :获取学生考勤状态
     *
     * @Author : cjl
     * @CreateTime : 2021/8/13
     **/
    Page<AttendanceStatus> getAttendanceStatus(String id, HttpServletRequest request,String username, Integer current, Integer size);

    /**
     * Description 插入学生名单（有默认状态）到状态表
     *
     * @Author chenjiali 2021-08-13
     */
    void insertStatus(TimetableQueryParam param, Integer attendanceType);

    /**
     * Description 插入学生名单（无默认状态）到状态表
     *
     * @Author chenjiali 2021-08-13
     */
    void insertStudent(TimetableQueryParam param);
    /**
     * Description 手动更新考勤状态
     *
     * @Author chenjiali 2021-08-13
     */
    void  updateStatus(String id,String username,Integer attendanceType);
    /**
     * Description 同步考勤机数据
     *
     * @Author chenjiali 2021-08-09
     */
    void attandanceSync(TimetableQueryParam param, String startTime, String endTime,String hardwareIps, Integer attendanceType, Float meters);
}
