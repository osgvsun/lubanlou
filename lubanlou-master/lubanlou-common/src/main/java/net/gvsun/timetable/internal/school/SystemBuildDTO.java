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
public class SystemBuildDTO implements Serializable {
    /**
     * 楼宇编号
     */
    private String buildNumber;
    /**
     * 楼宇名称
     */
    private String buildName;


}
