package net.gvsun.timetable.internal.user;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class AuthorityDTO implements Serializable {
    /**
     * schoolCourse的编号
     */
    private int id;
    /**
     * 教学班编号
     */
    private String authorityName;
    /**
     * 学期开始时间
     */
    private String cname;
    /**
     * 学期结束时间
     */
    private int type;


}
