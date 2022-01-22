package net.gvsun.attendance.service;


import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.attendance.external.AttendanceDTO;
import net.gvsun.iot.external.AttendanceResultDetailVo;
import net.gvsun.iot.external.AttendanceResultVo;
import java.util.List;

public interface AttendanceManagementService {
    /**
     * Description :获取基本考勤记录明细
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    List<AttendanceResultDetailVo> getAttendanceLogs(AttendanceDTO attendanceDTO) ;
    /**
     * Description :获取基本考勤记录明细记录数
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    Long countAttendanceLogs(AttendanceDTO attendanceDTO);
    /**
     * Description 获取基本考勤记录(精确到天)
     *
     * @author cjl
     * @date 2021/9/7
     **/
    List<AttendanceResultVo> getBasicAttendanceLogByDate(AttendanceDTO attendanceDTO) throws Exception;
    /**
     * Description 获取基本考勤记录数(精确到天)
     *
     * @author cjl
     * @date 2021/9/7
     **/
    Long countBasicAttendanceLogByDate(AttendanceDTO attendanceDTO)throws Exception;

    /**
     * Description 根据课程id、开始时间、结束时间、ip获取该课程学生考勤记录
     *
     * @Author chenjiali 2021-09-16
     */
    List<AttendanceStudentDTO> getStudentAttendanceRecords(String id, String startTime, String endTime, List<String> hardwareIps,
                                                           Float meters,Integer currPage,Integer pageSize);

}
