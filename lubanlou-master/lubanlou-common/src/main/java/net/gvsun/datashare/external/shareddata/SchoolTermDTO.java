package net.gvsun.datashare.external.shareddata;

import lombok.Data;
import net.gvsun.common.Recordable;

@Data
public class SchoolTermDTO extends Recordable implements Shared {

    private String id;
    private String termName;
    private String termStart;
    private String termEnd;
    private String termCode;
    private String yearCode;
    private String termNumber;
    private Integer nowTerm = 0;
}
