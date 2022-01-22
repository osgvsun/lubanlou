package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：接口服务方法-大仪设备占用查询的参数DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class TimetableForInstrumentParamDTO implements Serializable {
    /**
     * 设备编号（主键）
     */
    private String deviceNumber;
    /**
     * 授课实验室
     */
    private int labRoomId;
    /**
     * 欲查询起始时间
     */
    private String startDate;
    /**
     * 欲查询结束时间
     */
    private String endDate;


}
