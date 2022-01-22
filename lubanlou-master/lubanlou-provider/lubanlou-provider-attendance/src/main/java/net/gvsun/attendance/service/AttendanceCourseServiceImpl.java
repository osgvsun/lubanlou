package net.gvsun.attendance.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.SneakyThrows;
import net.gvsun.attendance.dbsource.entity.AttendanceCourse;
import net.gvsun.attendance.dbsource.entity.AttendanceMode;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dbsource.mapper.AttendanceCourseMapper;
import net.gvsun.attendance.dbsource.mapper.AttendanceModeMapper;
import net.gvsun.attendance.dbsource.mapper.AttendanceStatusMapper;
import net.gvsun.attendance.dto.AttendanceCourseDTO;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.common.Result;
import net.gvsun.feign.TimetableFeign;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description :课程考勤
 *
 * @Author : cjl
 * @CreateTime : 2021/7/31 16:47
 **/
@Service
public class AttendanceCourseServiceImpl extends ServiceImpl<AttendanceCourseMapper, AttendanceCourse> implements AttendanceCourseService{

    public final AttendanceCourseMapper attendanceCourseMapper;
    @PersistenceContext
    private EntityManager entityManager;
    private final JdbcOperations jdbcOperations;
    private final TimetableFeign timetableFeign;
    private final AttendanceModeMapper attendanceModeMapper;
    private final AttendanceStatusMapper attendanceStatusMapper;

    public AttendanceCourseServiceImpl(AttendanceCourseMapper attendanceCourseMapper, EntityManager entityManager, JdbcOperations jdbcOperations, TimetableFeign timetableFeign, AttendanceModeMapper attendanceModeMapper, AttendanceStatusMapper attendanceStatusMapper) {
        this.attendanceCourseMapper = attendanceCourseMapper;
        this.entityManager = entityManager;
        this.jdbcOperations =jdbcOperations;
        this.timetableFeign = timetableFeign;
        this.attendanceModeMapper = attendanceModeMapper;
        this.attendanceStatusMapper = attendanceStatusMapper;
    }

    /**
     * Description :本地课程考勤页面
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Override
    public Page<AttendanceCourse> getAttendanceCourseList(String courseName, String teacher, String classDate, Integer page, Integer size){
        if (page ==null){
            page = 1;
        }
        if (size ==null){
            size = 10;
        }
        Page<AttendanceCourse> attendanceCoursePage = new Page<>(page, size);
        QueryWrapper<AttendanceCourse> attendanceCourseQueryWrapper =new QueryWrapper<>();
        if (!StringUtils.isEmpty(courseName)){
            attendanceCourseQueryWrapper.eq("course_name",courseName);
        }
        if (!StringUtils.isEmpty(teacher)){
            attendanceCourseQueryWrapper.eq("teacher_name", teacher);
        }
        if (!StringUtils.isEmpty(classDate)){
            attendanceCourseQueryWrapper.eq("class_date", classDate);
        }
        attendanceCourseQueryWrapper.groupBy("course_no","class_date","start_class","end_class");
        attendanceCourseQueryWrapper.orderByAsc("class_date");
        return this.page(attendanceCoursePage, attendanceCourseQueryWrapper);
    }
    /**
     * Description :获取本地课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Override
    public List<Map<String, Object>> getCourseList(){
        List<AttendanceCourse> records = this.attendanceCourseMapper.getCourseList();
        List<Map<String, Object>> result = new ArrayList<>();
        for (AttendanceCourse attendanceCourse : records) {
            Map<String, Object> map = new HashMap<>();
            if (attendanceCourse!=null) {
                map.put("course_name", attendanceCourse.getCourseName());
                result.add(map);
            }
        }
        return result;
    }
    /**
     * Description :获取本地教师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Override
    public List<Map<String, Object>> getTeacherList(){
        List<AttendanceCourse> records = this.attendanceCourseMapper.getTeacherList();
        List<Map<String, Object>> result = new ArrayList<>();
        for (AttendanceCourse attendanceCourse : records) {
            Map<String, Object> map = new HashMap<>();
            map.put("teacher_name", attendanceCourse.getTeacherName());
            result.add(map);
        }
        return result;
    }
    /**
     * Description :获取本地学生考勤列表列表
     *
     * @Author : cjl
     * @CreateTime : 2021/7/29
     **/
    @Override
    public  Page<AttendanceStudentDTO> getAttendanceStudent(String courseNo, String classDate, Integer startClass, Integer endClass,
                                                            String startTime, String endTime, String search,Integer page, Integer size){
        if (page ==null){
            page = 1;
        }
        if (size ==null){
            size = 10;
        }
        Page<AttendanceStudentDTO> attendanceCoursePage =new Page<>(page, size);
        QueryWrapper<AttendanceStudentDTO> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course_no", courseNo);
        queryWrapper.eq("class_date",classDate);
        queryWrapper.eq("start_class",startClass);
        queryWrapper.eq("end_class",endClass);
        if (!StringUtils.isEmpty(startTime)&&!StringUtils.isEmpty(endTime)){
            queryWrapper.between("datetime",startTime,endTime);
        }
        else{
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar c = Calendar.getInstance();
            //默认查询当天所有
            startTime = sdf.format(c.getTime());
            queryWrapper.eq("class_date",startTime);
        }
        if (!StringUtils.isEmpty(search)){
            queryWrapper.and(i->i.like("student_no", search).or().like("student_name", search));
        }
        queryWrapper.groupBy("student_no");
        return attendanceCourseMapper.getAttendanceStudent(attendanceCoursePage,queryWrapper);
    }

    /**
     * Description 排课学生名单
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    @SneakyThrows
    public List<AttendanceStudentDTO> getTimetableAttendanceList(TimetableQueryParam param) {
        Result result = new Result();
        List<AttendanceStudentDTO> list = new ArrayList<>();
        //只筛选当前年份
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        Date localDate = new Date();
        param.setYear(sdf.format(localDate));
        if (param.getOffset() == null) {
            param.setOffset(0);
        }
        if (param.getLimit() == null) {
            param.setLimit(10);
        }
        result = timetableFeign.apiListTimetables(param);
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(result));
        JSONObject data = jsonObject.getJSONObject("data");
        try{
        JSONArray jsonArray = data.getJSONArray("content");
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject o = jsonArray.getJSONObject(i);
            String id = o.getString("id");
            SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
            SimpleDateFormat sdfDatetime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = sdfDate.parse(o.getString("startDate"));
            Date time1 = sdfDatetime.parse(o.getString("startDate"));
            Date time2 = sdfDatetime.parse(o.getString("endDate"));
            List<String> hardwareIps = new ArrayList<>();
            try {
                JSONArray jsonArray0 = jsonArray.getJSONObject(i).getJSONArray("devices");
                for (int d = 0; d < jsonArray0.size(); d++) {
                    JSONObject o1 = jsonArray0.getJSONObject(d);
                    //根据考勤设置获取该实验室下对应的设备；
                    List<AttendanceMode> attendanceModeList = attendanceModeMapper.getAttendanceMode(1);
                    if (attendanceModeList.size() != 0) {
                        for (int f = 0; f < attendanceModeList.size(); f++) {
                            int hardwareType = attendanceModeList.get(f).getHardwareType();
                            if (toString().valueOf(hardwareType).equals(o1.getString("hardwareType"))) {
                                hardwareIps.add(o1.getString("hardwareIp"));
                            }
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            try {
                JSONArray jsonArray1 = o.getJSONArray("students");
                for (int j = 0; j < jsonArray1.size(); j++) {
                    AttendanceStudentDTO attendanceStudentDTO = new AttendanceStudentDTO();
                    attendanceStudentDTO.setId(id);
                    attendanceStudentDTO.setClassDate(sdfDate.format(date));
                    attendanceStudentDTO.setStartTime(sdfTime.format(time1));
                    attendanceStudentDTO.setEndTime(sdfTime.format(time2));
                    attendanceStudentDTO.setHardwareIps(hardwareIps);
                    JSONObject o1 = jsonArray1.getJSONObject(j);
                    attendanceStudentDTO.setUsername(o1.getString("studentId"));
                    attendanceStudentDTO.setStudentName(o1.getString("studentName"));
                    list.add(attendanceStudentDTO);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
     }catch (Exception e){
                e.printStackTrace();
        }
    return list;
    }

    /**
     * Description 排课课程
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    @SneakyThrows
    public List<AttendanceCourseDTO> getTimetableCourse(TimetableQueryParam param,String termName) {
        Result result = new Result();
        List<AttendanceCourseDTO> list = new ArrayList<>();
        result = timetableFeign.apiListTimetables(param);
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(result));
        JSONObject data = jsonObject.getJSONObject("data");
        try {
            JSONArray jsonArray = data.getJSONArray("content");
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject o = jsonArray.getJSONObject(i);
                AttendanceCourseDTO attendanceCourseDTO = new AttendanceCourseDTO();
                attendanceCourseDTO.setId(o.getString("id"));
                attendanceCourseDTO.setStartClass(o.getString("startClass"));
                attendanceCourseDTO.setEndClass(o.getString("endClass"));
                SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
                SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
                SimpleDateFormat sdfDatetime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                try {
                    Date date = sdfDate.parse(o.getString("startDate"));
                    Date time1 = sdfDatetime.parse(o.getString("startDate"));
                    Date time2 = sdfDatetime.parse(o.getString("endDate"));
                    attendanceCourseDTO.setStartTime(sdfTime.format(time1));
                    attendanceCourseDTO.setEndTime(sdfTime.format(time2));
                    attendanceCourseDTO.setClassDate(sdfDate.format(date));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                attendanceCourseDTO.setWeeks(o.getString("week"));
                attendanceCourseDTO.setWeekday(o.getString("weekday"));
                List<AttendanceCourseDTO> list1 = new ArrayList<>();
                try {
                    JSONArray jsonArray1 = o.getJSONArray("courses");
                    if (jsonArray1 !=null) {
                        for (int j = 0; j < jsonArray1.size(); j++) {
                            JSONObject o1 = jsonArray1.getJSONObject(j);
                            attendanceCourseDTO.setCourseNo(o1.getString("courseId"));
                            attendanceCourseDTO.setCourseName(o1.getString("courseName"));
                            attendanceCourseDTO.setAcademyName(o1.getString("academyName"));
                            list1.add(attendanceCourseDTO);
                        }
                    }else {
                        attendanceCourseDTO.setCourseName(o.getString("title"));
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }
                List<AttendanceCourseDTO> list2 = new ArrayList<>();
                try {
                    JSONArray jsonArray2 = jsonArray.getJSONObject(i).getJSONArray("teachers");
                    for (int a = 0; a < jsonArray2.size(); a++) {
                        JSONObject o2 = jsonArray2.getJSONObject(a);
                        attendanceCourseDTO.setTeacher(o2.getString("teacherName"));
                        list2.add(attendanceCourseDTO);
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }
                List<AttendanceCourseDTO> list3 = new ArrayList<>();
                try {
                    JSONArray jsonArray3 = jsonArray.getJSONObject(i).getJSONArray("rooms");
                    for (int b = 0; b < jsonArray3.size(); b++) {
                        JSONObject o3 = jsonArray3.getJSONObject(b);
                        attendanceCourseDTO.setLabName(o3.getString("roomName"));
                        list3.add(attendanceCourseDTO);
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }
                List<AttendanceCourseDTO> list4 = new ArrayList<>();
                try {
                    JSONArray jsonArray4 = jsonArray.getJSONObject(i).getJSONArray("items");
                    for (int c = 0; c < jsonArray4.size(); c++) {
                        JSONObject o4 = jsonArray4.getJSONObject(c);
                        attendanceCourseDTO.setLpName(o4.getString("itemName"));
                        list4.add(attendanceCourseDTO);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                List<AttendanceCourseDTO> list5 = new ArrayList<>();
                try {
                    JSONArray jsonArray5 = jsonArray.getJSONObject(i).getJSONArray("devices");
                    List<String> hardwareIps = new ArrayList<>();
                    for (int d = 0; d < jsonArray5.size(); d++) {
                        JSONObject o5 = jsonArray5.getJSONObject(d);
                        //根据考勤设置获取该实验室下对应的设备；
                        List<AttendanceMode> attendanceModeList = attendanceModeMapper.getAttendanceMode(1);
                        if (attendanceModeList.size() != 0) {
                            for (int f = 0; f < attendanceModeList.size(); f++) {
                                int hardwareType = attendanceModeList.get(f).getHardwareType();
                                if (toString().valueOf(hardwareType).equals(o5.getString("hardwareType"))) {
                                    hardwareIps.add(o5.getString("hardwareIp"));
                                    attendanceCourseDTO.setHardwareIps(hardwareIps);
                                }
                            }
                        }

                        list5.add(attendanceCourseDTO);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (param.getTermNumber() != null) {
                    attendanceCourseDTO.setTermName(termName);
                }
                list.add(attendanceCourseDTO);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    /**
     * Description 排课课程及统计记录数
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    @SneakyThrows
    public Integer countTimetableCourse(TimetableQueryParam param) {
        Result result = new Result();
        result = timetableFeign.apiListTimetables(param);
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(result));
        JSONObject data = jsonObject.getJSONObject("data");
        Integer totalElements =0;
        try {
            totalElements = data.getInteger("totalElements");
        }catch (Exception e){
            e.printStackTrace();
        }
        return totalElements;
    }
    /**
     * Description 排课课程统计
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    @SneakyThrows
    public List<AttendanceItemDTO> courseStatistics(TimetableQueryParam param,String termName){
        Result result = new Result();
        List<AttendanceItemDTO> list = new ArrayList<>();
        result = timetableFeign.apiListTimetables(param);
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(result));
        JSONObject data = jsonObject.getJSONObject("data");
        try {
            JSONArray jsonArray = data.getJSONArray("content");
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject o = jsonArray.getJSONObject(i);
                String id = o.getString("id");
                String week = o.getString("week");
                SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
                Date date = sdfDate.parse(o.getString("startDate"));
                String classDate = sdfDate.format(date);
                JSONArray jsonArray2 = jsonArray.getJSONObject(i).getJSONArray("teachers");
                String teacherName = "";
                for (int k = 0; k < jsonArray2.size(); k++) {
                    JSONObject o2 = jsonArray2.getJSONObject(k);
                    teacherName = o2.getString("teacherName");
                }
                JSONArray jsonArray3 = jsonArray.getJSONObject(i).getJSONArray("courses");
                String courseName = "";
                for (int a = 0; a < jsonArray3.size(); a++) {
                    JSONObject o3 = jsonArray3.getJSONObject(a);
                    courseName = o3.getString("courseName");
                }
                List<String> items = new ArrayList<>();
                try {
                    JSONArray jsonArray4 = jsonArray.getJSONObject(i).getJSONArray("items");
                    for (int b = 0; b < jsonArray4.size(); b++) {
                        JSONObject o4 = jsonArray4.getJSONObject(b);
                        items.add(o4.getString("itemName"));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                try {
                    JSONArray jsonArray1 = o.getJSONArray("students");
                    for (int j = 0; j < jsonArray1.size(); j++) {
                        AttendanceItemDTO attendanceItemDTO = new AttendanceItemDTO();
                        attendanceItemDTO.setId(id);
                        attendanceItemDTO.setTeachers(teacherName);
                        attendanceItemDTO.setCourseName(courseName);
                        attendanceItemDTO.setItems(items);
                        attendanceItemDTO.setClassDate(classDate);
                        JSONObject o1 = jsonArray1.getJSONObject(j);
                        attendanceItemDTO.setUsername(o1.getString("studentId"));
                        attendanceItemDTO.setCname(o1.getString("studentName"));
                        attendanceItemDTO.setWeeks(week);
                        attendanceItemDTO.setTermName(termName);
                        //获取考勤状态
                        List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(id,o1.getString("studentId"));
                        if (statusList.size()!=0){
                            String status = statusList.get(0).getStatus();
                            attendanceItemDTO.setStatus(status);
                        }else {
                            //若无考勤则默认为正常出勤
                            attendanceItemDTO.setStatus("1");
                        }
                        list.add(attendanceItemDTO);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
}
