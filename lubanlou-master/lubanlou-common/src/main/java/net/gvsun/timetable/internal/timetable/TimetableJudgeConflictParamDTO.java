package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 排课判冲参数对象
*
*  @author weicheng
*  @date 2020/10/20 14:33
*/
@Data
@ToString
public class TimetableJudgeConflictParamDTO implements Serializable {
    /**
     * 教务课程编号
     */
    private String courseNo;
    /**
     * 自主课程编号
     */
    private Integer selfId;
    /**
     * 课程编号
     */
    private int termId;
    /**
     * 星期,逗号分隔，最后字符为逗号
     */
    private String weekdays;
    /**
     * 周次,逗号分隔，最后字符为逗号
     */
    private String weeks;
    /**
     * 节次,逗号分隔，最后字符为逗号
     */
    private String sections;
    /**
     * 排课类型
     */
    private int timetableStyle;
    /**
     * 已排课记录
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
     * 教师工号
     */
    private String teacher;
    /**
     * 实验室id
     */
    private String labId;
    /**
     * 分组id
     */
    private Integer groupId;
    /**
     * 老师判冲按钮
     */
    private String buttonT;
    /**
     * 实验室判冲按钮
     */
    private String buttonL;
    /**
     * 学生判冲按钮
     */
    private String buttonS;

    /**
     * 数据缓存key值
     */
    private String key;
    /**
     * 数据缓存hkey值
     */
    private String hkey;
    private String createdBy;


}
