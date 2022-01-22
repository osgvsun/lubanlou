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
public class AuthorityInfoDTO implements Serializable {
    private String systemButtons;
    private Integer id;
    private String authorityName;
    private String cname;
    //权限英文名
    private String enName;
    //类型
    private int type;


}
