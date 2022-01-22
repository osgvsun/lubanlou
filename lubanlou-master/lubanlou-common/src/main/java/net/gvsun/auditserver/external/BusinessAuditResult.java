package net.gvsun.auditserver.external;


import java.io.Serializable;

/**
 * Created by Administrator on 2018/8/20.
 */
public class BusinessAuditResult implements Serializable{
    //预约业务id
    private String businessAppId;
    //结果状态
    private String result;
    //所出审核级别--针对审核中状态
    private Integer level;

    public String getBusinessAppId() {
        return businessAppId;
    }

    public void setBusinessAppId(String businessAppId) {
        this.businessAppId = businessAppId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
