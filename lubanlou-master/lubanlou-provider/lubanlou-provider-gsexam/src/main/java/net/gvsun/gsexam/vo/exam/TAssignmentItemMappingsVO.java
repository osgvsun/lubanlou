package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**
 * Created by REM on 2018/5/21.
 */
public class TAssignmentItemMappingsVO implements Serializable{
    /**
     * id
     */
    private Integer id;
    /**
     * 关联答案id
     */
    private Integer answerId;
    /**
     * 关联答案内容(填空，简答)
     */
    private String answerText;

    private String label;
    private String labelText;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLabelText() {
        return labelText;
    }

    public void setLabelText(String labelText) {
        this.labelText = labelText;
    }
}

