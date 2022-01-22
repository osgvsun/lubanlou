package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserEducationProjectInfoDto implements Serializable {
    private Long id;
    private String username;
    private String projectName;
    private String projectNature;
    private String projectNum;
    private String projectLeader;
    private String projectSource;
    private Date projectStartTime;
    private String projectStartTimeFormat;
    private Date projectEndTime;
    private String projectEndTimeFormat;
    private Integer projectPersonRank;
    private String degree;
    private String fileIds;
    private Double totalMoney;
    private Integer selfSetting;

    public Double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
    }

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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectNature() {
        return projectNature;
    }

    public void setProjectNature(String projectNature) {
        this.projectNature = projectNature;
    }

    public String getProjectNum() {
        return projectNum;
    }

    public void setProjectNum(String projectNum) {
        this.projectNum = projectNum;
    }

    public String getProjectLeader() {
        return projectLeader;
    }

    public void setProjectLeader(String projectLeader) {
        this.projectLeader = projectLeader;
    }

    public String getProjectSource() {
        return projectSource;
    }

    public void setProjectSource(String projectSource) {
        this.projectSource = projectSource;
    }

    public String getProjectStartTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (projectStartTimeFormat != null) {
            format = new SimpleDateFormat(projectStartTimeFormat);
        }
        if (projectStartTime != null)
            return format.format(projectStartTime);
        else
            return null;
    }

    public void setProjectStartTime(Date projectStartTime) {
        this.projectStartTime = projectStartTime;
    }

    public void setProjectStartTime(Date projectStartTime, String format) {
        this.projectStartTime = projectStartTime;
        this.projectStartTimeFormat = format;
    }

    public String getProjectEndTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (projectEndTimeFormat != null) {
            format = new SimpleDateFormat(projectEndTimeFormat);
        }
        if (projectEndTime != null)
            return format.format(projectEndTime);
        else
            return null;
    }

    public void setProjectEndTime(Date projectEndTime) {
        this.projectEndTime = projectEndTime;
    }

    public void setProjectEndTime(Date projectEndTime, String format) {
        this.projectEndTime = projectEndTime;
        this.projectEndTimeFormat = format;
    }

    public Integer getProjectPersonRank() {
        return projectPersonRank;
    }

    public void setProjectPersonRank(Integer projectPersonRank) {
        this.projectPersonRank = projectPersonRank;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFileIds() {
        return fileIds;
    }

    public void setFileIds(String fileIds) {
        this.fileIds = fileIds;
    }
}
