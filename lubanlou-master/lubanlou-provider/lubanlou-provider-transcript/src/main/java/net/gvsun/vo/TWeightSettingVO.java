package net.gvsun.vo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2018/2/3.
 */
public class TWeightSettingVO implements Serializable {
    /**
     *  权重id
     */
    private Integer id;

    /**
     *  权重类型
     */
    private String type;
    /**
     *  成绩册中作业考试等等成绩权重(百分之形式)
     */
    private String perWeight;

    /**
     *  权重大小
     */
    private BigDecimal weight;
    /**
     *  名称
     */
    private String name;
    /**
     *  课程名称
     */
    private String lesson;
    /**
     *  学期名称
     */
    private String term;
    /**
     *  字段名
     */
    private String field;
    /**
     *  对应工种名称
     */
    private String workName;
    /**
     *  隐藏（0）还是显示（1）
     */
    private Integer disPlay;
    /**
     *  课程id
     */
    private Integer siteId;

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Integer getDisPlay() {
        return disPlay;
    }

    public void setDisPlay(Integer disPlay) {
        this.disPlay = disPlay;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLesson() {
        return lesson;
    }

    public void setLesson(String lesson) {
        this.lesson = lesson;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
    }

    public String getPerWeight() {
        return perWeight;
    }

    public void setPerWeight(String perWeight) {
        this.perWeight = perWeight;
    }
}
