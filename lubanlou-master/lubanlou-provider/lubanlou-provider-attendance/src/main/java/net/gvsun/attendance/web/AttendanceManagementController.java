package net.gvsun.attendance.web;

import net.gvsun.attendance.external.AttendanceDTO;
import net.gvsun.attendance.service.AttendanceManagementService;
import net.gvsun.common.LayTableVO;
import net.gvsun.iot.external.AttendanceResultDetailVo;
import net.gvsun.iot.external.AttendanceResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/attendanceManagement")
public class AttendanceManagementController {
    @Autowired
    private AttendanceManagementService attendanceManagementService;
    /**
     * Description :获取考勤记录
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    @RequestMapping("/getAttendanceLogs")
    public LayTableVO getAttendanceLogs(@RequestBody(required = false) AttendanceDTO attendanceDTO) {
        long start=System.currentTimeMillis();
        System.out.println("====进入Controller层getAttendanceLogs考勤记录==="+start);
        List<AttendanceResultDetailVo> list= attendanceManagementService.getAttendanceLogs(attendanceDTO);
        long totalElements = 0;
        if (attendanceDTO.getCurrPage()!=null&&attendanceDTO.getPageSize()!=null) {
            totalElements = attendanceManagementService.countAttendanceLogs(attendanceDTO);
        }
        long ends=System.currentTimeMillis();
        System.out.println("====进入Controller层getAttendanceLogs考勤记录时间差==="+(ends-start)+"============");
        LayTableVO layTableVO = new LayTableVO();
        layTableVO.setData(list);
        layTableVO.setCount(totalElements);
        return layTableVO;
    }

    /**
     * Description :获取考勤结果(精确到天)
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    @RequestMapping("/getBasicAttendanceLogByDate")
    public LayTableVO getBasicAttendanceLogByDate(@RequestBody(required = false) AttendanceDTO attendanceDTO)throws Exception {
        long ll = System.currentTimeMillis();
        System.out.println("=====================进入获取获取考勤结果Controller"+ll+"===========================");
        List<AttendanceResultVo> list=attendanceManagementService.getBasicAttendanceLogByDate(attendanceDTO);
        //此处分页判断为了导出功能
        if (attendanceDTO.getCurrPage()==null){
            attendanceDTO.setCurrPage(1);
        }
        if (attendanceDTO.getPageSize()==null){
            attendanceDTO.setPageSize(1000);
        }
        List<AttendanceResultVo> collect = list.stream().skip(attendanceDTO.getPageSize()*(attendanceDTO.getCurrPage()-1))
                .limit(attendanceDTO.getPageSize()).collect(Collectors.toList());
        long totalElements = attendanceManagementService.countBasicAttendanceLogByDate(attendanceDTO);
        long l2 = System.currentTimeMillis();
        System.out.println("=====================进入获取考勤结果Controller(数据获取完成)"+l2+"===========================");
        System.out.println("=====================进入获取考勤结果Controller(数据获取完成时间差)"+(l2-ll)+"===========================");
        LayTableVO layTableVO = new LayTableVO<>();
        layTableVO.setData(collect);
        layTableVO.setCount(totalElements);
        return layTableVO;

    }
}
