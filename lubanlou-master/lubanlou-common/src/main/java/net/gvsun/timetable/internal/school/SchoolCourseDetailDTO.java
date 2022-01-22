package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 共享库-SchoolCourseDetail的DTO对象
*
*  @author weicheng
*  @date 2020/7/20 17:48
*/
@Data
@ToString
public class SchoolCourseDetailDTO implements Serializable {
    /**
    * schoolCourse的编号
    */
    private String courseNo;
    /**
     * 教学班编号
     */
    private String courseDetailNo;
    /**
     * 课程计划
     */
    private String coursePlan;
    private String startClass;
    private String weekday;
    private String endClass;
    private String startWeek;
    /**
     * 教学班编号
     */
    private String endWeek;
    /**
     * 地点
     */
    private String labInfo ;
    /**
     * 教师姓名
     */
    private String teacher;
    /**
     * 学分
     */
    private String credits;
    /**
     * 学生人数
     */
    private String studentNumber;
    /**
     * 排课要求
     */
    private String courseSchedulingRequirements;
}
