package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolSubjectDTO extends Recordable implements Shared {

    private String subjectNumber;
    private String subjectName;


    public String getSubjectNumber() {
        return subjectNumber;
    }

    public void setSubjectNumber(String subjectNumber) {
        this.subjectNumber = subjectNumber;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }
}
