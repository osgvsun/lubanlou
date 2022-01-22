package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.attendance.dbsource.entity.AttendanceItems;
import net.gvsun.attendance.dbsource.mapper.AttendanceItemsMapper;
import net.gvsun.attendance.dto.AttendanceCourseDTO;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/19 18:30
 **/
@Service
public class AttendanceItemsServiceImpl extends ServiceImpl<AttendanceItemsMapper, AttendanceItems> implements AttendanceItemsService {

    public final AttendanceItemsMapper attendanceItemsMapper;
    private final AttendanceCourseService attendanceCourseService;

    public AttendanceItemsServiceImpl(AttendanceItemsMapper attendanceItemsMapper, AttendanceCourseService attendanceCourseService) {
        this.attendanceItemsMapper = attendanceItemsMapper;
        this.attendanceCourseService = attendanceCourseService;
    }

    /**
     * Description :获取课程列表
     *
     * @Author : cjl
     * @CreateTime : 2021/8/19
     **/
    @Override
    public List<Map<String, Object>> getCourseList(){
        TimetableQueryParam param = new TimetableQueryParam();
        //只筛选当前年份
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        Date localDate = new Date();
        param.setYear(sdf.format(localDate));
        List<AttendanceCourseDTO> records = attendanceCourseService.getTimetableCourse(param,null);
        List<Map<String, Object>> result = new ArrayList<>();
        for (AttendanceCourseDTO attendanceCourseDTO : records) {
            Map<String, Object> map = new HashMap<>();
            if (attendanceCourseDTO!=null&&attendanceCourseDTO.getCourseName()!=null) {
                map.put("course_name", attendanceCourseDTO.getCourseName());
                result.add(map);
            }
        }
        //去重
        return result.stream().distinct().collect(Collectors.toList());
    }
    /**
     * Description :获取教师列表
     *
     * @Author : cjl
     * @CreateTime : 2021/8/19
     **/
    @Override
    public List<Map<String, Object>> getTeacherList(){
        TimetableQueryParam param = new TimetableQueryParam();
        //只筛选当前年份
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        Date localDate = new Date();
        param.setYear(sdf.format(localDate));
        List<AttendanceCourseDTO> records = attendanceCourseService.getTimetableCourse(param,null);
        List<Map<String, Object>> result = new ArrayList<>();
        for (AttendanceCourseDTO attendanceCourseDTO : records) {
            Map<String, Object> map = new HashMap<>();
            if (attendanceCourseDTO!=null&&attendanceCourseDTO.getTeacher()!=null) {
                map.put("teachers", attendanceCourseDTO.getTeacher());
                result.add(map);
            }
        }
        return result.stream().distinct().collect(Collectors.toList());
    }
}
