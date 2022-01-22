package net.gvsun.timetable.internal.questionpool;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:题库的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@Data
public class QuestionDTO implements Serializable {
    /**
     * 唯一标识ID
     */
    private Integer id;
    /**
     * 题库ID
     */
    private Integer questionPoolId;
    /**
     * 题目标题
     */
    private String title;
    /**
     * 题目类型（1单选，4多选，2判断，5简答，填空
     */
    private Integer type;
    /**
     * 题干内容
     */
    private String stem;
    /**
     * 题目正确答案
     */
    private String answer;
    /**
     * 题目选项信息
     */
    private List<QuestionOptionDTO> questionOptionDTOList;


}
