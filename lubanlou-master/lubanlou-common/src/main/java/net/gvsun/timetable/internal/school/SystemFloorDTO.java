package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class SystemFloorDTO implements Serializable {
    private Integer id;
    /**
     * 楼层编号
     */
    private Integer floorNo;
    /**
     * 楼层名称
     */
    private String floorName;
    /**
     * 楼宇编号
     */
    private String buildNumber;
    private String authorityName;
    private String username;

}
