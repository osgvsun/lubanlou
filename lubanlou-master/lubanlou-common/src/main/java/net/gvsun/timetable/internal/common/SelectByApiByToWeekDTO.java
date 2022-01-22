package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class SelectByApiByToWeekDTO implements Serializable {
    /**
     * 学期
     */
    private Integer term;
    /**
     * 星期
     */
    private Integer weekday;
    /**
     * 查询星期
     */
    private Integer search;
    /**
     * ","分割的节次
     */
    private String classes;
    /**
     * ","分割的实验室
     */
    private String labRoomIds;

    /**
     *
     */
    private String courseDetailNo;
    /**
     * 自己不判断冲突的自己周次 ","分割的周次
     * 调课，修改均可使用
     */
    private String selfWeeks;


}
