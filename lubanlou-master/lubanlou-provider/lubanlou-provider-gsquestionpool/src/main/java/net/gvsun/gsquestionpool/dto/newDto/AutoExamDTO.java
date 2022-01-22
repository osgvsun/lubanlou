package net.gvsun.gsquestionpool.dto.newDto;

import lombok.Data;

import java.io.Serializable;
@Data
public class AutoExamDTO implements Serializable {
    /**
     * 题库名称
     */
    private String examQuestionPoolTitle;
    /**
     * 题库分类id
     */
    private Integer category;
    /**
     * 总分
     */
    private Double score;
    /**
     * 大项编号
     */
    private String[] examSectionId;
}
