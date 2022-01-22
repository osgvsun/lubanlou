package net.gvsun.datashare.external.shareddata;


import lombok.Data;
import net.gvsun.common.Recordable;

@Data
public class SchoolDepartmentDTO extends Recordable implements Shared {

    private String departmentNumber;
    private String departmentName;
    private String academyNumber;
}
