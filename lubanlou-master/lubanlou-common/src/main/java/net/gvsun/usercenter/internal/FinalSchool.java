package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class FinalSchool implements Serializable {
    private String school;
    private List<Map<String, String>> jobCategoryList;

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public List<Map<String, String>> getJobCategoryList() {
        return jobCategoryList;
    }

    public void setJobCategoryList(List<Map<String, String>> jobCategoryList) {
        this.jobCategoryList = jobCategoryList;
    }
}
