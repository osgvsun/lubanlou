package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

/**
 * Created by Remli on 2021/6/25.
 */
public class SchoolCourseStudentDTO extends Recordable implements Shared{
    private Integer uid;
    private String studentNumber;
    private String courseDetailNo;
    private Integer termId;
    private String classesNumber;
    private String academyNumber;
    private String majorName;
    private Integer state;
    private String courseSource;
    private String courseNo;
    private String termNumber;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getCourseDetailNo() {
        return courseDetailNo;
    }

    public void setCourseDetailNo(String courseDetailNo) {
        this.courseDetailNo = courseDetailNo;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getClassesNumber() {
        return classesNumber;
    }

    public void setClassesNumber(String classesNumber) {
        this.classesNumber = classesNumber;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getCourseSource() {
        return courseSource;
    }

    public void setCourseSource(String courseSource) {
        this.courseSource = courseSource;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getTermNumber() {
        return termNumber;
    }

    public void setTermNumber(String termNumber) {
        this.termNumber = termNumber;
    }
}
