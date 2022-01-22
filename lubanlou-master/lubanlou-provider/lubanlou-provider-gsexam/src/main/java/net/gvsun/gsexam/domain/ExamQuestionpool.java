package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**************************************************************************
 * Description:试卷库domain
 *
 * @author:lixueteng
 * @date:2017/12/1 0001
 **************************************************************************/
@Entity
@NamedQuery(name="ExamQuestionpool.findAll", query="SELECT r FROM ExamQuestionpool r")
public class ExamQuestionpool implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    /**
     * 试卷库的总分
     */
    private double score;
    /**
     * 试卷库的分类的id
     */
    private Integer category;
    /**
     * 试卷的创建时间
     */
    @Column(name="created_date")
    private Date createdDate;
    /**
     * 考试创建者的username
     */
    @Column(name = "created_name")
    private String createdName;
    /**
     * 试卷库的类型 1自动组卷 2手动组卷 3自主组卷
     */
    private Integer type;
    /**
     * 试卷库的状态 0 正常 1 删除
     */
    private Integer status;
    @OneToMany(mappedBy="examQuestionpool")
    private Set<ExamSection> examSections;

    public Integer getId() {
        return id;
    }

    public ExamQuestionpool setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ExamQuestionpool setTitle(String title) {
        this.title = title;
        return this;
    }

    public double getScore() {
        return score;
    }

    public ExamQuestionpool setScore(double score) {
        this.score = score;
        return this;
    }

    public Integer getCategory() {
        return category;
    }

    public ExamQuestionpool setCategory(Integer category) {
        this.category = category;
        return this;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public ExamQuestionpool setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public String getCreatedName() {
        return createdName;
    }

    public ExamQuestionpool setCreatedName(String createdName) {
        this.createdName = createdName;
        return this;
    }

    public Set<ExamSection> getExamSections() {
        return examSections;
    }

    public ExamQuestionpool setExamSections(Set<ExamSection> examSections) {
        this.examSections = examSections;
        return this;
    }

    public Integer getType() {
        return type;
    }

    public ExamQuestionpool setType(Integer type) {
        this.type = type;
        return this;
    }

    public Integer getStatus() {
        return status;
    }

    public ExamQuestionpool setStatus(Integer status) {
        this.status = status;
        return this;
    }
}
