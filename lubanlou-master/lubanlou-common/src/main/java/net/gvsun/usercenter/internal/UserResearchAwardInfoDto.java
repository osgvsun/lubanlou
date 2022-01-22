package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserResearchAwardInfoDto implements Serializable {
    private Long id;
    private String productName;
    private String awardName;
    private String awardFromUnit;
    private String degree;
    private Date time;
    private String timeFormat;
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

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getAwardName() {
        return awardName;
    }

    public void setAwardName(String awardName) {
        this.awardName = awardName;
    }

    public String getAwardFromUnit() {
        return awardFromUnit;
    }

    public void setAwardFromUnit(String awardFromUnit) {
        this.awardFromUnit = awardFromUnit;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (timeFormat != null) {
            format = new SimpleDateFormat(timeFormat);
        }
        if (time != null)
            return format.format(time);
        else
            return null;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setTime(Date time, String format) {
        this.time = time;
        this.timeFormat = format;
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
