package net.gvsun.iot.external;

import lombok.Data;
import net.gvsun.common.EntityTypeEnum;

import java.util.List;

/**
 * @description IOT服务查询参数
 * @author  SmarkLee
 * @date  2021/8/9
 * @return
 **/
@Data
public class IotParameter {
    /**
     * 设备主键sn
     */
    String agentSn;
    /**
     * 服务器主键mac地址
     */
    String serverMac;
    List<String> usernames;
    String username;
    String beginDateTime;
    String endDateTime;
    String hardwareIp;
    List<String> hardwareIps;
    Integer hardwareType;
    Float attDeviation;
    /**
     * 主体id
     */
    String entityId;
    /**
     * 主体类型(DEV(设备)/LAB(实验室)/STA(工位)等等)
     */
    EntityTypeEnum entityType;

    /**
     * 服务器ip
     */
    String serverIp;

    /**
     * 设备分路id
     */
    Integer agentIndexId;
    /**
     * 排序字段
     */
    OrderColumnEnum orderColumn;
    /**
     * 分组字段
     */
    GroupColumnEnum groupColumn;
    /**
     * 逆序排序（true则正序排序，false则逆序排序，null则不排序）
     */
    Boolean isAsc;
    /**
     * 分页参数
     */
    Long page;
    Long size;
}
