package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Descriptions：共享库-项目预约新建课程的的DTO对象
 *
 * @author Hezhaoyi
 * @date 2019-11-17
 */
@Data
public class TimetableSelfCourseForOpenItemDTO {
    private Integer id;
    /**
     * 名称
     */
    private String name;
    /**
     * 课程的编号
     */
    private String courseNumber;
    /**
     * 自主排课的编号
     */
    private String courseCode;
    /**
     * 学院的编号
     */
    private String academyNumber;
    /**
     * 学生人数
     */
    private Integer courseCount;
    /**
     * 学期
     */
    private Integer term;
    /**
     * 学生名单
     */
    private String students;
    private String teacher;
    private Integer status;
    /**
     * 项目预约新建排课相关
     */
    /**
     * 开放学院(中间逗号分隔)
     */
    private String openAcademy;
    /**
     * 开放年级(中间逗号分隔)
     */
    private String openGrade;
    /**
     * 开放专业(中间逗号分隔)
     */
    private String openMajor;

    /**
     * 用于页面返回
     */
    /**
     * 开放学院名称
     */
    private String openAcademyName;
    /**
     * 开放年级名称
     */
    private String openGradeName;
    /**
     * 开放专业名称
     */
    private String openMajorName;

    /**
     * 项目id
     */
    private Integer itemId;
    /**
     * 项目名称
     */
    private String itemName;
    /**
     * 批组参数
     */
    /**
     * 教学班编号
     */
    private String courseNo;
    /**
     * 批组id
     */
    private Integer batchId;
    /**
     * 批组id
     */
    private Integer groupId;
    /**
     * 批次名称，默认为第1批等...
     */
    private String batchName;
    /**
     * 分组数
     */
    private int countGroup;
    /**
     * 是否学生选课0自动选课1学生选课
     */
    private int ifselect;
    /**
     * 每组人数
     */
    private Integer numbers;
    private int flag;
    private Integer selfId;
    private Date startDate;
    private Date endDate;
    /**
     * 每人可选组数
     */
    private int maxGroupNum;
    /**
     * 项目预约新建排课相关批组参数
     */
    /**
     * 项目列表
     */
    private List itemList;
    /**
     * 学院列表
     */
    private List academyList;
    /**
     * 年级列表
     */
    private List gradeList;
    /**
     * 专业列表
     */
    private List majorList;


}
