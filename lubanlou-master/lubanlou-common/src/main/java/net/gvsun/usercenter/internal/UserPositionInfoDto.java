package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;


public class UserPositionInfoDto implements Serializable {
    private Long id;
    private String profession;
    private String officialRank;
    private String jobRank;
    private String jobCategory;
    private Date upgradeTime;
    private String upgradeTimeFormat;
    private String username;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getOfficialRank() {
        return officialRank;
    }

    public void setOfficialRank(String officialRank) {
        this.officialRank = officialRank;
    }

    public String getJobRank() {
        return jobRank;
    }

    public void setJobRank(String jobRank) {
        this.jobRank = jobRank;
    }

    public String getJobCategory() {
        return jobCategory;
    }

    public void setJobCategory(String jobCategory) {
        this.jobCategory = jobCategory;
    }

    public String getUpgradeTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (upgradeTimeFormat != null) {
            format = new SimpleDateFormat(upgradeTimeFormat);
        }
        if (upgradeTime != null)
            return format.format(upgradeTime);
        else
            return null;
    }

    public void setUpgradeTime(Date upgradeTime) {
        this.upgradeTime = upgradeTime;
    }

    public void setUpgradeTime(Date upgradeTime, String format) {
        this.upgradeTime = upgradeTime;
        this.upgradeTimeFormat = format;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
