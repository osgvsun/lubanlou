package net.gvsun.timetable.internal.systembutton;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class ParentAuthorityDTO implements Serializable {
    private Integer parentId;
    private Integer authorityId;

}
