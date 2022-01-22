package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class SchoolCourseByNewDTO implements Serializable {
    /**
     * 新的教学班编号
     */
    private String groupUID;
    /**
     * 待合并的教学班编号
     */
    private String courseNo;
    /**
     * 待合并的课程编号
     */
    private String courseNumber;
    /**
     * 学期
     */
    private Integer termId;


}
