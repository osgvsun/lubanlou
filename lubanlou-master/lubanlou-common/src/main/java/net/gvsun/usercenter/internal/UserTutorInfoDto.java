package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserTutorInfoDto implements Serializable {
    private Long id;
    private String username;
    private String tutorCategory;
    private Integer professionalTutor;
    private Date receiveApprovalTime;
    private String receiveApprovalTimeFormat;

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

    public String getTutorCategory() {
        return tutorCategory;
    }

    public void setTutorCategory(String tutorCategory) {
        this.tutorCategory = tutorCategory;
    }

    public Integer getProfessionalTutor() {
        return professionalTutor;
    }

    public void setProfessionalTutor(Integer professionalTutor) {
        this.professionalTutor = professionalTutor;
    }

    public String getReceiveApprovalTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (receiveApprovalTimeFormat != null) {
            format = new SimpleDateFormat(receiveApprovalTimeFormat);
        }
        if (receiveApprovalTime != null)
            return format.format(receiveApprovalTime);
        else
            return null;
    }

    public void setReceiveApprovalTime(Date receiveApprovalTime) {
        this.receiveApprovalTime = receiveApprovalTime;
    }

    public void setReceiveApprovalTime(Date receiveApprovalTime, String format) {
        this.receiveApprovalTime = receiveApprovalTime;
        this.receiveApprovalTimeFormat = format;
    }
}
