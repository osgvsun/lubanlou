package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserAcademicInfoDto implements Serializable {
    private Long id;
    private String username;
    private String academicParttime;
    private Date startTime;
    private String startTimeFormat;
    private Date endTime;
    private String endTimeFormat;
    private String country;
    private String institution;
    private String major;

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

    public String getAcademicParttime() {
        return academicParttime;
    }

    public void setAcademicParttime(String academicParttime) {
        this.academicParttime = academicParttime;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
