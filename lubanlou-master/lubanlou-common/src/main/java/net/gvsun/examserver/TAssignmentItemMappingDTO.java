package net.gvsun.examserver;

import java.io.Serializable;

/**
 * Created by 李雪腾 on 2017/9/26 0026.
 */
public class TAssignmentItemMappingDTO implements Serializable {

    private Integer id;
    private String answerText;;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}
