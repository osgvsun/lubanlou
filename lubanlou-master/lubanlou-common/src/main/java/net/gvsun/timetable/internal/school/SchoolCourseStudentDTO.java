package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description DTO-SchoolCourseStudent的DTO对象
*
*  @author weicheng
*  @date 2020/7/22 10:56
*/
@Data
@ToString
public class SchoolCourseStudentDTO implements Serializable {
    /**
    * 教学班编号
    */
    private String courseNo;
    /**
     * 明细编号
     */
    private String courseDetailNo;
    /**
     * 学生姓名
     */
    private String cname;
    /**
     * 学生学号
     */
    private String username;
    /**
     * 课程名称
     */
    private String courseName;
    /**
     * 班级名称
     */
    private String className;
    /**
     * 课程名称
     */
    private String courseNumber;
    /**
     * 老师工号
     */
    private String teacherNumber;
    /**
     * 老师姓名
     */
    private String teacherName;
    /**
     * 所属学院
     */
    private String academyName;
    /**
     * 所属学院
     */
    private String academyNumber;
    /**
     * 所属学期
     */
    private String termName;
    private int termId;


}
