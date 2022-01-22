package net.gvsun.timetable.internal.timetable;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author ：魏诚
 * @date  2018-09-04
 */
@Data
@ToString
public class TimetableTeachTrainDTO implements Serializable {
    private Integer id;
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime startTime;
    /**
     * 结束时间
     */
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime endTime;
    /**
     * 开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate startDate;
    /**
     * 结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate endDate;

    String labs;

    String weekdays;

    String text;
    String details;
}
