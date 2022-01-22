package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Description
 *
 * @author Hezhaoyi
 * @date 2021/2/18 16:57
 */
@Data
public class StatisticsByTeacherClassHourDTO implements Serializable {

    private String teacherName;
    private int totalClassHour;
    private List classHourOfCourse;


}
