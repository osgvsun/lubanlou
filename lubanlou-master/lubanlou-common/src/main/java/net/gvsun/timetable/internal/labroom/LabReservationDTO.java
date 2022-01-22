package net.gvsun.timetable.internal.labroom;

import lombok.Data;

import java.io.Serializable;
@Data
public class LabReservationDTO implements Serializable {
    private String labRoomName;//实验室名称
    private Integer currpage;//当前页
    private Integer pageSize;//每页显示数量
    private String acno;//学院编号
    private String username;//工号

}
