package net.gvsun.gsquestionpool.dto;

import java.io.Serializable;

/**
 * Created by 李雪腾 on 2017/9/20 0020.
 */
public class TAssignmentAnswerDto implements Serializable {

    private Integer id;
    private String text;
    private String label;
    private Integer iscorrect;
    private Double weight;
    private Double score;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getIscorrect() {
        return iscorrect;
    }

    public void setIscorrect(Integer iscorrect) {
        this.iscorrect = iscorrect;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
