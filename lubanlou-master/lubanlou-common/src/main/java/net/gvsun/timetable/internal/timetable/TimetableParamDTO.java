package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import springfox.documentation.spring.web.json.Json;

import java.io.Serializable;

@Data
@ToString
/**
*  Description 排课及预约-保存传参DTO
*
*  @author weicheng
*  @date 2020/6/30 7:26
*/
public class TimetableParamDTO implements Serializable {
    /**
     * 直接排课的教学班编号
     */
    private String courseNo;
    /**
     * 直接排课的教学班明细编号
     */
    private String courseDetailNo;
    /**
     * 自主排课id
     */
    private int selfId;
    /**
     * 排课主键id
     */
    private int timetableId;
    /**
     * 排课子表主键id
     */
    private int sameNumberId;
    /**
     * 选课组编号(教学课程id)
     */
    private String courseCode;
    /**
     * 学期id
     */
    private int term;
    /**
     * 状态
     */
    private int status;
    /**
     * 调停课状态
     */
    private Integer adjustStatus;
    /**
     * 排课类型
     */
    private int timetableStyle;
    /**
     * 星期
     */
    private int weekday;
    /**
     * 排课分组
     */
    private int groupId;
    /**
     * 所选实验室
     */
    private int[] labRoomIds;
    /**
     * 所选节次
     */
    private int[] classes;
    /**
     * 所选周次
     */
    private int[] weeks;
    /**
     * 不参与自我判冲的周次
     */
    private int[] selfWeeks;
    /**
     * 调课、修改周次
     */
    private int adjustWeek;
    /**
     * 所选教师
     */
    private String[] tearchs;
    /**
     * 所选指导教师
     */
    private String[] tutors;
    /**
     * 软件id
     */
    private int[] softwares;
    /**
     * 所选项目
     */
    private int[] items;
    /**
     * 虚拟镜像id
     */
    private String[] virtuals;
    /**
     * 是否关联设备借用
     */
    private Integer relevantEquipment;

    /**
     * 预约人数(预约迁移）
     */
    private String number;
    /**
     * 预约理由（预约迁移））
     */
    private String lendingReason;
    /**
     * 预约类型（预约迁移）
     */
    private String CDictionaryByLendingType;
    /**
     * 使用人类型（预约迁移）
     */
    private String CDictionaryByLendingUserType;
    /**
     * 预约人电话（预约迁移）
     */
    private String lendingUserPhone;
    /**
     * 当前所处审核阶段的审核人权限,pass通过,fail拒绝（预约迁移）
     */
    private String auditAuthLevel;
    /**
     * 提交次数，调课除第一次提交后续提交直接新建保存
     */
    private String weekdays;
    private Integer submitNum;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String createdBy;
    private String role;
    private String academyNumber;
    private String info;
    private Integer[] station;
}
