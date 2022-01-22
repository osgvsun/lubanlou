package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

import java.util.List;

/**
 * Created by Remli on 2021/6/18.
 */
public class SchoolCourseDTO extends Recordable implements Shared{
    private String courseNo;
    private String courseCode;
    private String courseNumber;
    private String teacher;
    private String courseName;
    private Integer termId;
    private String courseType;
    private Integer courseStatus;
    private String academyNumber;
    private String planStudentNumber;
    private Integer state;
    private Integer isExperimental;
    private String courseRequirements;
    private String classNumbers;
    private String courseSource;
    private String termNumber;
    private Integer isFullJudgement;
    private String oldCourseNo;
    private SchoolCourseExpandDTO schoolCourseExpandDTO;

    //配置中心用
    private String id;
    private String text;

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public Integer getCourseStatus() {
        return courseStatus;
    }

    public void setCourseStatus(Integer courseStatus) {
        this.courseStatus = courseStatus;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getPlanStudentNumber() {
        return planStudentNumber;
    }

    public void setPlanStudentNumber(String planStudentNumber) {
        this.planStudentNumber = planStudentNumber;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getIsExperimental() {
        return isExperimental;
    }

    public void setIsExperimental(Integer isExperimental) {
        this.isExperimental = isExperimental;
    }

    public String getCourseRequirements() {
        return courseRequirements;
    }

    public void setCourseRequirements(String courseRequirements) {
        this.courseRequirements = courseRequirements;
    }

    public String getClassNumbers() {
        return classNumbers;
    }

    public void setClassNumbers(String classNumbers) {
        this.classNumbers = classNumbers;
    }

    public String getCourseSource() {
        return courseSource;
    }

    public void setCourseSource(String courseSource) {
        this.courseSource = courseSource;
    }

    public String getTermNumber() {
        return termNumber;
    }

    public void setTermNumber(String termNumber) {
        this.termNumber = termNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getIsFullJudgement() {
        return isFullJudgement;
    }

    public void setIsFullJudgement(Integer isFullJudgement) {
        this.isFullJudgement = isFullJudgement;
    }

    public String getOldCourseNo() {
        return oldCourseNo;
    }

    public void setOldCourseNo(String oldCourseNo) {
        this.oldCourseNo = oldCourseNo;
    }

    public SchoolCourseExpandDTO getSchoolCourseExpandDTO() {
        return schoolCourseExpandDTO;
    }

    public void setSchoolCourseExpandDTO(SchoolCourseExpandDTO schoolCourseExpandDTO) {
        this.schoolCourseExpandDTO = schoolCourseExpandDTO;
    }

}
