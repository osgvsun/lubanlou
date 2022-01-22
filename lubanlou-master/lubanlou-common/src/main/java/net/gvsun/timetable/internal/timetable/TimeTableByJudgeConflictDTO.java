package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;
import net.gvsun.timetable.internal.user.UserDTO;

import java.io.Serializable;
import java.util.List;

/**
*  Description 直接排课-保存传参对象
*
*  @author Hezhaoyi
*  @date 2020/10/20 15:11
*/
@Data
@ToString
public class TimeTableByJudgeConflictDTO implements Serializable {
    /**
     * 排课的教学班编号
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
    private String labRoomId;
    /**
     * 微服务名称
     */
    private String classes;
    /**
     * 所选周次
     */
    private String weeks;
    /**
     * 不参与自我判冲的周次
     */
    private String selfWeeks;
    /**
     * 调课、修改周次
     */
    private String adjustWeek;
    /**
     * 所选教师
     */
    private String teacher;
    /**
     * 所选指导教师
     */
    private String tutor;
    /**
     * 软件id
     */
    private int[] softwares;
    /**
     * 所选项目
     */
    private String item;
    /**
     * 虚拟镜像id,逗号分隔
     */
    private String virtual;
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
     * 排课中间教师数据
     */
    private List<UserDTO> teacherList;
    /**
     * 排课中间实验室数据
     */
    private String[] labRoomArray;
    /**
     * 用户工号
     */
    private String username;
    /**
     * 学生姓名
     */
    private String studentUsername;
    /**
     * 排课节次记录
     */
    private String tag;

    /**
     * 数据缓存key值
     */
    private String key;
    /**
     * 数据缓存hkey值
     */
    private String hkey;
    private String createdBy;
    private String role;
    private String academyNumber;
    private Integer[] station;
    private String info;
    private String memo;
}
