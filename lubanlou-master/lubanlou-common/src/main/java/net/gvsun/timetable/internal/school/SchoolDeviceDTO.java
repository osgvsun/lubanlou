package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
*  Description 资产VO
*
*  @author weicheng
*  @date 2021/2/18 11:19
*/
@Data
public class SchoolDeviceDTO implements Serializable{
    /**
     * 仪器编号
     */
    private String deviceNumber;
    /**
     * 仪器名称
     */
    private String deviceName;
    /**
     *仪器型号
     */
    private String devicePattern;
    /**
     *仪器规格
     */
    private String deviceFormat;
    /**
     *仪器地址
     */
    private String deviceAddress;
    /**
     * 仪器价格
     */
    private String devicePrice;
    /**
     * 国别
     */
    private String deviceCountry;
    /**
     * 入账日期
     */
    private String deviceAccountedDate;
    /**
     * 仪器供应商
     */
    private String deviceSupplier;
    /**
     * 所属实验室id
     */
    private Integer roomId;

}

