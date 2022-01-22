package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

public class SchoolAcademyDTO extends Recordable implements Shared {

    private String academyNumber;
    private String academyName;
    private String academyType;
    private String isVaild;

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

    public String getAcademyType() {
        return academyType;
    }

    public void setAcademyType(String academyType) {
        this.academyType = academyType;
    }

    public String getIsVaild() {
        return isVaild;
    }

    public void setIsVaild(String isVaild) {
        this.isVaild = isVaild;
    }
}

