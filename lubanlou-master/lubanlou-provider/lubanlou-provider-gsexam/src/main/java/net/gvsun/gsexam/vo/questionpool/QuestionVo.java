package net.gvsun.gsexam.vo.questionpool;

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
     * 试题的答案
     */
    private String itemAnswer;

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

    public String getItemAnswer() {
        return itemAnswer;
    }

    public void setItemAnswer(String itemAnswer) {
        this.itemAnswer = itemAnswer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof QuestionVo)) {
            return false;
        }

        QuestionVo that = (QuestionVo) o;

        return new EqualsBuilder()
                .append(getId(), that.getId())
                .append(getTitle(), that.getTitle())
                .append(getItemOptions(), that.getItemOptions())
                .append(getType(), that.getType())
                .append(getItemAnswer(), that.getItemAnswer())
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(getId())
                .append(getTitle())
                .append(getItemOptions())
                .append(getType())
                .append(getItemAnswer())
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
