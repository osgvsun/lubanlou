package net.gvsun.timetable.internal.labroom.fulltext;

import lombok.Data;
import net.gvsun.timetable.internal.labroom.CommonServer;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LabAgentDTO implements Serializable {
    Integer id;
    /**
     * 硬件名称
     */
    String hardwareName;

    /**
     * 硬件ip
     */
    String hardwareIp;
    /**
     * 服务器
     */
    CommonServer commonServer;
    /**
     * 电表号
     */
    String snNo;
    /**
     * 门号
     */
    Integer doorIndex;
    /**
     * 规格
     */
    String hareWareModule;
    /**
     * 版本号
     */
    String hardWareVersion;
    Integer hardwareType;

    /**
     * 制造商
     */
    String manufactor;
    Integer serverId;
    String mobileUrl;
    String pcUrl;
    String pcUrlFlv;
    /**
     * 服务器ip
     */
    String serverIp;
    /**
     * 服务器端口
     */
    String serverSn;
    /**
     * 新旧版
     */
    boolean newVersion;

}
