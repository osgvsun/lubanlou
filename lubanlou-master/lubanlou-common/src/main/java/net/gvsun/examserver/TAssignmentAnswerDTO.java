package net.gvsun.examserver;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**************************************************************************
 * Description:考试提交结果的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/19
 **************************************************************************/
@ApiModel(value = "DTO-TAssignmentAnswerDTO", description = "考试选项的DTO")
public class TAssignmentAnswerDTO implements Serializable {
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "选项编号", name = "label")
    private String label;
    @ApiModelProperty(value = "选项内容", name = "text")
    private String text;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
