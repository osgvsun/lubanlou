package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**
 * Created by 李雪腾 on 2017/9/27 0027.
 */
public class ExamResultForDyVo implements Serializable {

    private double score;
    private Integer remainSubmitTime;
    //考试的标题
    private String title;
    /**
     * 考试ID
     */
    private Integer examId;
    /**
     * 考试学生username
     */
    private String username;

    private double accessScore;

    public double getAccessScore() { return accessScore; }

    public void setAccessScore(double accessScore) { this.accessScore = accessScore; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Integer getRemainSubmitTime() {
        return remainSubmitTime;
    }

    public void setRemainSubmitTime(Integer remainSubmitTime) {
        this.remainSubmitTime = remainSubmitTime;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
