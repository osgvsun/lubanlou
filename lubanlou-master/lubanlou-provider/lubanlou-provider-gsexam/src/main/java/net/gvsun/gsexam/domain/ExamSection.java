package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**************************************************************************
 * Description:试卷库大项
 *
 * @author:lixueteng
 * @date:2017/12/1 0001
 **************************************************************************/
@Entity
@NamedQuery(name="ExamSection.findAll", query="SELECT r FROM ExamSection r")
public class ExamSection implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 大项的名称
     */
    private String name;

    /**
     * 大项小题的数量
     */
    @Column(name="item_count")
    private Integer itemCount;
    /**
     * 大项每道小题的分数
     */
    @Column(name="item_score")
    private double itemScore;
    /**
     * 大项每道题目所属源题库
     */
    @Column(name="item_questionpool_id")
    private Integer itemQuestionpoolId;
    /**
     * 大项每道题目类型
     */
    @Column(name="item_type")
    private Integer itemType;

    /**
     * 大项表对应试卷库表的外键
     */
    @ManyToOne
    @JoinColumn(name="exam_questionpool_id")
    private ExamQuestionpool examQuestionpool;

    /**
     * 大项表对应小题item表多对多关系
     */
    @ManyToMany
    @JoinTable(
            name="exam_section_item"
            , joinColumns={
            @JoinColumn(name="exam_section_id")
    }
            , inverseJoinColumns={
            @JoinColumn(name="item_id")
    }
    )
    private Set<TAssignmentItem> TAssignmentItems;

    public Integer getId() {
        return id;
    }

    public ExamSection setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ExamSection setName(String name) {
        this.name = name;
        return this;
    }

    public Integer getItemCount() {
        return itemCount;
    }

    public ExamSection setItemCount(Integer itemCount) {
        this.itemCount = itemCount;
        return this;
    }

    public double getItemScore() {
        return itemScore;
    }

    public ExamSection setItemScore(double itemScore) {
        this.itemScore = itemScore;
        return this;
    }

    public ExamQuestionpool getExamQuestionpool() {
        return examQuestionpool;
    }

    public ExamSection setExamQuestionpool(ExamQuestionpool examQuestionpool) {
        this.examQuestionpool = examQuestionpool;
        return this;
    }

    public Set<TAssignmentItem> getTAssignmentItems() {
        return TAssignmentItems;
    }

    public ExamSection setTAssignmentItems(Set<TAssignmentItem> TAssignmentItems) {
        this.TAssignmentItems = TAssignmentItems;
        return this;
    }

    public Integer getItemQuestionpoolId() {
        return itemQuestionpoolId;
    }

    public void setItemQuestionpoolId(Integer itemQuestionpoolId) {
        this.itemQuestionpoolId = itemQuestionpoolId;
    }

    public Integer getItemType() {
        return itemType;
    }

    public void setItemType(Integer itemType) {
        this.itemType = itemType;
    }
}
