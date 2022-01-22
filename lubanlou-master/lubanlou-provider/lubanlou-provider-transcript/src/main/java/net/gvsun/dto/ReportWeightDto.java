package net.gvsun.dto;

import java.io.Serializable;

/**
 * 考核项目DTO
 */
public class ReportWeightDto implements Serializable {
    /**
     * 考核方式
     */
    private String typeTitle;
    /**
     * 所属模块
     */
    private String module;
    /**
     * 考核项目
     */
    private String title;
    /**
     * 单项权重
     */
    private String objectWeight;
    /**
     * 总成绩权重
     */
    private String typeWeight;
    /**
     * 考核项目总数
     */
    private Integer count;

    /**
     * 导师打分权重
     */
    private String teachWeight;
    /**
     * 评委打分权重
     */
    private String judgeWeight;

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String typeTitle) {
        this.typeTitle = typeTitle;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getObjectWeight() {
        return objectWeight;
    }

    public void setObjectWeight(String objectWeight) {
        this.objectWeight = objectWeight;
    }

    public String getTypeWeight() {
        return typeWeight;
    }

    public void setTypeWeight(String typeWeight) {
        this.typeWeight = typeWeight;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getTeachWeight() {
        return teachWeight;
    }

    public void setTeachWeight(String teachWeight) {
        this.teachWeight = teachWeight;
    }

    public String getJudgeWeight() {
        return judgeWeight;
    }

    public void setJudgeWeight(String judgeWeight) {
        this.judgeWeight = judgeWeight;
    }
}
