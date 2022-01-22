package net.gvsun.timetable.internal.iot;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalTime;

/**
*  Description 获取工位仪的排课信息对象
*
*  @author weicheng
*  @date 2021/2/17 15:56
*/
@Data
public class IotTimetableDTO implements Serializable {
    private int appointmentId;
    private int sameId;
    private int timetableStyle;
    private String courseNo;
    private String hardwareIp;
    private String courseName;
    private String courseNumber;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;
    private String concatLab;
    private String concatTeacher;
    private String concatItem;
    private String concatDate;
    private String concatStudent;
}
