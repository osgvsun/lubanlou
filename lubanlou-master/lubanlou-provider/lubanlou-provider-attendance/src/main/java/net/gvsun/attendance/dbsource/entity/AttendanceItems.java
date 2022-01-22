package net.gvsun.attendance.dbsource.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/19 17:41
 **/
@Data
public class AttendanceItems implements Serializable {
    @Id
    private String id;
    @Column
    private String username;
    @Column
    private String courseName;
    @Column
    private String itemName;
    @Column
    private String teachers;
    @Column
    private String weeks;
    @Column
    private String schoolYear;
}
