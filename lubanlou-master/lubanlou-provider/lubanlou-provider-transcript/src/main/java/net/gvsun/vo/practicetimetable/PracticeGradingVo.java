package net.gvsun.vo.practicetimetable;

import java.io.Serializable;

public class PracticeGradingVo implements Serializable{
    //评分项id（工训那边的）
    private Integer practiceId;
    //成绩
    private Double points;
    //学生
    private String student;

    public Integer getPracticeId() {
        return practiceId;
    }

    public void setPracticeId(Integer practiceId) {
        this.practiceId = practiceId;
    }

    public Double getPoints() {
        return points;
    }
    public void setPoints(Double points) {
        this.points = points;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }
}
