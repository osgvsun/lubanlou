package net.gvsun.timetable.internal.reservation;



import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Description 实验室预约-预约记录对象
 *
 * @author weicheng
 * @date 2019-3-1
 **/
@Data
public class LabRoomReservationAuditDTO implements Serializable {
    /**
     * timetable_appointment主键
     */
    private int appointmentId;
    /**
     * timetable_self_course主键
     */
    private int selfId;
    /**
     * 对应班级主键
     */
    private int classId;
    /**
     * 指导教师学号
     */
    private String teacher;
    /**
     * 指导教师姓名
     */
    private String teacherName;
    /**
     * 实验室主键
     */
    private int labRoom;
    /**
     * 实验室名称
     */
    private String labRoomName;
    /**
     * 预约日期
     */
    private String reservationDate;
    /**
     * 预约起始时间
     */
    private String startTime;
    /**
     * 预约结束时间
     */
    private String endTime;
    /**
     * 预约原因
     */
    private String reason;
    /**
     * 预约对象
     */
    private String userObject;
    /**
     * 预约对象名称
     */
    private String userObjectName;
    /**
     * 活动类别
     */
    private String eventType;
    /**
     * 活动名称
     */
    private String eventName;
    /**
     * 活动人数
     */
    private String number;
    /**
     * 预约用户学号
     */
    private String contacts;
    /**
     * 预约用户名称
     */
    private String cname;
    /**
     * 预约人所在学院
     */
    private String academyName;
    /**
     * 联系电话
     */
    private String telephone;
    /**
     * 流程线
     */
    /**
     * 审核流程线
     */
    private List<Object[]> processLine;


}