package net.gvsun.timetable.internal.timetable;



import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author 魏诚
 * @date  2018-09-04
 */
@Data
public class TimetableByUsableTimeDTO implements Serializable {
    /**
     * 星期
     */
    private String weekday;
    /**
     * 实验室
     */
    private String labRoomId;
    /**
     * 类型：0有效实验室1有效星期2有效节次3有效周次
     */
    private Integer type;
    /**
     * 学期
     */
    private Integer term;
    /**
     * 学院
     */
    private String academyNumber;
    /**
     * 软件
     */
    private String soft;
    /**
     * 关键字查询
     */
    private String search;
    /**
     * 节次，逗号分隔
     */
    private String classes;
    /**
     * 周次，逗号分隔
     */
    private String weeks;
    /**
     * 日期
     */
    private String date;
    /**
     * 标记用于存放实验室判冲参数周次星期节次
     */
    private String[] tag;
    /**
     * 分页参数-当前页
     */
    private int page;
    /**
     * 分页参数-每页记录数
     */
    private int limit;
    /**
     * 排课记录已选教师
     */
    private String[] teacherSelected;
    /**
     * 排课记录已选实验室
     */
    private String[] labSelected;
    /**
     * 教务排课编号
     */
    private String courseNo;
    /**
     * 排课记录已选教师
     */
    private String[] tutorSelected;

}
