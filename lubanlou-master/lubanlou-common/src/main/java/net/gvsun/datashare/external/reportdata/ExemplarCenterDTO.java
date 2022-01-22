package net.gvsun.datashare.external.reportdata;

/**
 * Created by Administrator on 2021/7/8.
 */
public class ExemplarCenterDTO {
    //表2-8-1，实验教学示范中心、虚拟仿真实验示范中心
    private String centerNumber;
    private String centerName;
    private String level;
    private String createdDate;
    private Integer studentHoursInsideTheSchool;
    private Integer experimentalCounts;
    private Integer studentHoursOutsideTheSchool;
    private String yearCode;
    private String academyNumber;

    public String getCenterNumber() {
        return centerNumber;
    }

    public void setCenterNumber(String centerNumber) {
        this.centerNumber = centerNumber;
    }

    public String getCenterName() {
        return centerName;
    }

    public void setCenterName(String centerName) {
        this.centerName = centerName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getStudentHoursInsideTheSchool() {
        return studentHoursInsideTheSchool;
    }

    public void setStudentHoursInsideTheSchool(Integer studentHoursInsideTheSchool) {
        this.studentHoursInsideTheSchool = studentHoursInsideTheSchool;
    }

    public Integer getExperimentalCounts() {
        return experimentalCounts;
    }

    public void setExperimentalCounts(Integer experimentalCounts) {
        this.experimentalCounts = experimentalCounts;
    }

    public Integer getStudentHoursOutsideTheSchool() {
        return studentHoursOutsideTheSchool;
    }

    public void setStudentHoursOutsideTheSchool(Integer studentHoursOutsideTheSchool) {
        this.studentHoursOutsideTheSchool = studentHoursOutsideTheSchool;
    }

    public String getYearCode() {
        return yearCode;
    }

    public void setYearCode(String yearCode) {
        this.yearCode = yearCode;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }
}
