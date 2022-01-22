package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourse的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class SchoolCourseDTO implements Serializable {
    /**
     * schoolCourse的编号
     */
    private String courseNo;
    /**
     * 教学班名称
     */
    private String courseName;
    /**
     * 学期
     */
    private Integer term;
    /**
     * 课程
     */
    private String courseNumber;
    /**
     * 课程学时量
     */
    private int classHour;


}
