package net.gvsun.examserver;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**************************************************************************
 * Description:用于保存的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@ApiModel(value = "DTO-QuestionSaveDTO", description = "用于保存试题的DTO")
public class QuestionSaveDTO implements Serializable {
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "题库ID", name = "questionPoolId")
    private Integer questionPoolId;
    @ApiModelProperty(value = "题目标题", name = "title")
    private String title;
    @ApiModelProperty(value = "题目类型（1单选，4多选，2判断，5简答，填空", name = "type")
    private Integer type;
    @ApiModelProperty(value = "题目所有选项，以逗号分割", name = "answerLabelChoices")
    private String answerLabelChoices;
    @ApiModelProperty(value = "题目正确答案选项，以逗号分割", name = "answer")
    private String answer;
    @ApiModelProperty(value = "题干内容", name = "stem")
    private String stem;
    @ApiModelProperty(value = "题目正确答案内容，以逗号分割", name = "single")
    private String single;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getAnswerLabelChoices() {
        return answerLabelChoices;
    }

    public void setAnswerLabelChoices(String answerLabelChoices) {
        this.answerLabelChoices = answerLabelChoices;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getStem() {
        return stem;
    }

    public void setStem(String stem) {
        this.stem = stem;
    }

    public String getSingle() {
        return single;
    }

    public void setSingle(String single) {
        this.single = single;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

}
