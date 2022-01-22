package net.gvsun.gsquestionpool.vo.exampool;


import net.gvsun.gsquestionpool.dto.TAssignmentAnswerDto;

import java.io.Serializable;
import java.util.List;

/**
 * Created by 李雪腾 on 2017/9/18 0018.
 * 考试页面每一道题目的vo
 *
 */
public class ExamItemVo implements Serializable{

    private Integer id;
    //试题描述
    private String description;
    //填空题试题描述
    private String descriptionTemp;
    //试题的类型
    private Integer type;
    //分值
    private double score;
    //次序
    private Integer sequence;
    //试题是否标记
    private Integer falg;
    //填空题个数
    private Integer gapsNumber;
    //填空题是否有序
    private Integer isOrder;
    //所属题库题目
    private Integer itemParent;
    //创建人
    private String createdBy;
    //创建时间
    private String createdTime;
    //试题的选项
    private List<TAssignmentAnswerDto>  answertext;
    //所属大项id
    private Integer sectionId;
    //所属大项名称
    private String sectionName;

    public Integer getSectionId() {
        return sectionId;
    }

    public void setSectionId(Integer sectionId) {
        this.sectionId = sectionId;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

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

    public List<TAssignmentAnswerDto> getAnswertext() {
        return answertext;
    }

    public void setAnswertext(List<TAssignmentAnswerDto> answertext) {
        this.answertext = answertext;
    }

    public String getDescriptionTemp() {
        return descriptionTemp;
    }

    public void setDescriptionTemp(String descriptionTemp) {
        this.descriptionTemp = descriptionTemp;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Integer getFalg() {
        return falg;
    }

    public void setFalg(Integer falg) {
        this.falg = falg;
    }

    public Integer getGapsNumber() {
        return gapsNumber;
    }

    public void setGapsNumber(Integer gapsNumber) {
        this.gapsNumber = gapsNumber;
    }

    public Integer getIsOrder() {
        return isOrder;
    }

    public void setIsOrder(Integer isOrder) {
        this.isOrder = isOrder;
    }

    public Integer getItemParent() {
        return itemParent;
    }

    public void setItemParent(Integer itemParent) {
        this.itemParent = itemParent;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }
}
