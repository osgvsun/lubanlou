package net.gvsun.datashare.external.reportdata;

/**
 * Created by Administrator on 2021/7/8.
 */
public class VirtualExperimentDTO {
    //表2-8-2虚拟仿真实验教学项目
    private String experimentalNumber;
    private String experimentalName;
    private String level;
    private String createdDate;
    private Integer studentHoursInsideTheSchool;
    private Integer totalViews;
    private Integer totalParticipants;
    private String yearCode;
    private String academyNumber;

    public String getExperimentalNumber() {
        return experimentalNumber;
    }

    public void setExperimentalNumber(String experimentalNumber) {
        this.experimentalNumber = experimentalNumber;
    }

    public String getExperimentalName() {
        return experimentalName;
    }

    public void setExperimentalName(String experimentalName) {
        this.experimentalName = experimentalName;
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

    public Integer getTotalViews() {
        return totalViews;
    }

    public void setTotalViews(Integer totalViews) {
        this.totalViews = totalViews;
    }

    public Integer getTotalParticipants() {
        return totalParticipants;
    }

    public void setTotalParticipants(Integer totalParticipants) {
        this.totalParticipants = totalParticipants;
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
