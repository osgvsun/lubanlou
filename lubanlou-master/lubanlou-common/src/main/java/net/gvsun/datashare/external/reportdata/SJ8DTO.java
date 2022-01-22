package net.gvsun.datashare.external.reportdata;

import lombok.Data;

/**
 * Created by Remli on 2021/6/3.
 */
@Data
public class SJ8DTO {
    private String schoolCode;
    private String buildNumber;
    private String buildName;
    private String laboratoryNumber;
    private String laboratoryName;
    private String belongingSubjectName;
    private String belongingSubjectNumber;
    private String laboratoryArea;
    private String laboratoryClass;
    private String academyNumber;
    //实验中心,实验室或者实验分室
    private String labType;

}
