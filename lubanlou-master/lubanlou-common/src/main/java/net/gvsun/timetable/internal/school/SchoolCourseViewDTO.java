package net.gvsun.timetable.internal.school;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import net.gvsun.timetable.internal.audit.BaseActionAuthDTO;
import net.gvsun.timetable.internal.timetable.TimetableBatchDTO;
import net.gvsun.timetable.internal.timetable.TimetableDTO;
import net.gvsun.timetable.internal.timetable.TimetableMergeDTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
*  Description 教务排课-列表呈现vo
*
*  @author weicheng
*  @date 2020/7/22 15:33
*/
@Data
@ToString
public class SchoolCourseViewDTO implements Serializable {
    /**
    * 教学班编号
    */
    private String courseNo;
    /**
     * 自主排课计划编号
     */
    private Integer selfId;
    /**
     * 课程类型
     */
    private String courseType;
    /**
     * 课程编号
     */
    private String courseNumber;
    /**
     * 课程名称
     */
    private String courseName;
    /**
     * 教师工号
     */
    private String username;
    /**
     * 教师名称
     */
    private String cname;
    /**
     * 是否选课
     */
    private int isSelect;
    /**
     * 学期名称
     */
    private String termName;
    /**
     * 学期院名称
     */
    private String academyName;
    private String academyNumber;
    /**
     * 班级信息
     */
    private String classInfo;
    /**
     * 合并教学班信息
     */
    private String groupUID;
    private int termId;
    private List<SchoolCourseDetailDTO> schoolCourseDetailDTOs;
    private List<SchoolCourseGroupDTO> schoolCourseGroupDTOs;
    private List<TimetableDTO> timetableDTOs;
    private List<TimetableMergeDTO> timetableMergeDTOs;
    private List<TimetableBatchDTO> timetableBatchDTOS;
    //学生数量
    /**
     * 学生数量
     */
    private int student;
    private int timetableStatus;
    private int timetableStyle;
    private BaseActionAuthDTO baseActionAuthDTO;
    /**
     * 审核流转信息
     */
    private String auditors;
    /**
     * 实验室id
     */
    private String labId;
    /**
     * 实验室名称
     */
    private String labName;
    /**
     * 排课人
     */
    private String userCreateBy;
    /**
     * 培训计划创建日期
     */
    private String selfCreatedDate;
    /**
     * 培训计划创建人
     */
    private String selfCreatedBy;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

}
