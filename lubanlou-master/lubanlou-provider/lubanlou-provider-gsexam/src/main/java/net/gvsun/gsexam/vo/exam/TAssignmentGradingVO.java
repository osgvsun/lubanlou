package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.Date;

public class TAssignmentGradingVO implements Serializable {
    /**
     * 考试名称
     */
    private String title;
    /**
     * 学生学号
     */
    private String username;
    /**
     * 学生名
     */
    private String cname;
    /**
     * 学生提交时间
     */
    private Date commitTime;
    /**
     * 考试分数
     */
    private Double score;



    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public Date getCommitTime() {
        return commitTime;
    }

    public void setCommitTime(Date commitTime) {
        this.commitTime = commitTime;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
