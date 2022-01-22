package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**
 * Created by 李雪腾 on 2017/9/27 0027.
 */
public class ExamResultVo implements Serializable {

    private double score;
    private Integer remainSubmitTime;
    //考试的标题
    private String title;
    private Integer totalSubmitTime;

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

    public Integer getTotalSubmitTime() {
        return totalSubmitTime;
    }

    public void setTotalSubmitTime(Integer totalSubmitTime) {
        this.totalSubmitTime = totalSubmitTime;
    }
}
