package net.gvsun.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Administrator on 2018/8/14.
 */
@Entity
@Table(name = "business_audit_level_result")
public class BusinessAuditLevelResult {
    private String uid;
    private String statusId;
    private String result;
    private int auditLevel;
    private String auditLevelName;
    private String info;
    private String createUser;
    private Date createTime;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "uid")
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "status_id")
    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    @Basic
    @Column(name = "result")
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Basic
    @Column(name = "audit_level")
    public int getAuditLevel() {
        return auditLevel;
    }

    public void setAuditLevel(int auditLevel) {
        this.auditLevel = auditLevel;
    }

    @Basic
    @Column(name = "audit_level_name")
    public String getAuditLevelName() {
        return auditLevelName;
    }

    public void setAuditLevelName(String auditLevelName) {
        this.auditLevelName = auditLevelName;
    }

    @Basic
    @Column(name = "info")
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Basic
    @Column(name = "create_user")
    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="create_time")
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
