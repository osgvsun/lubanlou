package net.gvsun.domain.entity;

import javax.persistence.*;

@Entity
@Table(name="c_message_properties_extend")
public class CMessagePropertiesExtend {
    private int id;
    private String projectName;
    private String businessConfigItem;
    private String businessConfigItemExtend;
    private String businessConfigExtendStatus;
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
    @Column(name = "business_config_item_extend")
    public String getBusinessConfigItemExtend() {
        return businessConfigItemExtend;
    }

    public void setBusinessConfigItemExtend(String businessConfigItemExtend) {
        this.businessConfigItemExtend = businessConfigItemExtend;
    }

    @Basic
    @Column(name = "business_config_extend_status")
    public String getBusinessConfigExtendStatus() {
        return businessConfigExtendStatus;
    }

    public void setBusinessConfigExtendStatus(String businessConfigExtendStatus) {
        this.businessConfigExtendStatus = businessConfigExtendStatus;
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
