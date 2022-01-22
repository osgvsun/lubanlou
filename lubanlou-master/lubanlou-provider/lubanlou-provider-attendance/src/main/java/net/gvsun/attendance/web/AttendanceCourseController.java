package net.gvsun.attendance.web;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.gvsun.attendance.dbsource.entity.AttendanceCourse;
import net.gvsun.attendance.dbsource.entity.AttendanceMode;
import net.gvsun.attendance.dbsource.mapper.AttendanceModeMapper;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.attendance.service.AttendanceCourseService;
import net.gvsun.attendance.service.AttendanceItemsService;
import net.gvsun.attendance.service.AttendanceModeService;
import net.gvsun.attendance.service.AttendanceStatusService;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import net.gvsun.usercenter.internal.ResultDataDto;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description :课程考勤
 *
 * @Author : cjl
 * @CreateTime : 2021/7/31 16:43
 **/
@RestController
public class AttendanceCourseController {

    private final AttendanceCourseService attendanceCourseService;
    private final JdbcOperations jdbcOperations;
    private final AttendanceStatusService attendanceStatusService;
    private final AttendanceItemsService attendanceItemsService;
    private final AttendanceModeMapper attendanceModeMapper;
    private final AttendanceModeService attendanceModeService;

    public AttendanceCourseController(AttendanceCourseService attendanceCourseService, JdbcOperations jdbcOperations, AttendanceStatusService attendanceStatusService, AttendanceItemsService attendanceItemsService, AttendanceModeMapper attendanceModeMapper, AttendanceModeService attendanceModeService){
        this.attendanceCourseService =attendanceCourseService;
        this.jdbcOperations = jdbcOperations;
        this.attendanceStatusService = attendanceStatusService;
        this.attendanceItemsService = attendanceItemsService;
        this.attendanceModeMapper = attendanceModeMapper;
        this.attendanceModeService = attendanceModeService;
    }
    /**
     * Description :课程考勤页面
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @CrossOrigin(origins = "*", maxAge = -1)
    @GetMapping(value="/getAttendanceCourseList")
    public  String getCourseList(@RequestParam(required = false) String courseName,
                                 @RequestParam(required = false) String teacher,
                                 @RequestParam(required = false) String classDate,
                                 @RequestParam(required = false)Integer page,
                                 @RequestParam(required = false)Integer size){
        Page<AttendanceCourse> attendanceCoursePage = attendanceCourseService.getAttendanceCourseList(courseName,teacher,classDate,page,size);
        return JSON.toJSONString(attendanceCoursePage);
    }
    /**
     * Description :获取课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/8/19
     **/
    @GetMapping(value = "/getCourseList")
    public ResultDataDto getCourseList(){
        ResultDataDto<List> res = new ResultDataDto<>(0,"请求成功");
        try {
            List<Map<String, Object>> list = attendanceItemsService.getCourseList();
            res.setData(list);
        } catch (Exception e) {
            res.setCode(1);
            res.setMsg("错误:" + e.getMessage());
        }
        return res;
    }
    /**
     * Description :获取教师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @GetMapping(value = "/getTeacherList")
    public ResultDataDto getTeacherList(){
        ResultDataDto<List> res = new ResultDataDto<>(0,"请求成功");
        try {
            List<Map<String, Object>> list = attendanceItemsService.getTeacherList();
            res.setData(list);
        } catch (Exception e) {
            res.setCode(1);
            res.setMsg("错误:" + e.getMessage());
        }
        return res;
    }
    /**
     * Description :学生考勤列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @CrossOrigin(origins = "*", maxAge = -1)
    @GetMapping(value = "/getAttendanceStudent")
    public LayTableVO<List<AttendanceStudentDTO>> getAttendanceStudent(@RequestParam String courseNo,
                                                                       @RequestParam String classDate,
                                                                       @RequestParam Integer startClass,
                                                                       @RequestParam Integer endClass,
                                                                       @RequestParam(required = false) String startTime,
                                                                       @RequestParam(required = false) String endTime,
                                                                       @RequestParam(required = false) String search,
                                                                       @RequestParam(required = false)Integer page,
                                                                       @RequestParam(required = false)Integer size){
        Page<AttendanceStudentDTO> attendanceCoursePage = attendanceCourseService.getAttendanceStudent(courseNo,classDate,startClass,endClass,
                startTime,endTime,search,page,size);
        return LayTableVO.ok(attendanceCoursePage.getRecords(), attendanceCoursePage.getTotal());

    }
    /**
     * Description 插入学生名单(有默认状态)
     *
     * @Author chenjiali 2021-08-09
     */
    @PostMapping("/insertStatus")
    public String insertStatus(@RequestBody TimetableQueryParam param){
        //先将拿到的学生名单插入到状态表，默认未考勤
        attendanceStatusService.insertStatus(param,0);
        return "ok";
    }
    /**
    * Description 同步考勤机数据
    *
    * @Author chenjiali 2021-08-09
    */
    @PostMapping("/attendanceSync")
    public String attendanceSync(HttpServletRequest request) throws ParseException {
        //获取考勤开始时间
        String startTime = request.getParameter("startTime");
        //获取考勤结束时间
        String endTime = request.getParameter("endTime");
        //获取设备ip
        String hardwareIps = request.getParameter("hardwareIps");
        //判断是否选中计算迟到早退
        String calculateThis = request.getParameter("calculateThis");
        //先将拿到的学生名单以及插入到状态表，默认旷课
        String id = request.getParameter("id");
        TimetableQueryParam param = new TimetableQueryParam();
        param.setId(id);
        attendanceStatusService.insertStatus(param,4);
        if (startTime != null && !"".equals(startTime) && endTime != null && !"".equals(endTime)) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Calendar calendar = Calendar.getInstance();
            Calendar calendar1 = Calendar.getInstance();
            Calendar calendar2 = Calendar.getInstance();
            Calendar calendar3 = Calendar.getInstance();
            // 不为null就是选中
            if (calculateThis != null&&!calculateThis.toLowerCase().equals("false")) {
                // 计算迟到早退时间(单位分钟)
                String classStartTime, classEndTime;
                String lateTime, leaveEarlyTime;
                Integer late = request.getParameter("late")!=""?Integer.valueOf(request.getParameter("late")):0;
                Integer leaveEarly = request.getParameter("leaveEarly")!=""?Integer.valueOf(request.getParameter("leaveEarly")):0;
                Float meters = request.getParameter("meters")!=""?Float.valueOf(request.getParameter("meters")):0;
                Date date = sdf.parse(startTime);
                startTime = sdf.format(date);
                calendar.setTime(sdf.parse(startTime));
                calendar1.setTime(sdf.parse(startTime));
                calendar.add(Calendar.MINUTE, late);
                calendar1.add(Calendar.MINUTE,-15);
                lateTime = sdf.format(calendar.getTime());
                classStartTime = sdf.format(calendar1.getTime());
                //同步考勤机数据（正常）
                attendanceStatusService.attandanceSync(param,classStartTime, lateTime,hardwareIps,1, meters);
                if (endTime.length() == 16) {
                    endTime += ":00";
                }
                calendar2.setTime(sdf.parse(endTime));
                calendar3.setTime(sdf.parse(endTime));
                calendar2.add(Calendar.MINUTE, -leaveEarly);
                calendar3.add(Calendar.MINUTE,15);
                leaveEarlyTime = sdf.format(calendar2.getTime());
                classEndTime = sdf.format(calendar3.getTime());
                //同步考勤机数据（迟到）
                attendanceStatusService.attandanceSync(param,lateTime, leaveEarlyTime, hardwareIps,2, meters);
                //同步考勤机数据（早退）
                attendanceStatusService.attandanceSync(param,leaveEarlyTime, endTime, hardwareIps,3, meters);
            }else {
                // 不详细计算迟到早退，只要在上课时间前15分钟到下课时间内考勤均为正常考勤
                Date date = sdf.parse(startTime);
                startTime = sdf.format(date);
                calendar.setTime(sdf.parse(startTime));
                calendar.add(Calendar.MINUTE, -15);
                startTime = sdf.format(calendar.getTime());
                attendanceStatusService.attandanceSync(param,startTime,endTime, hardwareIps,1,null);
            }
        }
        return "ok";
    }
    /**
     * Description 手动修改考勤状态
     *
     * @Author chenjiali 2021-08-09
     */
    @PostMapping("/updateAttendanceStatus")
    @ResponseBody
    public Result updateAttendanceStatus(@RequestParam String id,
                                         @RequestParam String username,
                                         @RequestParam Integer attendanceType){
        Result res=new Result();
        res.setCode(0);
        res.setMsg("修改成功");
        //更新所选学生考勤状态
        attendanceStatusService.updateStatus(id,username,attendanceType);
        return res;
    }
    /**
     * Description 设置考勤模式
     *
     * @Author chenjiali 2021-09-14
     */
    @PostMapping("/setAttendanceMode")
    @ResponseBody
    public Result setAttendanceMode(@RequestParam int hardwareType,@RequestParam int enabled){
        Result res = new Result();
        res.setMsg("设置成功");
        UpdateWrapper<AttendanceMode> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("hardware_type",hardwareType).set("enabled",enabled);
        Integer rows = attendanceModeMapper.update(null,updateWrapper);
        res.setData(rows);
        return res;
    }
    /**
     * Description 获取考勤模式
     *
     * @Author chenjiali 2021-09-18
     */
    @RequestMapping("/getAttendanceMode")
    @ResponseBody
    public Result getAttendanceMode(){
        QueryWrapper<AttendanceMode> queryWrapper = new QueryWrapper<>();
        Page<AttendanceMode> aPage = attendanceModeService.page(new Page<>(1,10),queryWrapper);
        return Result.ok(aPage);
    }



}
