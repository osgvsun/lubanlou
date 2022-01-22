package net.gvsun.timetable.internal.reservation;



import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 保存预约的传入参数对象
*
*  @author weicheng
*  @date 2020/7/1 13:07
*/
@Data
@ToString
public class LabReservationByParamSaveDTO implements Serializable {
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
     * 状态,对应timetable_appointment的字段
     */
    private int status;
    /**
     * 类别,对应timetable_appointment的字段,预约为7
     */
    private int timetableStyle;
    /**
     * 学期
     */
    private int term;
    /**
     * 活动人数
     */
    private String activitynumber;
    /**
     * 预约原因
     */
    private String reason;
    /**
     * 活动类别
     */
    private String eventType;
    /**
     * 活动名称
     */
    private String eventName;
    /**
     * 活动对象
     */
    private String objectType;
    /**
     * 预约内容
     */
    private String content;
    /**
     * 星期,逗号分隔，最后字符为逗号
     */
    private String weekday;
    /**
     * 设备预约还是实验室预约
     */
    private int deviceOrLab;
    /**
     * 周次,逗号分隔，最后字符为逗号
     */
    private String weeks;
    /**
     * 节次,逗号分隔，最后字符为逗号
     */
    private String sections;
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
     * 创建日期
     */
    private String createDate;
    /**
     * 修改日期
     */
    private String updateDate;
    /**
     * 网关地址
     */
    private String zuulServerUrl;
    /**
     * 项目名称
     */
    private String projectName;
    /**
     * 用于鲁班楼前端调用时鲁班楼没有权限进行区分-没有权限传null或者
     */
    private String authRole;


}