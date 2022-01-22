package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class TAssignmentQuestpoolVo implements Serializable {
    private Integer questionpoolId;
    private String title;
    //题库题目数量
    private Integer TAssignmentItemsSize;

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

    public Integer getTAssignmentItemsSize() {
        return TAssignmentItemsSize;
    }

    public void setTAssignmentItemsSize(Integer TAssignmentItemsSize) {
        this.TAssignmentItemsSize = TAssignmentItemsSize;
    }
}
