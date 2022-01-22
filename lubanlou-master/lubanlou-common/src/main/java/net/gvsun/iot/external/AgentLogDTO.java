package net.gvsun.iot.external;
import lombok.Data;

/**
 *
 * @Description 物联设备日志DTO
 * @author SmarkLee
 * @Date 2021/10/8 9:04
 * @return 
 **/
@Data
public class AgentLogDTO {
    /**
     * 设备sn码（针对庚商公司物联部门没用设备sn，用的是设备mac地址）
     */
    String agentSn;

    /**
     * 设备状态（0：离线；1：在线）
     */
    Integer agentStatus;

    /**
     * 状态变更时间
     */
    String updatedTime;
}