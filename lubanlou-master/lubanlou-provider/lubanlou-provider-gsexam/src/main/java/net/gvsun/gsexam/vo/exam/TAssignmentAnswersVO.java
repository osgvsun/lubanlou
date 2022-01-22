package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**
 * Created by REM on 2018/5/21.
 */
public class TAssignmentAnswersVO implements Serializable {
    /**
     * 选项id
     */
    private Integer answerId;
    /**
     * 题目选项
     */
    private String text;
    /**
     * 是否为正确答案：1为正确，0位错误
     */
    private Integer isCorrect;

    private String label;

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Integer isCorrect) {
        this.isCorrect = isCorrect;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
