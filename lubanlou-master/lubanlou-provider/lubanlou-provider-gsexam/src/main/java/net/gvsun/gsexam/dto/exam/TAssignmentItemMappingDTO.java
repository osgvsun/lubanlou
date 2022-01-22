package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;

public class TAssignmentItemMappingDTO implements Serializable {
    private String id;
    private String answerText;
    private Double autoScore;
    private String comments;
    private String gradeTime;
    private Double overriderScore;
    private String submitDate;
    private Integer submitTime;
    private Integer assignmentId;
    private Integer itemId;
    private Integer answerId;
    private String student;
    private Integer gradingId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public Double getAutoScore() {
        return autoScore;
    }

    public void setAutoScore(Double autoScore) {
        this.autoScore = autoScore;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getGradeTime() {
        return gradeTime;
    }

    public void setGradeTime(String gradeTime) {
        this.gradeTime = gradeTime;
    }

    public Double getOverriderScore() {
        return overriderScore;
    }

    public void setOverriderScore(Double overriderScore) {
        this.overriderScore = overriderScore;
    }

    public String getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(String submitDate) {
        this.submitDate = submitDate;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
    }

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public Integer getGradingId() {
        return gradingId;
    }

    public void setGradingId(Integer gradingId) {
        this.gradingId = gradingId;
    }
}