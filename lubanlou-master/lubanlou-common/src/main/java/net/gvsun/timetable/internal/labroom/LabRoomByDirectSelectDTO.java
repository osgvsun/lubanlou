package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@ToString
public class LabRoomByDirectSelectDTO implements Serializable {
    String academyNumber;
    private String search;
    private String soft;
    private String courseNo;
    private String createdBy;
    private String role;

}
