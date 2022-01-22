package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class ExamQuestionpoolVo implements Serializable {
    //试卷库id
    private Integer examQuestionpoolId;
    //试卷库分类
    private Integer category;
    //试卷库名称
    private String title;
    //试卷总分
    private double score;

    public Integer getExamQuestionpoolId() {
        return examQuestionpoolId;
    }

    public void setExamQuestionpoolId(Integer examQuestionpoolId) {
        this.examQuestionpoolId = examQuestionpoolId;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

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
}
