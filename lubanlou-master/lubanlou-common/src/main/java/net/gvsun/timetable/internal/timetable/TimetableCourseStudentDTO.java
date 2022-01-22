package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseStudent的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class TimetableCourseStudentDTO implements Serializable {
    /**
     * 教学班编号
     */
    private int id;

    private int selfId;
    /**
     * 学生姓名
     */
    private String cname;
    /**
     * 学生学号
     */
    private String username;
    private String className;
    private String classNumber;

    /**
     * 课程名称
     */
    private String courseName;
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
