package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.List;

/**
 * Created by ASUS on 2017/9/26.
 */
public class QuestionVo implements Serializable {
    /**
     * 试题的id
     */
    private Integer id;
    /**
     * 试题的标题
     */
    private String title;
    /**
     * 试题的选项
     */
    private List<QuestionOptionVo> itemOptions;
    /**
     * 试题的类型
     */
    private Integer type;
    /**
     * 试题是否被标记（0未标记，1已标记）
     */
    private Integer flag;
    /**
     * 试题的答案
     */
    private String itemAnswer;
    /**
     * 填空题类型
     */
    private Integer isOrder;
    /**
     * 简答题标准答案
     */
    private String sanswer;
    /**
     * 简答题标准答案权重
     */
    private String sanswerWeight;
    /**
     *关键词权重
     */
    private String  wordWeight;

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

    public List<QuestionOptionVo> getItemOptions() {
        return itemOptions;
    }

    public void setItemOptions(List<QuestionOptionVo> itemOptions) {
        this.itemOptions = itemOptions;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public String getItemAnswer() {
        return itemAnswer;
    }

    public void setItemAnswer(String itemAnswer) {
        this.itemAnswer = itemAnswer;
    }

    public Integer getIsOrder() {
        return isOrder;
    }

    public void setIsOrder(Integer isOrder) {
        this.isOrder = isOrder;
    }

    public String getSanswer() {
        return sanswer;
    }

    public void setSanswer(String sanswer) {
        this.sanswer = sanswer;
    }

    public String getSanswerWeight() {
        return sanswerWeight;
    }

    public void setSanswerWeight(String sanswerWeight) {
        this.sanswerWeight = sanswerWeight;
    }

    public String getWordWeight() {
        return wordWeight;
    }

    public void setWordWeight(String wordWeight) {
        this.wordWeight = wordWeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionVo that = (QuestionVo) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(title, that.title)
                .append(itemOptions, that.itemOptions)
                .append(type, that.type)
                .append(flag, that.flag)
                .append(itemAnswer, that.itemAnswer)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(title)
                .append(itemOptions)
                .append(type)
                .append(flag)
                .append(itemAnswer)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "QuestionVo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", itemOptions=" + itemOptions +
                ", type=" + type +
                ", itemAnswer='" + itemAnswer + '\'' +
                '}';
    }
}
