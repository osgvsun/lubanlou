package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserEdubgInfoDto implements Serializable {
    private Long id;
    private String username;
    private String school;
    private String nation;
    private String degree;
    private String educationBackground;
    private String specialty;
    private Date enrollmentTime;
    private String enrollmentTimeFormat;
    private Date graduationTime;
    private String graduationTimeFormat;
    private Integer overseasDegree;
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

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getEducationBackground() {
        return educationBackground;
    }

    public void setEducationBackground(String educationBackground) {
        this.educationBackground = educationBackground;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getEnrollmentTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (enrollmentTimeFormat != null) {
            format = new SimpleDateFormat(enrollmentTimeFormat);
        }
        if (enrollmentTime != null)
            return format.format(enrollmentTime);
        else
            return null;
    }

    public void setEnrollmentTime(Date enrollmentTime) {
        this.enrollmentTime = enrollmentTime;
    }

    public void setEnrollmentTime(Date enrollmentTime, String format) {
        this.enrollmentTime = enrollmentTime;
        this.enrollmentTimeFormat = format;
    }

    public String getGraduationTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        if (graduationTimeFormat != null) {
            format = new SimpleDateFormat(graduationTimeFormat);
        }
        if (graduationTime != null)
            return format.format(graduationTime);
        else
            return null;
    }

    public void setGraduationTime(Date graduationTime) {
        this.graduationTime = graduationTime;
    }

    public void setGraduationTime(Date graduationTime, String format) {
        this.graduationTime = graduationTime;
        this.graduationTimeFormat = format;
    }

    public Integer getOverseasDegree() {
        return overseasDegree;
    }

    public void setOverseasDegree(Integer overseasDegree) {
        this.overseasDegree = overseasDegree;
    }
}
