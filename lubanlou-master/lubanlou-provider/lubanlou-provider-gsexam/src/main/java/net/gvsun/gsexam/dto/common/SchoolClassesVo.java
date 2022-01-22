package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class SchoolClassesVo implements Serializable {
    /*
    班级编号
     */
    private String classNumber;
    /*
    班级名称
     */
    private String className;

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
}
