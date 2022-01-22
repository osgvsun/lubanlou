package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.Date;


public class TestLibraryVo implements Serializable {
    /**
     * 试卷的id
     */
    private Integer id;
    /**
     * 试卷的名称
     */
    private String title;

    /**
     * 试卷的总分
     */
    private double score;

    /**
     * 试卷的创建时间
     */
    private Date createdDate;
    /**
     * 试卷的建卷人
     */
    private String createdName;
    /**
     * 试卷库的类型 1自动组卷 2手动组卷 3自主组卷
     */
    private Integer type;
    /**
     * 试卷库的状态 1 正常 0 删除
     */
    private Integer status;
    /**
     * 试卷的分类
     */
    private String categoryTitle;

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

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedName() {
        return createdName;
    }

    public void setCreatedName(String createdName) {
        this.createdName = createdName;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCategoryTitle() {
        return categoryTitle;
    }

    public void setCategoryTitle(String categoryTitle) {
        this.categoryTitle = categoryTitle;
    }

    /**
     * 无参构造函数
     */
    public TestLibraryVo() {
    }

    /**
     * 有参构造函数（全参）
     * @param id
     * @param title
     * @param score
     * @param createdDate
     * @param createdName
     * @param type
     * @param status
     * @param categoryTitle
     */
    public TestLibraryVo(Integer id, String title, double score, Date createdDate, String createdName, Integer type, Integer status, String categoryTitle) {
        this.id = id;
        this.title = title;
        this.score = score;
        this.createdDate = createdDate;
        this.createdName = createdName;
        this.type = type;
        this.status = status;
        this.categoryTitle = categoryTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TestLibraryVo that = (TestLibraryVo) o;

        return new EqualsBuilder()
                .append(score, that.score)
                .append(id, that.id)
                .append(title, that.title)
                .append(createdDate, that.createdDate)
                .append(createdName, that.createdName)
                .append(type, that.type)
                .append(status, that.status)
                .append(categoryTitle, that.categoryTitle)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(title)
                .append(score)
                .append(createdDate)
                .append(createdName)
                .append(type)
                .append(status)
                .append(categoryTitle)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "TestLibraryVo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", score=" + score +
                ", createdDate=" + createdDate +
                ", createdName='" + createdName + '\'' +
                ", type=" + type +
                ", status=" + status +
                ", categoryTitle='" + categoryTitle + '\'' +
                '}';
    }
}
