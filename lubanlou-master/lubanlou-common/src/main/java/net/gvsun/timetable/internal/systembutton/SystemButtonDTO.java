package net.gvsun.timetable.internal.systembutton;

import lombok.Data;
import net.gvsun.timetable.internal.user.AuthorityDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class SystemButtonDTO implements Serializable {
   private List<SystemButtonAuthorityDTO> authorityList;
    private List<SystemButtonParentDTO> parentList;

}
