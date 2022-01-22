package net.gvsun.gsexam.vo.questionpool;

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
