package net.gvsun.timetable.internal.engineer;


import lombok.Data;
import net.gvsun.timetable.internal.audit.BaseActionAuthDTO;
import net.gvsun.timetable.internal.school.SchoolCourseDetailDTO;
import net.gvsun.timetable.internal.timetable.TimetableDTO;
import net.gvsun.timetable.internal.timetable.TimetableMergeDTO;

import java.io.Serializable;
import java.util.List;

/************************************************************
 * Descriptions：直接排课-列表呈现vo
 *
 * author 魏诚
 * date 2018-09-04
 ************************************************************/
@Data
public class EduCourseListDTO implements Serializable {
    //教学班编号
    private String courseNo;
    //教学班编号
    private Integer selfId;
    //课程编号
    private String courseNumber;
    //课程名称
    private String courseName;
    //教师工号
    private String username;
    //教师名称
    private String cname;
    //是否选课
    private int isSelect;
    //学期名称
    private String termName;
    //学期院名称
    private String academyName;
    //班级信息
    private String classInfo;
    private int termId;
    private List<SchoolCourseDetailDTO> schoolCourseDetailDTOs;
    private List<TimetableDTO> timetableDTOs;
    private List<TimetableMergeDTO> timetableMergeDTOs;
    //学生数量
    private int student;
    private int timetableStatus;
    private int timetableStyle;
    private BaseActionAuthDTO baseActionAuthDTO;


}
