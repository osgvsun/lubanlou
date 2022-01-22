package net.gvsun.transcript.external;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2018/1/31.
 */
public class TGradeObjectVO implements Serializable {
    /**
     *  成绩册id
    */
    private Integer id;

    /**
     *  成绩册中作业考试等等名字
     */
    private String name;

    /**
     *  成绩册中作业考试等等成绩权重(百分之形式)
     */
    private String perWeight;

    /**
     *  成绩册中作业考试等等成绩权重(百分之形式)
     */
    private BigDecimal weight;
    /**
     *  成绩册类型
     */
    private String type;
    /**
     *  实验项目id
     */
    private Integer experimentId;
    /**
     *  保存1，提交0
     */
    private Integer marked;
    /**
     * 所属模块
     */
    private String module;
    /**
     * 作业id
     */
    private String assignmentId;
    /**
     * 作业名称
     */
    private String assignmentTitle;

    public String getAssignmentTitle() {
        return assignmentTitle;
    }

    public void setAssignmentTitle(String assignmentTitle) {
        this.assignmentTitle = assignmentTitle;
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getPerWeight() {
        return perWeight;
    }

    public void setPerWeight(String perWeight) {
        this.perWeight = perWeight;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getExperimentId() {
        return experimentId;
    }

    public void setExperimentId(Integer experimentId) {
        this.experimentId = experimentId;
    }

    public Integer getMarked() {
        return marked;
    }

    public void setMarked(Integer marked) {
        this.marked = marked;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }
}
