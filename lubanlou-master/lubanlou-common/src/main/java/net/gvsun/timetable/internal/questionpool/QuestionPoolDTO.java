package net.gvsun.timetable.internal.questionpool;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:题库的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@Data
public class QuestionPoolDTO implements Serializable {
    /**
     * 唯一标识ID
     */
    private Integer id;
    /**
     * 题库题目
     */
    private String title;
    /**
     * 题库创建人
     */
    private String username;
    /**
     * 题库创建时间
     */
    private Date createTime;
    /**
     * 题库类型：1公共、2非公共
     */
    private Integer type;
    /**
     * 题库题目总数
     */
    private Integer questionSize;
    /**
     * 题库试题内容
     */
    private List<QuestionDTO> questionDTOList;


}
