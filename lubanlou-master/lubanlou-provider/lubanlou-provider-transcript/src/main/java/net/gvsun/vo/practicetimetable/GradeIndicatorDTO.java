package net.gvsun.vo.practicetimetable;

import java.io.Serializable;

/**
 * Created by REM on 2020/10/29.
 */
public class GradeIndicatorDTO implements Serializable{
    private String gradeBy;
    private String gradeByCname;
    private String student;
    private String businessTime;
    private Double score;
    private Integer practiceId;
    private String workUid;
    private String search;

    public String getGradeBy() {
        return gradeBy;
    }

    public void setGradeBy(String gradeBy) {
        this.gradeBy = gradeBy;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getBusinessTime() {
        return businessTime;
    }

    public void setBusinessTime(String businessTime) {
        this.businessTime = businessTime;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getPracticeId() {
        return practiceId;
    }

    public void setPracticeId(Integer practiceId) {
        this.practiceId = practiceId;
    }

    public String getWorkUid() {
        return workUid;
    }

    public void setWorkUid(String workUid) {
        this.workUid = workUid;
    }

    public String getGradeByCname() {
        return gradeByCname;
    }

    public void setGradeByCname(String gradeByCname) {
        this.gradeByCname = gradeByCname;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}
