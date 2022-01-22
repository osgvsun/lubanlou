package net.gvsun.timetable.internal.reservation;



import lombok.Data;

import java.io.Serializable;

/**
 * Description 审核-保存实验室预约（按周次节次）
 *
 * @author weicheng
 * @date 2019-3-1
 */
@Data
public class LabReservationBySaveParamDTO implements Serializable {
    /**
     * 预约用户学号
     */
    private String username;
    /**
     * 联系电话
     */
    private String telephone;
    /**
     * 实验室主键
     */
    private int labRoom;
    /**
     * 预约日期
     */
    private String date;
    /**
     * 预约时间段
     */
    private String time;
    /**
     * 活动类别：
     */
    /**
     * 活动人数
     */
    private String activitynumber;
    /**
     * 活动类别
     */
    private String eventType;
    /**
     * 活动名称
     */
    private String eventName;
    /**
     * 活动DTO
     */
    private String objectType;
    /**
     * 预约内容
     */
    private String content;
    /**
     * 日期模式转化周次节次保存添加
     */
    /**
     * 节次,逗号分隔，最后字符为逗号
     */
    private String sections;
    /**
     * 学期
     */

    private int term;
    /**
     * 预约原因
     */
    private String reason;
    /**
     * 预约日期
     */
    private String appDate;
    /**
     * 预约预约日期
     */
    private String startTime;
    /**
     * 预约结束日期
     */
    private String endTime;
    /**
     * 网关地址
     */
    private String zuulServerUrl;
    /**
     * 用于鲁班楼前端调用时鲁班楼没有权限进行区分-没有权限传null或者''
     */
    private String authRole;


}