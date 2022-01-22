package net.gvsun.timetable.internal.reservation;

import lombok.Data;

import java.io.Serializable;
@Data
public class LabRoomStationReservationDTO implements Serializable {
    private Integer result;
    private String labRoomName;
    private Integer currpage;
    private Integer pageSize;
    private Integer isAudit;
    private String username;
    private String zuulServerUrl;
    private String academyNumber;

}
