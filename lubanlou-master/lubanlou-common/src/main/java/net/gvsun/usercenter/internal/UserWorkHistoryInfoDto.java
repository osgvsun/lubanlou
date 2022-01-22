package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserWorkHistoryInfoDto implements Serializable {
    private Long id;
    private String username;
    private String workUnit;
    private String nation;
    private String professionalPost;
    private String administrativePost;
    private String technology;
    private Date workStartTime;
    private String workStartTimeFormat;
    private Date workEndTime;
    private String workEndTimeFormat;
    private Integer selfSetting;

    public Integer getSelfSetting() {
        return selfSetting;
    }

    public void setSelfSetting(Integer selfSetting) {
        this.selfSetting = selfSetting;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getWorkUnit() {
        return workUnit;
    }

    public void setWorkUnit(String workUnit) {
        this.workUnit = workUnit;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getProfessionalPost() {
        return professionalPost;
    }

    public void setProfessionalPost(String professionalPost) {
        this.professionalPost = professionalPost;
    }

    public String getAdministrativePost() {
        return administrativePost;
    }

    public void setAdministrativePost(String administrativePost) {
        this.administrativePost = administrativePost;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public String getWorkStartTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (workStartTimeFormat != null) {
            format = new SimpleDateFormat(workStartTimeFormat);
        }
        if (workStartTime != null)
            return format.format(workStartTime);
        else
            return null;
    }

    public void setWorkStartTime(Date workStartTime) {
        this.workStartTime = workStartTime;
    }

    public void setWorkStartTime(Date workStartTime, String format) {
        this.workStartTime = workStartTime;
        this.workStartTimeFormat = format;
    }

    public String getWorkEndTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (workEndTimeFormat != null) {
            format = new SimpleDateFormat(workEndTimeFormat);
        }
        if (workEndTime != null)
            return format.format(workEndTime);
        else
            return null;
    }

    public void setWorkEndTime(Date workEndTime) {
        this.workEndTime = workEndTime;
    }

    public void setWorkEndTime(Date workEndTime, String format) {
        this.workEndTime = workEndTime;
        this.workEndTimeFormat = format;
    }
}
