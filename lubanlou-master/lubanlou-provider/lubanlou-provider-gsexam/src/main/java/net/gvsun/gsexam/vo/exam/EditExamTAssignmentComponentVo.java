package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**************************************************************************
* @Description: 编辑考试页面构成情况Vo
* @Author: 罗璇
* @Date: 2017/9/21 10:35
**************************************************************************/
public class EditExamTAssignmentComponentVo implements Serializable{
    private String sectionName;
    private Integer questionpoolId;
    private String title;
    private Integer itemType;
    private Integer itemQuantity;
    private Integer itemGapnumber;
    private double itemScore;


    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Integer getQuestionpoolId() {
        return questionpoolId;
    }

    public void setQuestionpoolId(Integer questionpoolId) {
        this.questionpoolId = questionpoolId;
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

    public Integer getItemGapnumber() {
        return itemGapnumber;
    }

    public void setItemGapnumber(Integer itemGapnumber) {
        this.itemGapnumber = itemGapnumber;
    }

    public double getItemScore() {
        return itemScore;
    }

    public void setItemScore(double itemScore) {
        this.itemScore = itemScore;
    }
}
