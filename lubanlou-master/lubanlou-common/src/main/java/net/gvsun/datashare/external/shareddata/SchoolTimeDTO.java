package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolTimeDTO extends Recordable implements Shared {

    private Integer id;
    private Integer section;
    private String sectionName;
    private String sectionStartDate;
    private String sectionEndDate;
    private String campusNumber;
    private Integer termId;
    private String yearCode;
    private String termNumber;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSection() {
        return section;
    }

    public void setSection(Integer section) {
        this.section = section;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public String getSectionStartDate() {
        return sectionStartDate;
    }

    public void setSectionStartDate(String sectionStartDate) {
        this.sectionStartDate = sectionStartDate;
    }

    public String getSectionEndDate() {
        return sectionEndDate;
    }

    public void setSectionEndDate(String sectionEndDate) {
        this.sectionEndDate = sectionEndDate;
    }

    public String getCampusNumber() {
        return campusNumber;
    }

    public void setCampusNumber(String campusNumber) {
        this.campusNumber = campusNumber;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getYearCode() {
        return yearCode;
    }

    public void setYearCode(String yearCode) {
        this.yearCode = yearCode;
    }

    public String getTermNumber() {
        return termNumber;
    }

    public void setTermNumber(String termNumber) {
        this.termNumber = termNumber;
    }
}


