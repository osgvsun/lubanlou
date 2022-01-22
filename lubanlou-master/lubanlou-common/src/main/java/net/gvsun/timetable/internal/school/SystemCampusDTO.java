package net.gvsun.timetable.internal.school;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class SystemCampusDTO implements Serializable {
    /**
     * 校区编号
     */
    private String campusNumber;
    /**
     * 校区名称
     */
    private String campusName;


}
