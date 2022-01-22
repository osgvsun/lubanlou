package net.gvsun.timetable.internal.iot;

import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 11:23
*/
@Data
public class AgentIotDTO implements Serializable {
    String id;
    String cardno;
    String username;
    String cname;
    String starttime;
    String endtime;
    Integer isAdmin;
    Integer deviceindex;

}