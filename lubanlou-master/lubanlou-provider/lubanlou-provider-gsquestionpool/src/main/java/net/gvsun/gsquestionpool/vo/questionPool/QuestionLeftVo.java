package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.List;


public class QuestionLeftVo implements Serializable {
    /**
     * 导航的id
     */
    private Integer id;
    /**
     * 导航的一级标题
     */
    private String title;

    /**
     * 导航的二级标签集合
     */
    private List<QuestionLeftChildrenVO> leftChildrens;


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




    public List<QuestionLeftChildrenVO> getLeftChildrens() {
        return leftChildrens;
    }

    public QuestionLeftVo setLeftChildrens(List<QuestionLeftChildrenVO> leftChildrens) {
        this.leftChildrens = leftChildrens;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof QuestionLeftVo)) {
            return false;
        }

        QuestionLeftVo that = (QuestionLeftVo) o;

        return new EqualsBuilder()
                .append(getId(), that.getId())
                .append(getTitle(), that.getTitle())
                .append(getLeftChildrens(), that.getLeftChildrens())
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(getId())
                .append(getTitle())
                .append(getLeftChildrens())
                .toHashCode();
    }

    @Override
    public String toString() {
        return "QuestionLeftVo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", leftChildrens=" + leftChildrens +
                '}';
    }
}
