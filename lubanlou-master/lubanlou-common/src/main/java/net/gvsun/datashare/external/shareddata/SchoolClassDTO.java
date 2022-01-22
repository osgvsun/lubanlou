package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolClassDTO extends Recordable implements Shared {

    private String classNumber;
    private String className;
    private String studentNumber;
    private String majorNumber;
    private String academyNumber;
    private String classYear;

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getMajorNumber() {
        return majorNumber;
    }

    public void setMajorNumber(String majorNumber) {
        this.majorNumber = majorNumber;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getClassYear() {
        return classYear;
    }

    public void setClassYear(String classYear) {
        this.classYear = classYear;
    }
}
