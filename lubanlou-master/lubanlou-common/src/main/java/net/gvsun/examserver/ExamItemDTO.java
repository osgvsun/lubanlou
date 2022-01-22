package net.gvsun.examserver;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:考试题目的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/19
 **************************************************************************/
@ApiModel(value = "DTO-ExamItemDTO", description = "考试题目的DTO")
public class ExamItemDTO implements Serializable{
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "试题描述", name = "description")
    private String description;
    @ApiModelProperty(value = "填空题试题描述", name = "descriptionTemp")
    private String descriptionTemp;
    @ApiModelProperty(value = "试题的类型", name = "type")
    private Integer type;
    @ApiModelProperty(value = "试题的选项", name = "answerText")
    private List<TAssignmentAnswerDTO>  answerText;
    @ApiModelProperty(value = "试题所来源的题库", name = "title")
    private String title;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }


    public List<TAssignmentAnswerDTO> getAnswerText() {
        return answerText;
    }

    public void setAnswerText(List<TAssignmentAnswerDTO> answerText) {
        this.answerText = answerText;
    }

    public String getDescriptionTemp() {
        return descriptionTemp;
    }

    public void setDescriptionTemp(String descriptionTemp) {
        this.descriptionTemp = descriptionTemp;
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }
}
