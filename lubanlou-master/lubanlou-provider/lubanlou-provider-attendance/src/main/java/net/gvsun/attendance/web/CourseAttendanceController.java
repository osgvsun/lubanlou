package net.gvsun.attendance.web;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.SneakyThrows;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dbsource.mapper.AttendanceModeMapper;
import net.gvsun.attendance.dbsource.mapper.AttendanceStatusMapper;
import net.gvsun.attendance.dto.AttendanceCourseDTO;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.attendance.dto.datasource.AttendanceConfig;
import net.gvsun.attendance.dto.datasource.AttendanceConfigDTO;
import net.gvsun.attendance.external.AttendanceDTO;
import net.gvsun.attendance.service.AttendanceCourseService;
import net.gvsun.attendance.service.AttendanceManagementService;
import net.gvsun.attendance.service.AttendanceStatusService;
import net.gvsun.attendance.service.ShareService;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.feign.IotFeign;
import net.gvsun.feign.LimsproductFeign;
import net.gvsun.feign.TimetableFeign;
import net.gvsun.iot.external.CommonHdwlogDTO;
import net.gvsun.iot.external.IotParameter;
import net.gvsun.iot.external.OrderColumnEnum;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


/**
 * Description 课程考勤
 *
 * @Author chenjiali
 */
@RestController
public class CourseAttendanceController {

    @Autowired
    private LimsproductFeign limsproductFeign;
    @Autowired
    private TimetableFeign timetableFeign;
    @Autowired
    private IotFeign iotFeign;
    private final AttendanceCourseService attendanceCourseService;
    private final AttendanceStatusService attendanceStatusService;
    private final AttendanceStatusMapper attendanceStatusMapper;
    private final AttendanceModeMapper attendanceModeMapper;
    private final AttendanceManagementService attendanceManagementService;
    private final ShareService shareService;

    public CourseAttendanceController(AttendanceCourseService attendanceCourseService, AttendanceStatusService attendanceStatusService, AttendanceStatusMapper attendanceStatusMapper, AttendanceModeMapper attendanceModeMapper, AttendanceManagementService attendanceManagementService, ShareService shareService) {
        this.attendanceCourseService = attendanceCourseService;
        this.attendanceStatusService = attendanceStatusService;
        this.attendanceStatusMapper = attendanceStatusMapper;
        this.attendanceModeMapper = attendanceModeMapper;
        this.attendanceManagementService = attendanceManagementService;
        this.shareService = shareService;
    }


    /**
     * Description :实验室课程考勤
     *
     * @Author : cjl
     * @CreateTime : 2021/7/27 9:14
     **/
    @CrossOrigin(origins = "*", maxAge = -1)
    @RequestMapping("/attendanceCourse")
    public Result courseAttendance (@RequestParam(required = false)String courseName,
                                    @RequestParam(required = false)String teacher,
                                    @RequestParam(required = false)String classDate) {

        Result result = new Result();
        result = limsproductFeign.getCourseAttendance("0102",1,20,null,courseName,teacher,classDate);
        return Result.ok(result.getData());
    }
    /**
     * Description :实验室学生课程考勤
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @CrossOrigin(origins = "*", maxAge = -1)
    @RequestMapping("/attendanceStudent")
    public Result studentAttendance (@RequestParam(required = true)String courseNo,
                                     @RequestParam(required = true)String classDate,
                                     @RequestParam(required = true)String classes,
                                     @RequestParam(required = false)String startTime,
                                     @RequestParam(required = false)String endTime,
                                     @RequestParam(required = false)String search) {
        Result result = new Result();
        result = limsproductFeign.getStudentAttendance(courseNo,
                classDate,classes);
        return Result.ok(result.getData());
    }
    /**
     * Description :排课课程考勤
     *
     * @Author : cjl
     * @CreateTime : 2021/8/11
     **/
    @SneakyThrows
    @RequestMapping("/getTimetableCourse")
    public LayTableVO getTimetableCourse(HttpServletRequest request){
        List<AttendanceCourseDTO> result = new ArrayList<>();
        String search = request.getParameter("search");
        Integer offset = Integer.parseInt(request.getParameter("page"));
        Integer limit = Integer.parseInt(request.getParameter("limit"));
        String termNumber = request.getParameter("termNumber");
        String termName = request.getParameter("termName");
        String username = request.getParameter("username");
        String authorities = request.getParameter("authorities");
        TimetableQueryParam param = new TimetableQueryParam();
        if (search!=null&&!"".equals(search)){
            param.setSearch(search);
        }
        if (offset!=null){
            param.setOffset(offset - 1);
        }else {
            param.setOffset(0);
        }
        if (limit!=null){
            param.setLimit(limit);
        }else {
            param.setLimit(10);
        }
        if (termNumber !=null){
            param.setTermNumber(termNumber);
        }else{
            //只筛选当前年份
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            Date localDate = new Date();
            param.setYear(sdf.format(localDate));
        }
        if ("STUDENT".equals(authorities)){
            //学生无权限
            param.setStudentId("00000000");
        }else if ("TEACHER".equals(authorities)){
            //老师只看到自己的课程
            param.setTeacherId(username);
        }else if ("SUPERADMIN".equals(authorities)) {
            //超管看所有
        }else {
            //其他均无权限
            param.setStudentId("00000000");
        }
        result = attendanceCourseService.getTimetableCourse(param,termName);
        Integer totalElements = attendanceCourseService.countTimetableCourse(param);
        LayTableVO layTableVO = new LayTableVO<>();
        layTableVO.setData(result);
        layTableVO.setCount(totalElements);
        return layTableVO;
    }
    /**
     * Description :排课-学生名单
     *
     * @Author : cjl
     * @CreateTime : 2021/8/11
     **/
    @SneakyThrows
    @RequestMapping("/getTimetableAttendanceList")
    public Page getTimetableAttendanceList(@RequestBody TimetableQueryParam param) {
        List<AttendanceStudentDTO> result = new ArrayList<>();
        result = attendanceCourseService.getTimetableAttendanceList(param);
        Page page = new Page();
        page.setRecords(result);
        page.setTotal(result.size());
        return page;
    }
    /**
     * Description :排课-课程统计数据封装-老师
     *
     * @Author : cjl
     * @CreateTime : 2021/8/11
     **/
    @SneakyThrows
    @RequestMapping("/courseStatistics")
    public LayTableVO courseStatistics(HttpServletRequest request){
        List<AttendanceItemDTO> result = new ArrayList<>();
        String courseName = request.getParameter("courseName");
        String teachers = request.getParameter("teachers");
        Integer offset = Integer.parseInt(request.getParameter("page"));
        Integer limit = Integer.parseInt(request.getParameter("limit"));
        String termNumber = request.getParameter("termNumber");
        String termName = request.getParameter("termName");
        String username = request.getParameter("username");
        String authorities = request.getParameter("authorities");
        LayTableVO layTableVO = new LayTableVO<>();
        TimetableQueryParam param = new TimetableQueryParam();
        param.setOffset(0);
        param.setLimit(1000);
        if (termNumber !=null){
            param.setTermNumber(termNumber);
        }else{
            //只筛选当前年份
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            Date localDate = new Date();
            param.setYear(sdf.format(localDate));
        }
        if ("STUDENT".equals(authorities)){
            //学生无权限
            param.setStudentId("00000000");
        }else if ("TEACHER".equals(authorities)){
            //老师只看到自己的课程
            param.setTeacherId(username);
        }else if ("SUPERADMIN".equals(authorities)) {
            //超管看所有
        }else {
            //其他均无权限
            param.setStudentId("00000000");
        }
        //筛选除了预约的所有排课数据
        param.setTimetableType("COURSE,SELF,PRACTICE,TEACH,TRAIN");
        result = attendanceCourseService.courseStatistics(param,termName);
        List<AttendanceItemDTO> studentDTOS = new ArrayList<>();
        List<AttendanceItemDTO> studentsList = new ArrayList<>();
        //根据课程或者教师查询
        if ((courseName!=null&&!"".equals(courseName))||(teachers!=null&&!"".equals(teachers))){
            //根据课程查询
            studentsList = new ArrayList<>();
            if (courseName!=null&&!"".equals(courseName)){
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if (attendanceItemDTO.getCourseName() != null && !"".equals(attendanceItemDTO.getCourseName())) {
                        if (attendanceItemDTO.getCourseName().equals(courseName)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
            //根据教师查询
            if (teachers!=null&&!"".equals(teachers)){
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if (attendanceItemDTO.getTeachers() != null && !"".equals(attendanceItemDTO.getTeachers())) {
                        if (attendanceItemDTO.getTeachers().equals(teachers)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
            //根据课程和教师查询
            if ((courseName!=null&&!"".equals(courseName))&&(teachers!=null&&!"".equals(teachers))){
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if ((attendanceItemDTO.getCourseName() != null && !"".equals(attendanceItemDTO.getCourseName()))
                            &&attendanceItemDTO.getTeachers() !=null  && !"".equals(attendanceItemDTO.getTeachers())) {
                        if (attendanceItemDTO.getCourseName().equals(courseName)&&attendanceItemDTO.getTeachers().equals(teachers)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
        }
        else {
            //默认取第一门课程
            if (result.size()>0) {
                courseName = result.get(0).getCourseName();
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if (attendanceItemDTO.getCourseName() != null && !"".equals(attendanceItemDTO.getCourseName())) {
                        if (attendanceItemDTO.getCourseName().equals(courseName)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
        }
        //分页
        studentDTOS = studentsList.stream().skip(limit * (offset - 1)).limit(limit).collect(Collectors.toList());
        Integer totalElements = studentsList.size();
        layTableVO.setData(studentDTOS);
        layTableVO.setCount(totalElements);
        return layTableVO;
    }
    /**
     * Description :排课-课程统计数据封装-学生
     *
     * @Author : cjl
     * @CreateTime : 2021/8/11
     **/
    @SneakyThrows
    @RequestMapping("/myCourseStatistics")
    public LayTableVO myCourseStatistics(HttpServletRequest request){
        List<AttendanceItemDTO> result = new ArrayList<>();
        String courseName = request.getParameter("courseName");
        String teachers = request.getParameter("teachers");
        Integer offset = Integer.parseInt(request.getParameter("page"));
        Integer limit = Integer.parseInt(request.getParameter("limit"));
        String termNumber = request.getParameter("termNumber");
        String termName = request.getParameter("termName");
        String username = request.getParameter("username");
        String authorities = request.getParameter("authorities");
        LayTableVO layTableVO = new LayTableVO<>();
        TimetableQueryParam param = new TimetableQueryParam();
        param.setOffset(0);
        param.setLimit(1000);
        if (termNumber !=null){
            param.setTermNumber(termNumber);
        }else{
            //只筛选当前年份
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            Date localDate = new Date();
            param.setYear(sdf.format(localDate));
        }
        if ("STUDENT".equals(authorities)){
            //学生查看自己的
            param.setStudentId(username);
        }else{
            //其他人无权限
            param.setStudentId("00000000");
        }
        //筛选除了预约的所有排课数据
        param.setTimetableType("COURSE,SELF,PRACTICE,TEACH,TRAIN");
        result = attendanceCourseService.courseStatistics(param,termName);
        List<AttendanceItemDTO> collect = new ArrayList<>();
        List<AttendanceItemDTO> studentsList = new ArrayList<>();
        //根据课程或者教师查询
        if ((courseName!=null&&!"".equals(courseName))||(teachers!=null&&!"".equals(teachers))){
            //根据课程查询
            if (courseName!=null&&!"".equals(courseName)){
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if (attendanceItemDTO.getCourseName() != null && !"".equals(attendanceItemDTO.getCourseName())) {
                        if (attendanceItemDTO.getCourseName().equals(courseName)&&attendanceItemDTO.getUsername().equals(username)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
            //根据教师查询
            if (teachers!=null&&!"".equals(teachers)){
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if (attendanceItemDTO.getTeachers() != null && !"".equals(attendanceItemDTO.getTeachers())) {
                        if (attendanceItemDTO.getTeachers().equals(teachers)&&attendanceItemDTO.getUsername().equals(username)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
            //根据课程和教师查询
            if ((courseName!=null&&!"".equals(courseName))&&(teachers!=null&&!"".equals(teachers))){
                studentsList = new ArrayList<>();
                for (AttendanceItemDTO attendanceItemDTO : result) {
                    if ((attendanceItemDTO.getCourseName() != null && !"".equals(attendanceItemDTO.getCourseName()))
                            &&attendanceItemDTO.getTeachers() !=null  && !"".equals(attendanceItemDTO.getTeachers())) {
                        if (attendanceItemDTO.getCourseName().equals(courseName)&&attendanceItemDTO.getTeachers().equals(teachers)
                        &&attendanceItemDTO.getUsername().equals(username)) {
                            studentsList.add(attendanceItemDTO);
                        }
                    }
                }
            }
        } else {
            //默认取学生本人所有数据
            studentsList = new ArrayList<>();
            for (AttendanceItemDTO attendanceItemDTO : result) {
                if (attendanceItemDTO.getUsername().equals(username)) {
                    studentsList.add(attendanceItemDTO);
                }
            }
        }
        //分页
        collect = studentsList.stream().skip(limit * (offset - 1)).limit(limit).collect(Collectors.toList());
        Integer totalElements = studentsList.size();
        layTableVO.setData(collect);
        layTableVO.setCount(totalElements);
        return layTableVO;
    }

    /**
     * Description :获取学生考勤状态
     *
     * @Author : cjl
     * @CreateTime : 2021/8/13
     *
     * @return*/
    @PostMapping("/getAttendanceStatus")
    public Page<AttendanceStudentDTO> getAttendancdStatus (HttpServletRequest request,Integer current,Integer size) throws ParseException {
        String id = request.getParameter("id");
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String username = request.getParameter("username");
        Page page = new Page();
        //设置取默认记录开始、截止时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = sdf.parse(startTime);
        startTime = sdf.format(date);
        Calendar calendar = Calendar.getInstance();
        Calendar calendar1 = Calendar.getInstance();
        calendar.setTime(sdf.parse(startTime));
        calendar1.setTime(sdf.parse(endTime));
        calendar.add(Calendar.MINUTE, -15);
        calendar1.add(Calendar.MINUTE,+15);
        startTime = sdf.format(calendar.getTime());
        endTime = sdf.format(calendar1.getTime());
        String hardwareIps = request.getParameter("hardwareIps");
        List<String> hardwareIpList = null;
        if (!"null".equals(hardwareIps)) {
            List<String> newlist = Arrays.asList(hardwareIps.split(","));
            hardwareIpList = new ArrayList<String>(newlist);
        }
        //获取考勤名单及学生考勤记录(课前15分钟至课后15分钟)，无考勤状态默认为出勤状态
        List<AttendanceStudentDTO> attendanceStudentDTOList = attendanceManagementService.getStudentAttendanceRecords(id,startTime,endTime,hardwareIpList,null,current,size);
        //根据学生姓名或者查询
        List<AttendanceStudentDTO> studentDTOS = new ArrayList<>();
        List<AttendanceStudentDTO> collect = new ArrayList<>();
        if (username!=null&&!"".equals(username)) {
            List<AttendanceStudentDTO> student = new ArrayList<>();
            for (AttendanceStudentDTO attendanceStudentDTO : attendanceStudentDTOList) {
                if (attendanceStudentDTO.getUsername().equals(username)||attendanceStudentDTO.getStudentName().equals(username)) {
                    student.add(attendanceStudentDTO);
                }
            }
            studentDTOS = student.stream().skip(size * (current - 1)).limit(size).collect(Collectors.toList());
            //获取查询后的学生数量
            Integer totalElements = student.size();
            page.setRecords(studentDTOS);
            page.setTotal(totalElements);
        } else {
            collect = attendanceStudentDTOList.stream().skip(size * (current - 1)).limit(size).collect(Collectors.toList());
            page.setRecords(collect);
            //获取学生名单总数量
            TimetableQueryParam param = new TimetableQueryParam();
            param.setId(id);
            Integer totalElements = attendanceCourseService.getTimetableAttendanceList(param).size();
            page.setTotal(totalElements);
        }
        return page;
    }
    /**
     * Description 预约考勤
     *
     * @param
     * @return
     * @Author chenjiali
     */
    @PostMapping("/reservationAttendance")
    public Page<AttendanceStudentDTO> reservationAttendance(HttpServletRequest request,Integer current,Integer size) throws ParseException {
        Page page = new Page();
        String search = request.getParameter("search");
        String username = request.getParameter("username");
        String authorities = request.getParameter("authorities");
        String timetableType = request.getParameter("timetableType");
        TimetableQueryParam param = new TimetableQueryParam();
        if ("STUDENT".equals(authorities)){
            //学生只看到自己的
            param.setStudentId(username);
        }else if ("TEACHER".equals(authorities)){
            //老师看所有
        }else if ("SUPERADMIN".equals(authorities)) {
            //超管看所有
        }else {
            //其他均无权限
            param.setStudentId("00000000");
        }
        if (timetableType!=null && !"".equals(timetableType)){
            param.setTimetableType(timetableType);
        }else {
            //默认查看所有预约
            param.setTimetableType("RESERVATION,INSTRUMENT,DEVICEBOOKING ,STATIONBOOKING");
        }
        //获取学生名单及预约考勤设备
        param.setOffset(0);
        param.setLimit(999);
        List<AttendanceStudentDTO> attendanceStudentDTOList = attendanceCourseService.getTimetableAttendanceList(param);
        //获取时间段内考勤日志
        IotParameter iotParameter = new IotParameter();
        List<AttendanceStudentDTO> studentAttendanceRecords = new ArrayList<>();
        if (attendanceStudentDTOList.size()>0){
            for(AttendanceStudentDTO attendanceStudentDTO : attendanceStudentDTOList){
                List<String> hardwareIps = attendanceStudentDTO.getHardwareIps();
                String startTime =attendanceStudentDTO.getClassDate() + " "+ attendanceStudentDTO.getStartTime();
                String endTime = attendanceStudentDTO.getClassDate() +" "+ attendanceStudentDTO.getEndTime();
                attendanceStudentDTO.setClassDate(attendanceStudentDTO.getClassDate()+" "+attendanceStudentDTO.getStartTime()+"-"
                    +attendanceStudentDTO.getEndTime());
                iotParameter.setUsername(attendanceStudentDTO.getUsername());
                if (hardwareIps.size()!= 0){
                    iotParameter.setHardwareIps(hardwareIps);
                }else {
                    //无考勤设备则无考勤数据
                    iotParameter.setHardwareIp("8888");
                }
                //获取课前15分钟到课后15分粥内的考勤记录
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Calendar calendarStart = Calendar.getInstance();
                Calendar calendarEnd = Calendar.getInstance();
                calendarStart.setTime(sdf.parse(startTime));
                calendarEnd.setTime(sdf.parse(endTime));
                calendarStart.add(Calendar.MINUTE, -15);
                calendarEnd.add(Calendar.MINUTE, +15);
                startTime = sdf.format(calendarStart.getTime());
                endTime = sdf.format(calendarEnd.getTime());
                iotParameter.setBeginDateTime(startTime);
                iotParameter.setEndDateTime(endTime);
                //根据时间正序排列
                iotParameter.setOrderColumn(OrderColumnEnum.DATE_TIME);
                iotParameter.setIsAsc(true);
                List<CommonHdwlogDTO> resultList = iotFeign.getIotLog(iotParameter,null,null).getData();
                DateTimeFormatter df = DateTimeFormatter.ofPattern("HH:mm:ss");
                Date currDate = new Date();
                if (resultList.size() == 0){
                    attendanceStudentDTO.setDatetime("");
                    attendanceStudentDTO.setAddress("");
                    //获取考勤状态
                    List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(attendanceStudentDTO.getId(),attendanceStudentDTO.getUsername());
                    if (statusList.size()!=0){
                        String status = statusList.get(0).getStatus();
                        attendanceStudentDTO.setStatus(status);
                    }else {
                        if (sdf.parse(endTime).before(currDate)){
                        //若已过预约时间15分钟后无考勤记录则为未到，并保存数据
                        attendanceStudentDTO.setStatus("6");
                        attendanceStatusService.updateStatus(attendanceStudentDTO.getId(),attendanceStudentDTO.getUsername(),6);
                        }else {
                            //未过预约时间则默认无状态
                            attendanceStudentDTO.setStatus("0");
                        }
                    }
                }else {
                    //取时间内的首尾两条记录
                    attendanceStudentDTO.setDatetime(df.format(resultList.get(0).getDateTime())+"-"+df.format(resultList.get(resultList.size()-1).getDateTime()));
                    attendanceStudentDTO.setAddress(resultList.get(0).getAddress());
                    //获取考勤状态
                    List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(attendanceStudentDTO.getId(),attendanceStudentDTO.getUsername());
                    if (statusList.size()!=0){
                        String status = statusList.get(0).getStatus();
                        attendanceStudentDTO.setStatus(status);
                    }else {
                        //记录出勤，保存数据
                        attendanceStudentDTO.setStatus("1");
                        attendanceStatusService.updateStatus(attendanceStudentDTO.getId(),attendanceStudentDTO.getUsername(),1);
                    }
                }
                studentAttendanceRecords.add(attendanceStudentDTO);
            }
        }
        //根据学生姓名或者查询
        List<AttendanceStudentDTO> studentDTOS = new ArrayList<>();
        List<AttendanceStudentDTO> collect = new ArrayList<>();
        if (search!=null&&!"".equals(search)) {
            List<AttendanceStudentDTO> student = new ArrayList<>();
            for (AttendanceStudentDTO attendanceStudentDTO : studentAttendanceRecords) {
                if (attendanceStudentDTO.getUsername().equals(search)||attendanceStudentDTO.getStudentName().equals(search)) {
                    student.add(attendanceStudentDTO);
                }
            }
            studentDTOS = student.stream().skip(size * (current - 1)).limit(size).collect(Collectors.toList());
            //获取查询后的学生数量
            Integer totalElements = student.size();
            page.setRecords(studentDTOS);
            page.setTotal(totalElements);
        } else {
            collect = studentAttendanceRecords.stream().skip(size * (current - 1)).limit(size).collect(Collectors.toList());
            page.setRecords(collect);
            //获取学生名单总数量
            param.setOffset(0);
            param.setLimit(999);
            Integer totalElements = attendanceCourseService.getTimetableAttendanceList(param).size();
            page.setTotal(totalElements);
        }
        return page;
    }

    /**
    * Description 获取配置项预约类型并封装列表
    *
    * @Author chenjiali
    */
    @GetMapping("/getReservationListByConfig")
    public Result<AttendanceConfigDTO> getReservationListByConfig(){
        Result result = new Result();
        List<AttendanceConfigDTO> attendanceConfigDTOList = new ArrayList<>();
        try{
            AttendanceConfig attendanceConfig = shareService.getCurrentDataSourceConfiguration();
            if (attendanceConfig.isLabReservation()){
                AttendanceConfigDTO attendanceConfigDTO = new AttendanceConfigDTO();
                attendanceConfigDTO.setReservationType("RESERVATION");
                attendanceConfigDTO.setReservationName("实验室预约");
                attendanceConfigDTOList.add(attendanceConfigDTO);
            }
            if (attendanceConfig.isInsReservation()){
                AttendanceConfigDTO attendanceConfigDTO = new AttendanceConfigDTO();
                attendanceConfigDTO.setReservationType("INSTRUMENT");
                attendanceConfigDTO.setReservationName("大仪预约");
                attendanceConfigDTOList.add(attendanceConfigDTO);
            }
            if (attendanceConfig.isDevReservation()){
                AttendanceConfigDTO attendanceConfigDTO = new AttendanceConfigDTO();
                attendanceConfigDTO.setReservationType("DEVICEBOOKING ");
                attendanceConfigDTO.setReservationName("设备预约");
                attendanceConfigDTOList.add(attendanceConfigDTO);
            }
            if (attendanceConfig.isStaReservation()){
                AttendanceConfigDTO attendanceConfigDTO = new AttendanceConfigDTO();
                attendanceConfigDTO.setReservationType("STATIONBOOKING");
                attendanceConfigDTO.setReservationName("工位预约");
                attendanceConfigDTOList.add(attendanceConfigDTO);
            }
            result.setCode(0);
            result.setMsg("请求成功");
            result.setData(attendanceConfigDTOList);
        }catch (Exception e){
            result.setCode(1);
            result.setMsg("错误:" + e.getMessage());
        }
        return result;
    }



}
