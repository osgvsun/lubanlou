package net.gvsun.iot.external;

import lombok.Data;

import java.io.Serializable;
@Data
public class AttendanceResultVo implements Serializable {
    private String cname;//姓名
    private String username;//工号
    private String cardno;//卡号
    private String workDate;//考勤日期
    private String startTime;//上午上班时间
    private String endTime;//下午下班时间
    private String amEndTime;//上午下班时间
    private String pmStartTime;//下午上班时间
    private String startWorkPlace;//上午上班考勤地点
    private String endWorkPlace;//下午下班考勤地点
    private String amEndWorkPlace;//上午下班考勤地点
    private String pmStartWorkPlace;//下午上班考勤地点
    private String workTime;//工作时长
    private String method;//考勤方式
    private String attendanceStatus;//考勤状态（1.出勤；2.迟到；3.早退；4.旷课；5.请假）
}
