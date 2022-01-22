package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserEducationAwardInfoDto implements Serializable {
    private Long id;
    private String awardName;
    private String awardDegree;
    private String awardFromUnit;
    private Date awardTime;
    private String awardTimeFormat;
    private Integer personRank;
    private String fileIds;
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

    public String getAwardName() {
        return awardName;
    }

    public void setAwardName(String awardName) {
        this.awardName = awardName;
    }

    public String getAwardDegree() {
        return awardDegree;
    }

    public void setAwardDegree(String awardDegree) {
        this.awardDegree = awardDegree;
    }

    public String getAwardFromUnit() {
        return awardFromUnit;
    }

    public void setAwardFromUnit(String awardFromUnit) {
        this.awardFromUnit = awardFromUnit;
    }

    public String getAwardTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (awardTimeFormat != null) {
            format = new SimpleDateFormat(awardTimeFormat);
        }
        if (awardTime != null)
            return format.format(awardTime);
        else
            return null;
    }

    public void setAwardTime(Date awardTime) {
        this.awardTime = awardTime;
    }

    public void setAwardTime(Date awardTime, String format) {
        this.awardTime = awardTime;
        this.awardTimeFormat = format;
    }

    public Integer getPersonRank() {
        return personRank;
    }

    public void setPersonRank(Integer personRank) {
        this.personRank = personRank;
    }


    public String getFileIds() {
        return fileIds;
    }

    public void setFileIds(String fileIds) {
        this.fileIds = fileIds;
    }
}
