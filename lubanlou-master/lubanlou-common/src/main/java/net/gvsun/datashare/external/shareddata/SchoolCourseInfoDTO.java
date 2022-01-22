package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

/**
 * Created by Remli on 2021/6/18.
 */
public class SchoolCourseInfoDTO extends Recordable implements Shared{
    private String courseNumber;
    private String courseName;
    private String courseEnName;
    private String academyNumber;
    private Double theoreticalHours;
    private Double totalHours;
    private Integer flag;
    private String courseType;
    private String courseTypeName;
    private Double credits;
    private String id;
    private String text;

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

    public String getCourseEnName() {
        return courseEnName;
    }

    public void setCourseEnName(String courseEnName) {
        this.courseEnName = courseEnName;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public Double getTheoreticalHours() {
        return theoreticalHours;
    }

    public void setTheoreticalHours(Double theoreticalHours) {
        this.theoreticalHours = theoreticalHours;
    }

    public Double getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(Double totalHours) {
        this.totalHours = totalHours;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public String getCourseTypeName() {
        return courseTypeName;
    }

    public void setCourseTypeName(String courseTypeName) {
        this.courseTypeName = courseTypeName;
    }

    public Double getCredits() {
        return credits;
    }

    public void setCredits(Double credits) {
        this.credits = credits;
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
}
