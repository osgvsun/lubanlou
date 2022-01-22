package net.gvsun.timetable.internal.labroom;

import lombok.Data;

import java.io.Serializable;
@Data
public class ParamLabSettingDTO implements Serializable{

    private Integer labRoomId;
    private Integer page;
    private Integer type;
    private Integer isAppointment;
    private Integer needAudit;
    private String[] realAllAudits;
    private String[] academies;
    private String[] authorities;
    private Integer labRoomWorker;
    private Integer needLoan;
    private Integer needAllowSecurityAccess;
    private Integer needExam;
    private boolean flag;


}
