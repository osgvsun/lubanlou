package net.gvsun.transcript.external;

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
     *  权重大小
     */
    private BigDecimal weight;
    /**
     *  成绩册中作业考试等等成绩权重(百分之形式)
     */
    private String perWeight;

    /**
     * 是否显示
     */
    private Integer disPlay;
    /**
     * 课程id
     */
    private Integer siteId;
    /**
     * 课程id
     */
    private String name;
    /**
     * 标识是否是父项（1为父项，2为子项）
     */
    private Integer isParent;
    /**
     * 如果是子项，父项是谁(值可能为knowledge,skill,experience,courseManage)
     */
    private String parent;

    public Integer getIsParent() {
        return isParent;
    }

    public void setIsParent(Integer isParent) {
        this.isParent = isParent;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
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

    public Integer getDisPlay() {
        return disPlay;
    }

    public void setDisPlay(Integer disPlay) {
        this.disPlay = disPlay;
    }

    public String getPerWeight() {
        return perWeight;
    }

    public void setPerWeight(String perWeight) {
        this.perWeight = perWeight;
    }
}
