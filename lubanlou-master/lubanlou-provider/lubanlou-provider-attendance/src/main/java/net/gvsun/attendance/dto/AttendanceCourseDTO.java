package net.gvsun.attendance.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Description :课程考勤DTO
 *
 * @Author : cjl
 * @CreateTime : 2021/7/27 9:23
 **/
@Data
public class AttendanceCourseDTO implements Serializable {

    /**
     *  主键id
     * */
    private String id;
    /**
     *  课程编号
     * */
    private String courseNo;

    /**
     *  课程名
     * */
    private String courseName;

    /**
     *  实验项目名称
     * */
    private String lpName;

    /**
     *  学院名称
     * */
    private String academyName;

    /**
     *  实验室名称
     * */
    private String labName;

    /**
     *  上课教师
     * */
    private String teacher;

    /**
     *  上课日期
     * */
    private String classDate;

    /**
     *  上课周次
     * */
    private String weeks;

    /**
     *  上课星期
     * */
    private String weekday;

    /**
     *  上课节次
     * */
    private String classes;

    /**
     *  开始节次
     * */
    private String startClass;

    /**
     *  结束节次
     * */
    private String endClass;

    /**
     *  学期名称
     * */
    private String termName;

    /**
     *  设备ip
     * */
    private String hardwareIp;
    /**
     *  设备ip String类型集合
     * */
    private List<String> hardwareIps;
    /**
     *  节次开始时间
     * */
    private String startTime;

    /**
     *  节次结束时间
     * */
    private String endTime;

}
