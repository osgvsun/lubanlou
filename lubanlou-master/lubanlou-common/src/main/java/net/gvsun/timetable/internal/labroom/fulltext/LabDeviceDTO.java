package net.gvsun.timetable.internal.labroom.fulltext;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class LabDeviceDTO implements Serializable {

    /**
     * 设备编号
     */
    String deviceNumber;
    /**
     * 设备名称
     */
    String deviceName;


}
