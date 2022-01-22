package net.gvsun.datashare.external.shareddata;

/**
 * Created by Remli on 2021/6/29.
 */
public class SchoolCourseClassDTO implements Shared{
    private String courseNo;
    private String classNumber;

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }
}
