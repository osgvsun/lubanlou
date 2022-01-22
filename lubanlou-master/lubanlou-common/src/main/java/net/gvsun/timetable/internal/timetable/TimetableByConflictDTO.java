package net.gvsun.timetable.internal.timetable;



import lombok.Data;

import java.util.List;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 16:59
 */
@Data
public class TimetableByConflictDTO {
    /**
     * 所选节次
     */
    private String sections;
    /**
     * 所选节次-新排课页面展示
     */
    private String sectionsShow;
    /**
     * 所选周次
     */
    private String weeks;
    /**
     * 所选周次-新排课页面展示
     */
    private String weeksShow;
    /**
     * 所选星期
     */
    private String weekdays;
    /**
     * 星期
     */
    private int weekday;
    /**
     * 节次
     */
    private int section;
    /**
     * 周次
     */
    private int week;
    /**
     * 空闲情况分数显示
     */
    private String conflictRate;
    /**
     * 标记用于存放实验室判冲参数周次星期节次
     */
    private String tag;
    /**
     * 实验室判冲结果
     */
    private List resultsLabRoom;
    /**
     * 实验项目
     */
    private List resultsOperationItem;
    /**
     * 教师
     */
    private List resultsTeacher;
    /**
     * 可选周次
     */
    private List resultsWeek;
    /**
     * 可选批次
     */
    private List resultsSection;
    /**
     * 可选批次
     */
    private List resultsBatch;
    /**
     * 可选组次
     */
    private List resultsGroup;
    /**
     * 组次对应的批次
     */
    private String batchId;
    /**
     * 辅导
     */
    private List resultsTutor;
    /**
     * 已排课记录
     */
    private String[] tagArray;
    /**
     * 以下参数用于查看实验室冲突详情
     */
   /**
     * 课程名称
     */
    private String courseName;
    /**
     * 授课老师
     */
    private String user;
    /**
     * 授课老师电话
     */
    private String userPhone;
    /**
     * 多选时的区分
     */
    /**
     * 冲突实验室名称
     */
    private String labRoom;

}
