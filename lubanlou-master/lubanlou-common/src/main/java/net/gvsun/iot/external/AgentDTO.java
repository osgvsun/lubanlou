package net.gvsun.iot.external;
import lombok.Data;

/**
 *
 * @Description 物联设备DTO
 *
 * @author SmarkLee
 * @Date 2021/10/8 9:04
 * @return 
 **/
@Data
public class AgentDTO {
    /**
     * 设备sn码（针对庚商公司物联部门没用设备sn，用的是设备mac地址）
     */
    String agentSn;
    /**
     *  物联设备编号
     */
    String hardwareNumber;
    /**
     * 物联名称
     */
    String hardwareName;
    /**
     *  物联ip
     */
    String hardwareIp;
    /**
     * 物联类型（实验室管理系统中字典表类型为c_agent_type的id）
     */
    Integer hardwareType;
    /**
     * 物联版本
     */
    String hardwareVersion;
    /**
     *  物联型号
     */
    String hardwareModule;
    /**
     *  物联MAC地址
     */
    String hardwareMac;

    /**
     *  设备关联房间号
     */
    String roomNumber;
    /**
     * 设备关联的房间名称
     */
    String roomName;
    /**
     * 制造商
     */
    String manufacturer;
    /**
     * 读卡类型（韦根26/34）
     */
    Integer cardType;
    /**
     *  学院编号
     */
    String academyNumber;
    /**
     *  实验中心编号
     */
    String labCenterNumber;
    /**
     *  表内相关（默认为空）
     */
    String relation;

    /**
     * 服务器mac地址
     */
    String serverMac;

    /**
     * 服务器mac地址
     */
    String serverIp;

    /**
     * 设备第几路
     */
    Integer index;
    /**
     * 设备分路id
     */
    Integer agentIndexId;
}