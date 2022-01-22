package net.gvsun.timetable.internal.exam;

import java.io.Serializable;

/**************************************************************************
* @Description: 考试页面构成情况DTO
* @Author: 吴奇臻
* @Date: 2019/07/26
**************************************************************************/
public class ExamTAssignmentComponentDTO implements Serializable {
    private String sectionName;
    private Integer questionPoolId;
    private String title;
    private Integer itemType;
    private Integer itemQuantity;
    private double itemScore;


    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Integer getQuestionPoolId() {
        return questionPoolId;
    }

    public void setQuestionPoolId(Integer questionPoolId) {
        this.questionPoolId = questionPoolId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getItemType() {
        return itemType;
    }

    public void setItemType(Integer itemType) {
        this.itemType = itemType;
    }
    public Integer getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public double getItemScore() {
        return itemScore;
    }

    public void setItemScore(double itemScore) {
        this.itemScore = itemScore;
    }
}
