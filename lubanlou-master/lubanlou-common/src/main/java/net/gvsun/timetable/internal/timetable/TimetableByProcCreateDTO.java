package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@NoArgsConstructor
@ToString
public class TimetableByProcCreateDTO implements Serializable {
    /**
     * 用户username
     * */
    private String username;
    /**
     * 选课组编号
     * */
    private String courseCode;
    /**
     * schoolCourseDetail的编号的详细
     * */
    private String courseDetailNo;
    /**
     * 排课的实验室
     * */
    private String labrooms;
    /**
     * 排课状态
     * 排课状态 1：已发布 10排课中 2：待审核 5：审核中 3:审核通过4：审核拒绝 11:调课 12 调课待审核 13 审核通过  15调课前
     * */
    private Integer status;
    /**
     * 排课类型
     * 排课方式：1直接排课2调整排课3二次不分组排课4二次分组排课5自主排课
     * */
    private Integer timetableStyle;
    /**
     * 排课的学期
     * */
    private Integer termId;
    /**
     * 课程
     * 关联课程的基本信息
     * */
    private String courseNumber;
    /**
     * 自主排课的id
     * 关联schoolselfcourse
     * */
    private Integer selfCourseCode;
    /**
     * 分批timetablegroup的id
     * */
    private String group;
    /**
     * virtual的id
     * */
    private String virtuals;
    /**
     * 排课的星期weekday
     * */
    private Integer weekday;
    /**
     * 排课的周次weeks
     * */
    private String weeks;
    private String weekdays;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    /**
     * 排课的节次classes
     * */
    private String classes;
    /**
     * 排课的主讲教师teachers
     * */
    private String teachers;
    /**
     * 排课的讲师tutors
     * */
    private String tutors;
    /**
     * 排课的项目items
     * */
    private String items;
    /**
     * 排课的软件items
     * */
    private String softwares;
    private String station;
    private String info;
    /**
     * 排课的创建日期createdDate
     * */
    private String createdDate;
    /**
     * 排课的修改日期createdDate
     * */
    private String updatedDate;
    /**
     * 存储过程返回的编号
     * */
    private Integer timetableId;
    private String memo;
}
