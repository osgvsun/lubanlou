package net.gvsun.timetable.internal.labroom;

import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:46
*/
@Data
public class LabAnnexDTO implements Serializable {
    private Integer id;
    private  String labNumber;
    private  String labName;
    private String lanEnName;
    private String labShortName;
    private String labSubject;
    private String labDescription;
    private String labAttention;
    private String labCapacity;
    private String labUseArea;
    private String createdAt;

}
