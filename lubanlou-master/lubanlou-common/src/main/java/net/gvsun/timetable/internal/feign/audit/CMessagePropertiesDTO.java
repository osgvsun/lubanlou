package net.gvsun.timetable.internal.feign.audit;

import lombok.Data;

@Data
public class CMessagePropertiesDTO {
    private int id;
    private String projectName;
    private String businessConfigItem;
    private String businessConfigStatus;
    private String info;
}
