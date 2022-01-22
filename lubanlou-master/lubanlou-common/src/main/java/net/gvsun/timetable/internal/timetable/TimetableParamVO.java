package net.gvsun.timetable.internal.timetable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@ApiModel(value="排课传入对象",description="排课保存传入对象")
/**
*  Description 排课及预约-保存传参对象
*
*  @author weicheng
*  @date 2020/6/30 7:26
*/
public class TimetableParamVO implements Serializable {
    @ApiModelProperty(value="直接排课的教学班编号",name="courseNo")
    private String courseNo;
    @ApiModelProperty(value="直接排课的教学班明细编号",name="courseDetailNo")
    private String courseDetailNo;
    @ApiModelProperty(value="自主排课id",name="selfId")
    private int selfId;
    @ApiModelProperty(value="排课主键id",name="timetableId")
    private int timetableId;
    @ApiModelProperty(value="排课子表主键id",name="sameNumberId")
    private int sameNumberId;
    @ApiModelProperty(value="选课组编号(教学课程id)",name="courseCode")
    private String courseCode;
    @ApiModelProperty(value="学期id",name="term")
    private int term;
    @ApiModelProperty(value="状态",name="status")
    private int status;
    @ApiModelProperty(value="调停课状态",name="adjustStatus")
    private Integer adjustStatus;
    @ApiModelProperty(value="排课类型",name="timetableStyle")
    private int timetableStyle;
    @ApiModelProperty(value="星期",name="weekday")
    private int weekday;
    @ApiModelProperty(value="排课分组",name="groupId")
    private int groupId;
    @ApiModelProperty(value="所选实验室",name="labRoomIds")
    private int[] labRoomIds;
    @ApiModelProperty(value="所选节次",name="classes")
    private int[] classes;
    @ApiModelProperty(value="所选周次",name="weeks")
    private int[] weeks;
    @ApiModelProperty(value="不参与自我判冲的周次",name="selfWeeks")
    private int[] selfWeeks;
    @ApiModelProperty(value="调课、修改周次",name="adjustWeek")
    private int adjustWeek;
    @ApiModelProperty(value="所选教师",name="tearchs")
    private String[] tearchs;
    @ApiModelProperty(value="所选指导教师",name="tutors")
    private String[] tutors;
    @ApiModelProperty(value="软件id",name="softwares")
    private int[] softwares;
    @ApiModelProperty(value="所选项目",name="items")
    private int[] items;
    @ApiModelProperty(value="虚拟镜像id",name="virtualId")
    private String virtualId;
    @ApiModelProperty(value="是否关联设备借用",name="relevantEquipment")
    private Integer relevantEquipment;

    @ApiModelProperty(value="预约人数(预约迁移）",name="number")
    private String number;
    @ApiModelProperty(value="预约理由（预约迁移））",name="lendingReason")
    private String lendingReason;
    @ApiModelProperty(value="预约类型（预约迁移）",name="LendingType")
    private String CDictionaryByLendingType;
    @ApiModelProperty(value="使用人类型（预约迁移）",name="LendingUserType")
    private String CDictionaryByLendingUserType;
    @ApiModelProperty(value="预约人电话（预约迁移）",name="lendingUserPhone")
    private String lendingUserPhone;
    @ApiModelProperty(value="当前所处审核阶段的审核人权限,pass通过,fail拒绝（预约迁移）",name="auditAuthLevel")
    private String auditAuthLevel;
    @ApiModelProperty(value="提交次数，调课除第一次提交后续提交直接新建保存",name="auditAuthLevel")
    private String weekdays;
    private Integer submitNum;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
}
