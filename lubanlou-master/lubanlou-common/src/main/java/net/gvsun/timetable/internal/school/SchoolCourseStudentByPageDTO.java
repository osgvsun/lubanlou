package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
@ToString
public class SchoolCourseStudentByPageDTO implements Serializable {
    /**
     * 当前页
     */
    private Integer offset;
    /**
     * 每页记录
     */
    private Integer limit;
    /**
     * 学期
     */
    private Integer termId;
    /**
     * 状态
     */
    private String courseNo;
    /**
     * 查询关键子
     */
    private String search;
    /**
     * 排序
     */
    private String sort;
    /**
     * 升序降序
     */
    private String order;
    /**
     * 分页参数
     */
    private Integer page;

    private String createdBy;
    private String role;
    private String academyNumber;
}
