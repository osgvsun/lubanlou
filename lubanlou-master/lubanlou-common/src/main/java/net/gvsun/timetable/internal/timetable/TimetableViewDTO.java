package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class TimetableViewDTO implements Serializable {
    /**
     * 教务教学班编号
     */
    private String courseNo;
    /**
     * 自主教学班编号
     */
    private String selfId;
    /**
     * timetable
     */
    private List<TimetableDTO> timetables;
    /**
     * 课程编号
     */
    private String courseNumber;
    /**
     * 课程名称
     */
    private String courseName;
    /**
     * 状态
     */
    private int status;
    /**
     * 类型
     */
    private int timetableStyle;


}
