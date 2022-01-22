package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2018/5/21.
 */
public class ExamDetailsVO implements Serializable{
    /**
     * 题目id
     */
    private Integer id;
    /**
     * 题目名称
     */
    private String title;
    /**
     * 题目类型
     */
    private Integer type;
    /**
     * 是否有序（填空）
     */
    private Integer isOrder;
    /**
     * 系统得分
     */
    private Double score;
    /**
     * 手动打分得分
     */
    private String overriderScore;
    /**
     * 选项
     */
    private List<TAssignmentAnswersVO> answer;

    /**
     * 学生答案
     */
    private List<TAssignmentItemMappingsVO> mapping;
    /**
     *答错次数
     */
    private Integer errorCount;
    /**
     *分值
     */
    private Double grade;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public List<TAssignmentAnswersVO> getAnswer() {
        return answer;
    }

    public void setAnswer(List<TAssignmentAnswersVO> answer) {
        this.answer = answer;
    }

    public List<TAssignmentItemMappingsVO> getMapping() {
        return mapping;
    }

    public void setMapping(List<TAssignmentItemMappingsVO> mapping) {
        this.mapping = mapping;
    }

    public Integer getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Integer errorCount) {
        this.errorCount = errorCount;
    }

    public Integer getIsOrder() {
        return isOrder;
    }

    public void setIsOrder(Integer isOrder) {
        this.isOrder = isOrder;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public String getOverriderScore() {
        return overriderScore;
    }

    public void setOverriderScore(String overriderScore) {
        this.overriderScore = overriderScore;
    }

}
