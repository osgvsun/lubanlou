package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author 魏诚
 * @date  2018-09-04
 */
@Data
public class TimetableDTO implements Serializable {
    private int id;
    private int sameNumberId;
    /**
     * schoolCourse的编号
     */
    private String courseNo;
    /**
     * timetable的status
     */
    private Integer status;
    /**
     * timetable的adjust_status
     */
    private Integer adjustStatus;
    /**
     * 自主排课的编号
     */
    private String selfId;
    /**
     * 自主排课的编号
     */
    private Integer batchId;
    /**
     * 自主排课的编号
     */
    private String batchName;
    /**
     * 自主排课的分组编号
     */
    private Integer groupId;
    /**
     * 自主排课的分组名称
     */
    private String groupName;
    /**
     * 自主排课的分组计划人数
     */
    private Integer groupNumbers;
    /**
     * 自主排课的分组实际人数
     */
    private Integer groupStudents;
    /**
     * 教学班编号
     */
    private String courseDetailNo;
    /**
     * 时间安排
     */
    private String timetable;
    private String startClassName;
    private String endClassName;
    private int startClass;
    private int weekday;
    private int endClass;
    private int startWeek;
    private int endWeek;
    private Date startDate;
    private Date endDate;
    private String weeks;
    private String classes;
    private String batchAndGroupName;

    private String timetableWeekdays;
    private String timetableStartDate;
    private String timetableEndDate;
    private String timetableStartTime;
    private String timetableEndTime;

    /**
     * 授课实验室
     */
    private String labs;
    /**
     * 授课教师
     */
    private String teachers;
    /**
     * 软件
     */
    private String softwares;
    /**
     * 虚拟镜像
     */
    private String virtuals;
    /**
     * 指导教师
     */
    private String tutors;
    /**
     * 实验项目
     */
    private String items;
    /**
     * 课程信息
     */
    private String courseName;
    private String courseNumber;
    /**
     * 学期
     */
    private String termName;
    /**
     * 时间安排
     */
    private String labInfo;
    private String labNumber;

    /**
     * 学期id
     */
    private int termId;

    private int ifSelect;
    /**
     * 节次开始时间
     */
    private String startClassTime;
    /**
     * 节次结束时间
     */
    private String endClassTime;
    private String createdBy;
    private String role;
    private String academyNumber;
    private Object[] station;
    private String info;

}
