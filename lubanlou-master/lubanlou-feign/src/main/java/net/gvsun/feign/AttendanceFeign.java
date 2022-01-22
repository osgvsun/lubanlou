package net.gvsun.feign;

import net.gvsun.attendance.external.AttendanceDTO;
import net.gvsun.common.LayTableVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(value = "attendance", path = "/attendanceManagement")
public interface AttendanceFeign {
    /**
     * Description :获取考勤记录
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    @RequestMapping("/getAttendanceLogs")
    LayTableVO getAttendanceLogs(@RequestBody(required = false) AttendanceDTO attendanceDTO);
    /**
     * Description :获取考勤结果(精确到天)
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    @RequestMapping("/getBasicAttendanceLogByDate")
    LayTableVO getBasicAttendanceLogByDate(@RequestBody(required = false) AttendanceDTO attendanceDTO);
}
