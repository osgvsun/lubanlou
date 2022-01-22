package net.gvsun.domain.entity;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2018/8/14.
 */
@Entity
@Table(name = "business_audit_config")
public class BusinessAuditConfig {
    private int uid;
    private String authId;
    private int auditLevel;
    private String type;


    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    @Column(name = "uid")
    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "auth_id")
    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
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
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
