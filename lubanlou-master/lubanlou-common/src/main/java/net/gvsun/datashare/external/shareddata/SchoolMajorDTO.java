package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolMajorDTO extends Recordable implements Shared {

    private String majorNumber;
    private String majorName;

    public String getMajorNumber() {
        return majorNumber;
    }

    public void setMajorNumber(String majorNumber) {
        this.majorNumber = majorNumber;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }
}
