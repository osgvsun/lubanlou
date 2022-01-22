package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class SchoolCourseGroupDTO implements Serializable {
    /**
     * schoolCourse的编号
     */
    private SchoolCourseDTO schoolCourse;
    /**
     * 教学班编号
     */
    private SchoolCourseDTO schoolCourseMerge;


}
