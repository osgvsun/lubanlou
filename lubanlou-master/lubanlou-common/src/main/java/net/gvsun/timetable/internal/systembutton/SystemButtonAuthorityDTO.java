package net.gvsun.timetable.internal.systembutton;


import lombok.Data;
import net.gvsun.timetable.internal.user.AuthorityDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class SystemButtonAuthorityDTO implements Serializable {
    /**
     * schoolCourse的编号
     */
    private AuthorityInfoDTO authorityDTO;

    private List parentButtons;
    /**
     * 学期开始时间
     */
    private List childButtons;



}
