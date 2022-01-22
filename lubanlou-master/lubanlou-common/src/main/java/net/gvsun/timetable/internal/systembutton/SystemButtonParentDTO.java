package net.gvsun.timetable.internal.systembutton;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class SystemButtonParentDTO implements Serializable {
    private String buttonName;
    private Integer id;
    private List<SystemButtonParentDTO> childList;

}
