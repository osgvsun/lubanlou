package net.gvsun.datashare.external.reportdata;

import lombok.Data;

/**
 * Description 表5-1-4专业实验课情况
 *
 * @author lay 2020-11-13
 */
@Data
public class ProfessionalExperimentDTO {
    private String majorCode;
    private String majorName;
    private String courseNumber;
    private String courseName;
    private String laboratoryName;
    private String laboratoryNumber;
    private String yearCode;
    private String academyNumber;
}
