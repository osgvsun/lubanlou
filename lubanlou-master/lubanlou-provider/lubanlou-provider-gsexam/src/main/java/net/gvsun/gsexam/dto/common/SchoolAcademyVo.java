package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class SchoolAcademyVo implements Serializable {
    /*
    学院编号
     */
    private String academyNumber;
    /*
    学院名称
     */
    private String academyName;

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }
}
