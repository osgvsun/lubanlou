package net.gvsun.iot.external;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Description 刷卡记录表
 *
 * @author 李涵
 * @since 2020/7/27 10:17
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonHdwlogDTO {
    // 存在Iot表中之后，生成的id
    Integer id;

    /**
     * 卡号
     */
    String cardNumber;

    /**
     * 用户中文名
     */
    String cardName;

    /**
     * 物联ip
     */
    String hardwareIp;

    /**
     * 刷卡状态
     */
    String status;

    /**
     * 刷卡状态位:0：失败；1：成功（打开）（默认成功）；2：成功（关闭）
     */
    Integer statusType;

    /**
     * 刷卡时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime dateTime;

    /**
     * username 用户名
     */
    String username;

    /**
     * 人脸考勤定位坐标
     */
    String address;

    /**
     * 机器类型：548：门禁;550：电源控制器
     */
    Integer hardwareType;

    /**
     * 机器MAC地址
     */
    String source;

    /**
     * 考勤机型号
     */
    Integer attTypeId;

    /**
     * 门号，设备下第几路
     */
    Integer deviceIndex;

    /**
     * 考勤数据来源
     */
    String attDataSource;

    /**
     * 考勤偏差距离
     */
    String attDeviation;

    /**
     * 考勤教室信息
     */
    String attRoom;

    /**
     * 考勤目标地址
     */
    String attDestination;
}
