package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserTrainInfoDto implements Serializable {
    private Long id;
    private String username;
    private String address;
    private Date trainStartTime;
    private String trainStartTimeFormat;
    private Date trainEndTime;
    private String trainEndTimeFormat;
    private Integer overseasExperience;
    private String trainInfo;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTrainStartTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (trainStartTimeFormat != null) {
            format = new SimpleDateFormat(trainStartTimeFormat);
        }
        if (trainStartTime != null)
            return format.format(trainStartTime);
        else
            return null;
    }

    public void setTrainStartTime(Date trainStartTime) {
        this.trainStartTime = trainStartTime;
    }

    public void setTrainStartTime(Date trainStartTime, String format) {
        this.trainStartTime = trainStartTime;
        this.trainStartTimeFormat = format;
    }

    public String getTrainEndTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (trainEndTimeFormat != null) {
            format = new SimpleDateFormat(trainEndTimeFormat);
        }
        if (trainEndTime != null)
            return format.format(trainEndTime);
        else
            return null;
    }

    public void setTrainEndTime(Date trainEndTime) {
        this.trainEndTime = trainEndTime;
    }

    public void setTrainEndTime(Date trainEndTime, String format) {
        this.trainEndTime = trainEndTime;
        this.trainEndTimeFormat = format;
    }

    public Integer getOverseasExperience() {
        return overseasExperience;
    }

    public void setOverseasExperience(Integer overseasExperience) {
        this.overseasExperience = overseasExperience;
    }

    public String getTrainInfo() {
        return trainInfo;
    }

    public void setTrainInfo(String trainInfo) {
        this.trainInfo = trainInfo;
    }
}
