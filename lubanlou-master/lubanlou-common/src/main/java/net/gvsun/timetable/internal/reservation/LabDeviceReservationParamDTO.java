package net.gvsun.timetable.internal.reservation;




import java.io.Serializable;

import lombok.Data;

/**
 * Descriptions：实验室设备预约-传参对象
 *
 * @author Hezhaoyi 2019-2-28
 */
@Data
public class LabDeviceReservationParamDTO implements Serializable {
    /**
     * 设备id
     */
    private int equinemtid;
    /**
     * 开始时间
     */
    private String startDate;
    /**
     * 结束时间
     */
    private String endDate;
    /**
     * 联系电话
     */
    private String phone;
    /**
     * 备注
     */
    private String description;
    /**
     * 导师
     */
    private String teacher;
    /**
     * 申请人
     */
    private String applyUserName;
    /**
     * 项目名称
     */
    private String project;
    /**
     * 审核微服务地址
     */
    private String zuulServerUrl;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 预约性质
     */
    private int property;


}
