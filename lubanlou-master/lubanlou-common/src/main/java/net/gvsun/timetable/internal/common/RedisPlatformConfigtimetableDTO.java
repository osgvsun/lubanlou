package net.gvsun.timetable.internal.common;

import lombok.Data;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 15:42
 */
@Data
public class RedisPlatformConfigtimetableDTO {
    /**
     * 在排课保存中，判断实验项目是否必填
     */
    private SelectBySchoolDTO school;
    private Boolean requiredItemSelect;

    private Boolean singleSelectFromTeacher;
    /**
     * 在排课页面中，判断是否进行有批量排课按钮
     * true：显示 不填或false 不显示
     */
    private Boolean batchSaveTimetable;
    /**
     * 在排课页面中，是否开放软件管理功能
     * true：显示 不填或false 不显示
     */
    private Boolean requiredSoftManage;
    /**
     * 在排课页面中，是否开放虚拟镜像相关功能
     * true：显示 不填或false 不显示
     */
    private Boolean requiredVirtualImage;
    /**
     * 在排课页面中，是否开放桌号的选项
     * true：显示 不填或false 不显示
     */
    private Boolean requiredTimetableStation;

    /**
     * 添加学生形式
     * 1、COURSE:通过课程添加
     * 2、SELF:自行添加
     */
    private String studentModel;

    /**
     * 排课形式
     * 1、WEEKDAY_WEEK_CLASS:星期周次节次
     * 2、DATETIME:日期时间
     * 3、WEEKDAY_TIME_WEEK:星期时间周次
     */
    private String timetableModel;
}
