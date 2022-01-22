package net.gvsun.attendance.dbsource.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Description :考勤模式表
 *
 * @Author : cjl
 * @CreateTime : 2021/9/14 13:08
 **/
@Data
@TableName("attendance_mode")
public class AttendanceMode implements Serializable {
    @Id
    private int id;
    @Column
    private int hardwareType;
    @Column
    private int enabled;
}
