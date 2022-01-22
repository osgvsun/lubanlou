package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date 2018-11-20
 */
@Data
public class TimetableForInstrumentDTO implements Serializable {
    /**
     * 排课及预约占用开始时间
     */
    private String startDate;
    /**
     * 排课及预约占用结束时间
     */
    private String endDate;
    /**
     * 说明
     */
    private String description;
    /**
     * 设备编号
     */
    private String deviceNumber;
    /**
     * 实验室编号
     */
    private String labRoomId;

}
