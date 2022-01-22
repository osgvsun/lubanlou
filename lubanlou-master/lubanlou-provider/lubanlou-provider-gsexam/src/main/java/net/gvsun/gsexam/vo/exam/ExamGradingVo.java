package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.Date;

/**************************************************************************
 * @Description: 学生考试成绩vo
 * @author: 李雪腾
 * @Date: 2017/10/17 10:35
 **************************************************************************/
public class ExamGradingVo implements Serializable{

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

    /**
     * 角色
     */
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
