package net.gvsun.attendance.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Description :课程统计DTO
 *
 * @Author : cjl
 * @CreateTime : 2021/8/16
 **/
@Data
public class AttendanceItemDTO implements Serializable {

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
     *  项目列表
     * */
    private List<String> items;
    /**
     *  上课时间
     * */
    private String classDate;

    /**
     *  学生姓名
     * */
    private String cname;

    /**
     *  学生学号
     * */
    private String username;

    /**
     *  学期名称
     * */
    private String termName;

    /**
     *  周次
     * */
    private String weeks;
    /**
     *  刷卡时间1
     * */
    private String datetime1;
    /**
     *  刷卡时间2
     * */
    private String datetime2;
    /**
     *  考勤状态
     * */
    private String status;


}
