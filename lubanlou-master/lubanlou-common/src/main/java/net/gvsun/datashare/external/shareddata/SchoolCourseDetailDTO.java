package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

/**
 * Created by Remli on 2021/6/25.
 */
public class SchoolCourseDetailDTO extends Recordable implements Shared{
    private String courseDetailNo;
    private String courseNo;
    private String courseNumber;
    private String courseName;
    private String academyNumber;
    private Integer termId;
    private String totalWeeks;
    private Integer weekday;
    private Integer startWeek;
    private Integer endWeek;
    private Integer totalClasses;
    private Integer startClass;
    private Integer endClass;
    private String classContnet;
    private String classAddress;
    private String tutor;
    private String teacherNumber;
    private Integer state;
    private Integer isExperimental;
    private Integer isFullJudgement;
    private String termNumber;

    private String courseNoStudents;

    public String getCourseDetailNo() {
        return courseDetailNo;
    }

    public void setCourseDetailNo(String courseDetailNo) {
        this.courseDetailNo = courseDetailNo;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getTotalWeeks() {
        return totalWeeks;
    }

    public void setTotalWeeks(String totalWeeks) {
        this.totalWeeks = totalWeeks;
    }

    public Integer getWeekday() {
        return weekday;
    }

    public void setWeekday(Integer weekday) {
        this.weekday = weekday;
    }

    public Integer getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(Integer startWeek) {
        this.startWeek = startWeek;
    }

    public Integer getEndWeek() {
        return endWeek;
    }

    public void setEndWeek(Integer endWeek) {
        this.endWeek = endWeek;
    }

    public Integer getTotalClasses() {
        return totalClasses;
    }

    public void setTotalClasses(Integer totalClasses) {
        this.totalClasses = totalClasses;
    }

    public Integer getStartClass() {
        return startClass;
    }

    public void setStartClass(Integer startClass) {
        this.startClass = startClass;
    }

    public Integer getEndClass() {
        return endClass;
    }

    public void setEndClass(Integer endClass) {
        this.endClass = endClass;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public String getTeacherNumber() {
        return teacherNumber;
    }

    public void setTeacherNumber(String teacherNumber) {
        this.teacherNumber = teacherNumber;
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

    public Integer getIsFullJudgement() {
        return isFullJudgement;
    }

    public void setIsFullJudgement(Integer isFullJudgement) {
        this.isFullJudgement = isFullJudgement;
    }

    public String getClassContnet() {
        return classContnet;
    }

    public void setClassContnet(String classContnet) {
        this.classContnet = classContnet;
    }

    public String getClassAddress() {
        return classAddress;
    }

    public void setClassAddress(String classAddress) {
        this.classAddress = classAddress;
    }

    public String getTermNumber() {
        return termNumber;
    }

    public void setTermNumber(String termNumber) {
        this.termNumber = termNumber;
    }

    public String getCourseNoStudents() {
        return courseNoStudents;
    }

    public void setCourseNoStudents(String courseNoStudents) {
        this.courseNoStudents = courseNoStudents;
    }
}
