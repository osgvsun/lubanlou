package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
 * Description 保存排课对象
 * Author Hezhaoyi
 * 修改： 杨新蔚
 * 2020-12-22
 */
@Data
public class PracticeCourseResultDTO implements Serializable {
    /**
     * 排课id与名称（逗号隔开）
     */
    private String practiceCourseResultIdAndName;
    /**
     * 上课地点
     */
    private String courseAddress;
    /**
     * 上课地点主键
     */
    private String labIds;
    /**
     * 星期
     */
    private String weekDay;
    /**
     * 节次
     */
    private String classInfo;
    /**
     * 周次
     */
    private String weekId;
    /**
     * 学期
     */
    private String termId;
    /**
     * 学生名单
     */
    private String students;
    /**
     * 老师名单
     */
    private String teachers;
    /**
     * 排课工种信息
     */
    private String practiceCourseMajor;
}