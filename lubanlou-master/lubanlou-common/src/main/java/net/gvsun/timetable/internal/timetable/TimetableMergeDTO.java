package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：排课数据DTO-获取排课的周次节次
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class TimetableMergeDTO implements Serializable {
    private int timetableId;
    /**
     * schoolCourse的编号
     */
    private String courseNo;
    private int startClass;
    private int weekday;
    private int endClass;
    private int startWeek;
    private int endWeek;
    /**
     * 学期
     */
    private int term;
    /**
     * 学期
     */
    private String timetableInfo;
    /**
     * 实验室
     */
    private int lab;
    private String labInfo;

}
