package net.gvsun.timetable.internal.device;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 设备维修参数对象
*
*  @author lay
*  @date 2020/10/20 14:33
*/
@Data
@ToString
public class DeviceRepairParamDTO implements Serializable {
    /**
     * 设备维修阶段
     */
    private Integer auditStage;
    /**
     * 查询参数
     */
    private String search;
    /**
     * 排序字段
     */
    private String sort;
    /**
     * 时间参数
     */
    private String order;
    /**
     * 时间参数
     */
    private String startTime;
    /**
     * 时间参数
     */
    private String endTime;
    /**
     * 未知参数
     */
    private int length;
    /**
     * 学院参数
     */
    private String academyNumber;
    /**
     * 分页参数-当前页
     */
    private int offset;
    /**
     * 分页参数-每页记录数
     */
    private int limit;
    /**
     * 权限参数
     */
    private String role;
    /**
     * 用户名参数
     */
    private String username;
}
