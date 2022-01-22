package net.gvsun.examserver;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**************************************************************************
 * Description:试题选项的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@ApiModel(value = "DTO-QuestionOptionDTO", description = "试题DTO")
public class QuestionOptionDTO implements Serializable {
    @ApiModelProperty(value = "题目选项A、B、C、D", name = "optionNumber")
    private String optionNumber;
    @ApiModelProperty(value = "题目选项内容", name = "optionText")
    private String optionText;
    @ApiModelProperty(value = "题目选项对错", name = "isCorrect")
    private Integer isCorrect;

    public Integer getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Integer isCorrect) {
        this.isCorrect = isCorrect;
    }

    public String getOptionNumber() {
        return optionNumber;
    }

    public void setOptionNumber(String optionNumber) {
        this.optionNumber = optionNumber;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public static List<QuestionOptionDTO> transferQuestionOptionDTO(List<Object[]> queryHQLs){
        List<QuestionOptionDTO> questionOptionDTOList=new ArrayList();
        for(Object[] o:queryHQLs){
            QuestionOptionDTO questionOptionDTO=new QuestionOptionDTO();
            questionOptionDTO.setOptionNumber(o[0]!=null?o[0].toString():null);
            questionOptionDTO.setOptionText(o[1]!=null?o[1].toString():null);
            questionOptionDTO.setIsCorrect(Integer.parseInt(o[2].toString()));
            questionOptionDTOList.add(questionOptionDTO);
        }
        return questionOptionDTOList;
    }
}
