package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

/**************************************************************************
 * Description:题库类别VO
 *
 * @author:lixueteng
 * @date:2017/12/1 0001
 **************************************************************************/
public class QuestionPoolCategoryVO implements Serializable{

    /**
     * 类别的id
     */
    private Integer id;
    /**
     * 类别的title
     */
    private String title;

    public Integer getId() {
        return id;
    }

    public QuestionPoolCategoryVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public QuestionPoolCategoryVO setTitle(String title) {
        this.title = title;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionPoolCategoryVO that = (QuestionPoolCategoryVO) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(title, that.title)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(title)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "QuestionPoolCategoryVO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
