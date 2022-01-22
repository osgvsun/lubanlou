package net.gvsun.timetable.internal.labroom;


import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LabCenterDTO implements Serializable {
    private Integer id;
    private  String centerNumber;
    private  String centerName;
}
