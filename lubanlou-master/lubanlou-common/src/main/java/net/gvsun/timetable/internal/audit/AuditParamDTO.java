package net.gvsun.timetable.internal.audit;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description 审核-保存审核参数对象
 *
 * @author 陈乐为 2019-1-9
 */
@Data
@ToString
public class AuditParamDTO implements Serializable {
    /**
     * 业务主表主键
     */
    private String businessUid;
    /**
     * 业务预约主键
     */
    private String businessAppUid;
    /**
     * 业务类型
     */
    private String businessType;
    /**
     * 审核备注
     */
    private String info;
    /**
     * 审核结果
     */
    private int result;
    /**
     * 审核阶段结果
     */
    private String statusResult;
    /**
     * 业务预约主键 --
     */
    private String appointmentId;
    /**
     * 用户工号
     */
    private String username;
    /**
     * 网关地址
     */
    private String zuulServerUrl;
    private String createdBy;

}
