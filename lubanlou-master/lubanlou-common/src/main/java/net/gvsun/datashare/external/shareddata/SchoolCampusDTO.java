package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolCampusDTO extends Recordable implements Shared {

    private String campusNumber;
    private String campusName;
    private Integer campusDefault;
    private String picUrl;
    private String date;

    public String getCampusNumber() {
        return campusNumber;
    }

    public void setCampusNumber(String campusNumber) {
        this.campusNumber = campusNumber;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public Integer getCampusDefault() {
        return campusDefault;
    }

    public void setCampusDefault(Integer campusDefault) {
        this.campusDefault = campusDefault;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
