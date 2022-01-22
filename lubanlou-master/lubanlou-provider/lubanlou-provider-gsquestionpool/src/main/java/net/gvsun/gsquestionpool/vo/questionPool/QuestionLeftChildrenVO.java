package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

/**************************************************************************
 * Description:左侧栏子标签的vo
 *
 * @author:lixueteng
 * @date:2017/12/12 0012
 **************************************************************************/
public class QuestionLeftChildrenVO implements Serializable{
    /**
     * 子标签的id
     */
    private Integer id;
    /**
     * 子标签的title
     */
    private String title;

    /**
     * 该标签是否被选中
     */
    private Integer selected;

    public Integer getSelected() {
        return selected;
    }

    public QuestionLeftChildrenVO setSelected(Integer selected) {
        this.selected = selected;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public QuestionLeftChildrenVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public QuestionLeftChildrenVO setTitle(String title) {
        this.title = title;
        return this;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof QuestionLeftChildrenVO)) {
            return false;
        }

        QuestionLeftChildrenVO that = (QuestionLeftChildrenVO) o;

        return new EqualsBuilder()
                .append(getId(), that.getId())
                .append(getTitle(), that.getTitle())
                .append(getSelected(), that.getSelected())
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(getId())
                .append(getTitle())
                .append(getSelected())
                .toHashCode();
    }

    @Override
    public String toString() {
        return "QuestionLeftChildrenVO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", selected=" + selected +
                '}';
    }
}
