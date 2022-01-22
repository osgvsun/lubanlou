package net.gvsun.attendance.dbsource.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

/**
 * Description :课程考勤表
 *
 * @Author : cjl
 * @CreateTime : 2021/7/27 11:14
 **/
@Data
@TableName("attendance_course")
@Entity
public class AttendanceCourse implements Serializable {
    @Id
    private Integer id;
    @Column
    private String courseNo;
    @Column
    private String courseName;
    @Column
    private String lpName;
    @Column
    private String academyName;
    @Column
    private String labName;
    @Column
    private String teacherName;
    @Column
    private String studentNo;
    @Column
    @TableField("class_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate classDate;
    @Column
    private Integer weeks;
    @Column
    private Integer weekday;
    @Column
    private Integer startClass;
    @Column
    private Integer endClass;
    @Column
    private String attendanceStatus;
    @Column
    private String studentName;
    @Column
    private String hardwareIp;
    @Column
    @TableField("start_time")
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime startTime;
    @Column
    @TableField("end_time")
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime endTime;
}
