package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserHorizontalSubjectInfoDto implements Serializable {
    private Long id;
    private String projectName;
    private String category;
    private String degree;
    private String projectSource;
    private String approvalNum;
    private Date startTime;
    private String startTimeFormat;
    private Date endTime;
    private String endTimeFormat;
    private String projectLeader;
    private Integer personRank;
    private Double contractValue;
    private String fileIds;
    private Integer selfSetting;

    public Integer getSelfSetting() {
        return selfSetting;
    }

    public void setSelfSetting(Integer selfSetting) {
        this.selfSetting = selfSetting;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProjectSource() {
        return projectSource;
    }

    public void setProjectSource(String projectSource) {
        this.projectSource = projectSource;
    }

    public String getApprovalNum() {
        return approvalNum;
    }

    public void setApprovalNum(String approvalNum) {
        this.approvalNum = approvalNum;
    }

    public String getStartTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (startTimeFormat != null) {
            format = new SimpleDateFormat(startTimeFormat);
        }
        if (startTime != null)
            return format.format(startTime);
        else
            return null;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setStartTime(Date startTime, String format) {
        this.startTime = startTime;
        this.startTimeFormat = format;
    }

    public String getEndTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (endTimeFormat != null) {
            format = new SimpleDateFormat(endTimeFormat);
        }
        if (endTime != null)
            return format.format(endTime);
        else
            return null;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setEndTime(Date endTime, String format) {
        this.endTime = endTime;
        this.endTimeFormat = format;
    }

    public String getProjectLeader() {
        return projectLeader;
    }

    public void setProjectLeader(String projectLeader) {
        this.projectLeader = projectLeader;
    }

    public Integer getPersonRank() {
        return personRank;
    }

    public void setPersonRank(Integer personRank) {
        this.personRank = personRank;
    }

    public Double getContractValue() {
        return contractValue;
    }

    public void setContractValue(Double contractValue) {
        this.contractValue = contractValue;
    }

    public String getFileIds() {
        return fileIds;
    }

    public void setFileIds(String fileIds) {
        this.fileIds = fileIds;
    }
}
