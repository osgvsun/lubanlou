package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.Date;

/**************************************************************************
 * Description:题库的VO
 *
 * @author:lixueteng
 * @date:2017/12/1 0001
 **************************************************************************/
public class QuestionPoolVO implements Serializable{

    /**
     * 题库的id
     */
    private Integer id;
    /**
     * 题库的名称
     */
    private String title;
    /**
     * 题库的创建人
     */
    private String username;
    /**
     * 题库的创建时间
     */
    private Date createTime;
    /**
     * 题库的分类 公共题库 站点题库
     */
    private Integer type;

    /**
     * 题库的类别
     */
    private Integer category;

    public Integer getCategory() {
        return category;
    }

    public QuestionPoolVO setCategory(Integer category) {
        this.category = category;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public QuestionPoolVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public QuestionPoolVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public QuestionPoolVO setUsername(String username) {
        this.username = username;
        return this;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public QuestionPoolVO setCreateTime(Date createTime) {
        this.createTime = createTime;
        return this;
    }

    public Integer getType() {
        return type;
    }

    public QuestionPoolVO setType(Integer type) {
        this.type = type;
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

        QuestionPoolVO that = (QuestionPoolVO) o;

        return new EqualsBuilder()
                .append(id, that.id)
                .append(title, that.title)
                .append(username, that.username)
                .append(createTime, that.createTime)
                .append(type, that.type)
                .append(category, that.category)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(title)
                .append(username)
                .append(createTime)
                .append(type)
                .append(category)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "QuestionPoolVO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", username='" + username + '\'' +
                ", createTime=" + createTime +
                ", type='" + type + '\'' +
                '}';
    }
}
