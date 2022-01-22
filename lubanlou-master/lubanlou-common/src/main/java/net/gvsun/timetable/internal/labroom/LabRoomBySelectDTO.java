package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description DTO-下拉框获取实验室的DTO参数DTO
*
*  @author weicheng
*  @date 2021/1/22 21:51
*/
@Data
@ToString
public class LabRoomBySelectDTO implements Serializable {
    String academyNumber;
    String search;
    String soft;
    int term;
    int weekday;
    String classes;
    String weeks;

    String courseDetailNo;
    String weekdays;
    String startDate;
    String endDate;
    String startTime;
    String endTime;

    private String createdBy;
    private String role;
}
