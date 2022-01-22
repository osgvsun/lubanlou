package net.gvsun.attendance.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Description :学生考勤DTO
 *
 * @Author : cjl
 * @CreateTime : 2021/7/29
 **/
@Data
public class AttendanceStudentDTO implements Serializable {

    /**
     *  id
     * */
    private String id;

    /**
     *  教师
     * */
    private String teachers;
    /**
     *  课程名称
     * */
    private String courseName;

    /**
     *  学生姓名
     * */
    private String studentName;

    /**
     *  学生学号
     * */
    private String username;

    /**
     *  考勤日期
     * */
    private String classDate;

    /**
     *  刷卡时间1
     * */
    private String datetime;

    /**
     *  刷卡时间2
     * */
    private String datetime2;

    /**
     *  偏差距离1
     * */
    private String attDeviation;

    /**
     *  偏差距离2
     * */
    private String attDeviation2;

    /**
     *  开始地点
     * */
    private String address;

    /**
     *  结束地点
     * */
    private String address2;

    /**
     *  考勤状态
     * */
    private String status;

    /**
     *  开始节次
     * */
    private Integer startClass;

    /**
     *  结束节次
     * */
    private Integer endClass;

    /**
     *  开始时间
     * */
    private String startTime;

    /**
     *  结束时间
     * */
    private String endTime;

    /**
     *  设备类型
     * */
    private String hardwareType;

    /**
     *  设备ip
     * */
    private String hardwareIp;
    /**
     *  ips
     * */
    private List<String> hardwareIps;
}
