package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;

/**
 * Created by REM on 2020/10/22.
 */
public class CopyItemComponentDTO implements Serializable{
    private Integer assignmentId;
    private Integer itemType;
    private Integer itemQuantity;
    private Double itemScore;
    private String sectionName;
    private Integer tQuestionpoolId;
    private Integer itemGapnumber;

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
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

    public Double getItemScore() {
        return itemScore;
    }

    public void setItemScore(Double itemScore) {
        this.itemScore = itemScore;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Integer gettQuestionpoolId() {
        return tQuestionpoolId;
    }

    public void settQuestionpoolId(Integer tQuestionpoolId) {
        this.tQuestionpoolId = tQuestionpoolId;
    }

    public Integer getItemGapnumber() {
        return itemGapnumber;
    }

    public void setItemGapnumber(Integer itemGapnumber) {
        this.itemGapnumber = itemGapnumber;
    }
}
