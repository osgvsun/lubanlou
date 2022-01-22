package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
/**
*  Description 共享库-SchoolCourseDetail的DTO对象
*
*  @author weicheng
*  @date 2021/1/26 16:54
*/
public class TimetableSelfCourseDTO implements Serializable {
    private Integer id;
    /**
     * 名称
     */
    private String name;
    /**
     * 课程的编号
     */
    private String courseNumber;
    /**
     * 自主排课的编号
     */
    private String courseCode;
    /**
     * 学院的编号
     */
    private String academyNumber;
    /**
     * 学生人数
     */
    private Integer courseCount;
    /**
     * 学期
     */
    private Integer term;
    /**
     * 学生名单
     */
    private String students;
    private String teacher;
    private Integer status;
    private String createdDate;
    private String createdBy;
    private String role;
}
