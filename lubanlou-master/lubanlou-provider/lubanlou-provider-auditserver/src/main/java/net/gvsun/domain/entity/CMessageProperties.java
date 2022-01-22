package net.gvsun.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "c_message_properties")
public class CMessageProperties {
    private int id;
    private String projectName;
    private String businessConfigItem;
    private String businessConfigStatus;
    private String info;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    @Basic
    @Column(name = "project_name")
    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    @Basic
    @Column(name = "business_config_item")
    public String getBusinessConfigItem() {
        return businessConfigItem;
    }

    public void setBusinessConfigItem(String businessConfigItem) {
        this.businessConfigItem = businessConfigItem;
    }
    @Basic
    @Column(name = "business_config_status")
    public String getBusinessConfigStatus() {
        return businessConfigStatus;
    }

    public void setBusinessConfigStatus(String businessConfigStatus) {
        this.businessConfigStatus = businessConfigStatus;
    }
    @Basic
    @Column(name = "info")
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
