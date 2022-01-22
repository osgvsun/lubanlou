package net.gvsun.examserver;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:题库的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@ApiModel(value = "DTO-QuestionDTO", description = "试题DTO")
public class QuestionDTO implements Serializable {
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "题库ID", name = "questionPoolId")
    private Integer questionPoolId;
    @ApiModelProperty(value = "题目标题", name = "title")
    private String title;
    @ApiModelProperty(value = "题目类型（1单选，4多选，2判断，5简答，填空", name = "type")
    private Integer type;
    @ApiModelProperty(value = "题干内容", name = "stem")
    private String stem;
    @ApiModelProperty(value = "题目正确答案", name = "answer")
    private String answer;
    @ApiModelProperty(value = "题目选项信息", name = "questionOptionDTOList")
    private List<QuestionOptionDTO> questionOptionDTOList;

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

    public String getStem() {
        return stem;
    }

    public void setStem(String stem) {
        this.stem = stem;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public List<QuestionOptionDTO> getQuestionOptionDTOList() {
        return questionOptionDTOList;
    }

    public void setQuestionOptionDTOList(List<QuestionOptionDTO> questionOptionDTOList) {
        this.questionOptionDTOList = questionOptionDTOList;
    }
}
