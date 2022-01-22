package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserAdministrationInfoDto implements Serializable {
    private Long id;
    private String username;
    private String administrationDuty;
    private Date appointmentTime;
    private String appointmentTimeFormat;
    private String researchDirection;

    public String getResearchDirection() {
        return researchDirection;
    }

    public void setResearchDirection(String researchDirection) {
        this.researchDirection = researchDirection;
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

    public String getAdministrationDuty() {
        return administrationDuty;
    }

    public void setAdministrationDuty(String administrationDuty) {
        this.administrationDuty = administrationDuty;
    }

    public String getAppointmentTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (appointmentTimeFormat != null) {
            format = new SimpleDateFormat(appointmentTimeFormat);
        }
        if (appointmentTime != null)
            return format.format(appointmentTime);
        else
            return null;
    }

    public void setAppointmentTime(Date appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public void setAppointmentTime(Date appointmentTime, String format) {
        this.appointmentTime = appointmentTime;
        this.appointmentTimeFormat = format;
    }
}
