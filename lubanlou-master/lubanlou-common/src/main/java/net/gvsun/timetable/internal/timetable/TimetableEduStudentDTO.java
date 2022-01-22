package net.gvsun.timetable.internal.timetable;



import com.fasterxml.jackson.annotation.JsonFormat;


import lombok.Data;
import lombok.ToString;


import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ToString
/**
*  Description 排课及预约-保存传参对象
*
*  @author weicheng
*  @date 2020/6/30 7:26
*/
public class TimetableEduStudentDTO implements Serializable {
    /**
     * 教学班编号
     */
    String courseNo;
    /**
     * 学生
     */
    String student;
    /**
     * 星期几
     */
    Integer weekday;
    /**
     * 起始周
     */
    Integer startWeek;
    /**
     * 结束周
     */
    Integer endWeek;
    /**
     * 开始节次
     */
    Integer startClass;
    /**
     * 结束节次
     */
    Integer endClass;
}
