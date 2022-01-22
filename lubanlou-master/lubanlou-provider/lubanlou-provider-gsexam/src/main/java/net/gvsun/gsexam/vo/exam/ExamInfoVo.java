package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.Date;

/**************************************************************************
 * @Description: 考试成绩页面考试信息vo
 * @author: 李雪腾
 * @Date: 2017/10/17 10:35
 **************************************************************************/
public class    ExamInfoVo implements Serializable{

    /**
     * 考试ID
     */
    private Integer examId;
    /**
     * 考试标题
     */
    private String examTitle;
    /**
     * 考试开始时间
     */
    private Date startTime;
    /**
     * 考试结束时间
     */
    private Date endTime;
    /**
     * 考试总分
     */
    private Double score;
    /**
     * 教师名
     */
    private String teacherName;
    /**
     * 考试描述
     */
    private String examDescription;

    /**
     * 未提交人数
     */
    private Integer unCommitNumber;

    /**
     * 已提交的人数
     */
    private Integer commitNumber;

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public Integer getUnCommitNumber() {
        return unCommitNumber;
    }

    public void setUnCommitNumber(Integer unCommitNumber) {
        this.unCommitNumber = unCommitNumber;
    }

    public Integer getCommitNumber() {
        return commitNumber;
    }

    public void setCommitNumber(Integer commitNumber) {
        this.commitNumber = commitNumber;
    }

    public String getExamDescription() {
        return examDescription;
    }

    public void setExamDescription(String examDescription) {
        this.examDescription = examDescription;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
}
