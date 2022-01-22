package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

/**
 * Created by 李雪腾 on 2017/9/26 0026.
 */
public class TAssignmentItemMappingDto implements Serializable {

    public TAssignmentItemMappingDto(Integer id,String answerText){
        this.id=id;
        this.answerText=answerText;
    }

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
