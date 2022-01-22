package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserAuthorizedPatentInfoDto implements Serializable {
    private Long id;
    private String patentName;
    private String patentNum;
    private String nation;
    private String patentTerm;
    private Date patentTime;
    private String patentTimeFormat;
    private Integer personRank;
    private Integer transformSituation;
    private Double transferAmount;
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

    public String getPatentName() {
        return patentName;
    }

    public void setPatentName(String patentName) {
        this.patentName = patentName;
    }

    public String getPatentNum() {
        return patentNum;
    }

    public void setPatentNum(String patentNum) {
        this.patentNum = patentNum;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPatentTerm() {
        return patentTerm;
    }

    public void setPatentTerm(String patentTerm) {
        this.patentTerm = patentTerm;
    }

    public String getPatentTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        if (patentTimeFormat != null) {
            format = new SimpleDateFormat(patentTimeFormat);
        }
        if (patentTime != null)
            return format.format(patentTime);
        else
            return null;
    }

    public void setPatentTime(Date patentTime) {
        this.patentTime = patentTime;
    }

    public void setPatentTime(Date patentTime, String format) {
        this.patentTime = patentTime;
        this.patentTimeFormat = format;
    }

    public Integer getPersonRank() {
        return personRank;
    }

    public void setPersonRank(Integer personRank) {
        this.personRank = personRank;
    }

    public Integer getTransformSituation() {
        return transformSituation;
    }

    public void setTransformSituation(Integer transformSituation) {
        this.transformSituation = transformSituation;
    }

    public Double getTransferAmount() {
        return transferAmount;
    }

    public void setTransferAmount(Double transferAmount) {
        this.transferAmount = transferAmount;
    }
}
