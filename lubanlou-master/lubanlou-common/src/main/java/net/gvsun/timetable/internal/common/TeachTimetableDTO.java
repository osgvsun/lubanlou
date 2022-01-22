package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
 * Description 保存排课对象
 * Author Hezhaoyi
 * 2020-3-3
 */
@Data
public class TeachTimetableDTO implements Serializable {
    /**
     * 排课id
     */
    private String appointmentId;
    /**
     * 上课类型
     */
    private String courseType;
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
     * 上课内容
     */
    private String courseContent;
    /**
     * 章节
     */
    private String wkChapters;
    /**
     * 文档
     */
    private String documents;
    /**
     * 实验项目
     */
    private String experimentSkills;
    /**
     * 分组
     */
    private String groupSelected;
    /**
     * 知识其他信息
     */
    private String knowledgeOther;
    /**
     * 知识链接
     */
    private String knowledgeLink;
    /**
     * 技能其他信息
     */
    private String skillOther;
    /**
     * 技能链接
     */
    private String skillLink;
    /**
     * 学期
     */
    private String termId;
    /**
     * 章节id
     */
    private String chapterId;
    /**
     * 学生名单
     */
    private String students;
    /**
     * 老师名单
     */
    private String teachers;
    /**
     * 课程信息
     */
    private String courseInfo;
    /**
     * 全量排课数据标记位
     *1为是全量数据，排课数据须保存对接至排课服务*/
    private Integer fullData;

    private String documentTitles;
    private String groupTitles;

}