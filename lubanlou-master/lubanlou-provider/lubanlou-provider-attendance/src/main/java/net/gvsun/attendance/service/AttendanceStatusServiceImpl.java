package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.SneakyThrows;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dbsource.mapper.AttendanceStatusMapper;
import net.gvsun.attendance.dto.AttendanceItemDTO;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.attendance.dto.ItemParameter;
import net.gvsun.feign.IotFeign;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/13 10:31
 **/
@Service
public class AttendanceStatusServiceImpl extends ServiceImpl<AttendanceStatusMapper, AttendanceStatus> implements AttendanceStatusService {

    private final AttendanceCourseService attendanceCourseService;
    private final JdbcOperations jdbcOperations;
    @PersistenceContext
    private EntityManager entityManager;
    private final AttendanceStatusMapper attendanceStatusMapper;
    private final IotFeign iotFeign;
    private final AttendanceManagementService attendanceManagementService;

    public AttendanceStatusServiceImpl(AttendanceCourseService attendanceCourseService, JdbcOperations jdbcOperations, AttendanceStatusMapper attendanceStatusMapper, IotFeign iotFeign, AttendanceManagementService attendanceManagementService) {
        this.attendanceCourseService = attendanceCourseService;
        this.jdbcOperations = jdbcOperations;
        this.attendanceStatusMapper = attendanceStatusMapper;
        this.iotFeign = iotFeign;
        this.attendanceManagementService = attendanceManagementService;
    }

    /**
     * Description :获取学生考勤状态
     *
     * @Author : cjl
     * @CreateTime : 2021/8/13
     **/
    @SneakyThrows
    @Override
    public Page<AttendanceStatus> getAttendanceStatus(String id, HttpServletRequest request,String username, Integer current, Integer size) {
        if (current == null) {
            current = 1;
        }
        if (size == null) {
            size = 10;
        }
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
//        String username = request.getParameter("username");
        Page<AttendanceStatus> attendanceStatusPage = new Page<>(current, size);
        QueryWrapper<AttendanceStatus> attendanceStatusQueryWrapper = new QueryWrapper<>();
        attendanceStatusQueryWrapper.eq("id", id);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (!StringUtils.isEmpty(startTime)&&!StringUtils.isEmpty(endTime)) {
            attendanceStatusQueryWrapper.between("first_time", sdf.parse(startTime), sdf.parse(endTime)).
                    between("last_time", sdf.parse(startTime), sdf.parse(endTime));
        }
        if (!StringUtils.isEmpty(username)){
            attendanceStatusQueryWrapper.and(i->i.like("username", username).or().like("cname", username));
        }
        attendanceStatusQueryWrapper.groupBy("username").groupBy("id");
        return this.page(attendanceStatusPage, attendanceStatusQueryWrapper);
    }
    /**
     * Description 插入学生名单到状态表
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    public void insertStatus(TimetableQueryParam param,Integer attendanceType){
        List<AttendanceStudentDTO> result = new ArrayList<>();
        result = attendanceCourseService.getTimetableAttendanceList(param);
        for (AttendanceStudentDTO attendanceStudentDTO : result){
            jdbcOperations.update("INSERT INTO attendance_status (id,username,status) values (?,?,?) ON DUPLICATE KEY UPDATE  status = values (status)"
                    ,param.getId(),attendanceStudentDTO.getUsername(),attendanceType);
        }
    }
    /**
     * Description 插入学生名单（无默认状态）到状态表
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    public void insertStudent(TimetableQueryParam param){
        List<AttendanceStudentDTO> result = new ArrayList<>();
        result = attendanceCourseService.getTimetableAttendanceList(param);
        for (AttendanceStudentDTO attendanceStudentDTO : result){
            if (attendanceStudentDTO.getUsername()!=null) {
                jdbcOperations.update("INSERT INTO attendance_status (id,username,cname,class_date) values (?,?,?,?) ON DUPLICATE KEY UPDATE  class_date = values (class_date)"
                        , param.getId(), attendanceStudentDTO.getUsername(), attendanceStudentDTO.getStudentName()
                        , attendanceStudentDTO.getClassDate());
            }
        }
    }

    /**
     * Description 手动更新考勤状态
     *
     * @Author chenjiali 2021-08-13
     */
    @Override
    public void  updateStatus(String id,String username,Integer attendanceType){
        jdbcOperations.update("INSERT INTO attendance_status (id,username,status) values (?,?,?) ON DUPLICATE KEY UPDATE status = values (status)"
                ,id,username,attendanceType);
    }
    /**
     * Description 同步考勤机数据
     *
     * @Author chenjiali 2021-08-09
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void attandanceSync(TimetableQueryParam param,String startTime,String endTime, String hardwareIps,Integer attendanceType,Float meters){
        List<String> newlist = Arrays.asList(hardwareIps.split(","));
        List<String> hardwareIpList = new ArrayList<String>(newlist);
        //计算学生考勤结果
        List<AttendanceStudentDTO> attendanceStudentDTOList = attendanceManagementService.getStudentAttendanceRecords(param.getId(),startTime,endTime,hardwareIpList,meters,null,null);
            for (AttendanceStudentDTO attendanceStudentDTO : attendanceStudentDTOList) {
                if (attendanceStudentDTO.getUsername() != null && !"".equals(attendanceStudentDTO.getUsername())) {
                    jdbcOperations.update("INSERT INTO attendance_status (id,username,status) values (?,?,?) ON DUPLICATE KEY UPDATE  status = values (status)"
                            , param.getId(), attendanceStudentDTO.getUsername(), attendanceType);
                }
            }
    }

}
