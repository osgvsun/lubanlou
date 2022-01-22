package net.gvsun.timetable.internal.device;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 实验设备参数对象
*
*  @author lay
*  @date 2021/07/20 14:33
*/
@Data
@ToString
public class SchoolDeviceDTO implements Serializable {
    /**
     * 项目设备关联表id
     */
    private Integer id;
    /**
     * 设备类型
     */
    private String deviceType;
    /**
     * 设备编号
     */
    private String deviceNumber;
    /**
     * 设备名称
     */
    private String deviceName;
    /**
     * 规格
     */
    private String deviceFormat;
    /**
     * 型号
     */
    private String devicePattern;
    /**
     * 单价
     */
    private String devicePrice;

}
