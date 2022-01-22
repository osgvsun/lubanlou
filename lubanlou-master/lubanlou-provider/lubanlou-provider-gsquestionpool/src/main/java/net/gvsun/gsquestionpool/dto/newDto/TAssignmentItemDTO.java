package net.gvsun.gsquestionpool.dto.newDto;

import lombok.Data;

import java.io.Serializable;
@Data
public class TAssignmentItemDTO implements Serializable {
    //题目类型
    private String type;
    //题干
    private String stem;
    //选项内容(`) 简答题为关键词内容
    private String single;
    //选项标签（A`B）
    private String answerLabelChoices;
    //答案 简答题为标准答案
    private String answer;
    //填空题是否有序（0无序，1有序）
    private Integer isOrder;
    //简答题判题方式（0手动判题，1系统判题）
    private Integer gradeType;
    //简答题标准答案权重
    private String sanswerWeight;
    //简答题关键词权重
    private String singleWeight;
}
