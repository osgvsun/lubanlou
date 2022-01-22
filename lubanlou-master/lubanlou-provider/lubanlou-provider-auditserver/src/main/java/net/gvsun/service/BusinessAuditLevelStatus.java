package net.gvsun.service;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Administrator on 2018/8/20.
 */
public class BusinessAuditLevelStatus implements Serializable{
    //预约业务id
    private String businessAppId;
    //审核级别
    private int level;
    //该级审核结果
    private String result;
    //审核人
    private String auditUser;
    //审核等级
    private String authName;
    //备注
    private String info;
    //创建时间
    private String createTime;

    public String getAuthName() {
        return authName;
    }

    public void setAuthName(String authName) {
        this.authName = authName;
    }

    public String getBusinessAppId() {
        return businessAppId;
    }

    public void setBusinessAppId(String businessAppId) {
        this.businessAppId = businessAppId;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getAuditUser() {
        return auditUser;
    }

    public void setAuditUser(String auditUser) {
        this.auditUser = auditUser;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
