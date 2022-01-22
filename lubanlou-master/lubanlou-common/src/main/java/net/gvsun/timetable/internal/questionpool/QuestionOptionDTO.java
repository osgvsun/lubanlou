package net.gvsun.timetable.internal.questionpool;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**************************************************************************
 * Description:试题选项的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@Data
public class QuestionOptionDTO implements Serializable {
    /**
     * 题目选项A、B、C、D
     */
    private String optionNumber;
    /**
     * 题目选项内容
     */
    private String optionText;
    /**
     * 题目选项对错
     */
    private Integer isCorrect;


}
