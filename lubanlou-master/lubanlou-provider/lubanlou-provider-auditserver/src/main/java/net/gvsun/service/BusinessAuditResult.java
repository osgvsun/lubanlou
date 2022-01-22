package net.gvsun.service;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Administrator on 2018/8/20.
 */
@Data
public class BusinessAuditResult implements Serializable{
    //预约业务id
    private String businessAppId;
    //结果状态
    private String result;
    //所出审核级别--针对审核中状态
    private Integer level;

    private List<BusinessAuditLevelStatus> businessAuditLevelStatusList;

}
