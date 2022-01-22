package net.gvsun.attendance.dbsource.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Description :学生考勤状态表
 *
 * @Author : cjl
 * @CreateTime : 2021/8/13 9:08
 **/
@Data
@TableName("attendance_status")
public class AttendanceStatus implements Serializable {
    @Id
    private String id;
    @Column
    private String username;
    @Column
    private String status;


}
