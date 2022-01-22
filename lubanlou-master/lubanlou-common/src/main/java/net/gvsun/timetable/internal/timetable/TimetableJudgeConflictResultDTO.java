package net.gvsun.timetable.internal.timetable;



import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/22 13:43
*/
@Data
public class TimetableJudgeConflictResultDTO implements Serializable {
    /**
     * 教师已安排上课记录-冲突
     */
    private String[] teacher_danger;
    /**
     * 教师已安排上课记录-不冲突
     */
    private String[] teacher_pass;
    /**
     * 实验室已安排上课记录-冲突
     */
    private String[] lab_danger;
    /**
     * 实验室已安排上课记录-不冲突
     */
    private String[] lab_pass;
    /**
     * 学生已安排上课记录-全部冲突
     */
    private String[] student_danger;
    /**
     * 学生已安排上课记录-部分冲突
     */
    private String[] student_warning;
    /**
     * 学生已安排上课记录-不冲突
     */
    private String[] student_pass;
    /**
     * 教务(关联课)已安排上课记录-冲突
     */
    private String[] correlationCourse_danger;
    /**
     * 教务课程已安排上课记录-冲突
     */
    private String[] educational_danger;
    /**
     * 教务上课记录周次-冲突
     */
    private String[] week_danger;
    /**
     * 教务上课记录星期-冲突
     */
    private String[] weekday_danger;
    /**
     * 实验室/设备预约记录-冲突
     */
    private String[] lab_reservation_danger;
    /**
     * 实验室/设备预约记录-不冲突
     */
    private String[] lab_reservation_pass;
    /**
     * 学生数量
     */
    private Integer studentCount;


}
