package net.gvsun.timetable.internal.cdictionary;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
@Data
public class CDictionaryDTO implements Serializable {
    private Integer id;
    private String CNumber;
    private String CCategory;

}
