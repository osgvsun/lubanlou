package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@NoArgsConstructor
@ToString
public class ProcMergeSchoolCourseDTO implements Serializable {
    /**
     * 合并后的courseNO编号
     * */
    private String inGroupUid;
    /**
     * 课程编号
     * */
    private String inCourseNumber;
    /**
     * schoolCourse的编号courseNo
     * */
    private String inCourseNo;


    private Integer inTerm;

    /**
     * 存储过程返回的编号courseNo
     * */
    private String outCourseNo;
}
