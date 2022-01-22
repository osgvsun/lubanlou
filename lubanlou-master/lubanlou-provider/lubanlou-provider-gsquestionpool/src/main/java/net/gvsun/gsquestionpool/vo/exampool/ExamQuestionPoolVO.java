package net.gvsun.gsquestionpool.vo.exampool;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:试卷库的VO
 *
 * @author:lixueteng
 * @date:2017/12/20 0020
 **************************************************************************/
public class ExamQuestionPoolVO implements Serializable {
    /**
     * id
     */
    private Integer id;
    /**
     * title
     */
    private String title;
    /**
     * 分类
     */
    private Integer category;
    /**
     * 创建者
     */
    private String username;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 试题数量
     */
    private Integer itemCount;
    /**
     * 总分
     */
    private double score;
    /**
     * 大项
     */
    private List<ExamMajorTermVO> examMajorTerms;

    public Integer getId() {
        return id;
    }

    public ExamQuestionPoolVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ExamQuestionPoolVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public Integer getCategory() {
        return category;
    }
    public Integer getItemCount() {
        return itemCount;
    }

    public ExamQuestionPoolVO setCategory(Integer category) {
        this.category = category;
        return this;
    }
    public ExamQuestionPoolVO seItemCount(Integer itemCount) {
        this.itemCount = itemCount;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public ExamQuestionPoolVO setUsername(String username) {
        this.username = username;
        return this;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public ExamQuestionPoolVO setCreateTime(Date createTime) {
        this.createTime = createTime;
        return this;
    }

    public double getScore() {
        return score;
    }

    public ExamQuestionPoolVO setScore(double score) {
        this.score = score;
        return this;
    }

    public List<ExamMajorTermVO> getExamMajorTerms() {
        return examMajorTerms;
    }

    public ExamQuestionPoolVO setExamMajorTerms(List<ExamMajorTermVO> examMajorTerms) {
        this.examMajorTerms = examMajorTerms;
        return this;
    }
}
