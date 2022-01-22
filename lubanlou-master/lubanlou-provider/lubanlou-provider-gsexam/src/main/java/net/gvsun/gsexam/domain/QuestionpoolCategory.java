package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**************************************************************************
 * Description:题库类别domain
 *
 * @author:lixueteng
 * @date:2017/12/1 0001
 **************************************************************************/
@Entity
@NamedQuery(name="QuestionpoolCategory.findAll", query="SELECT r FROM QuestionpoolCategory r")
public class QuestionpoolCategory implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @OneToMany(mappedBy = "TAssignmentQuestionpool")
    private Set<TAssignmentQuestionpool> TAssignmentQuestionpools;

    public Integer getId() {
        return id;
    }

    public QuestionpoolCategory setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public QuestionpoolCategory setTitle(String title) {
        this.title = title;
        return this;
    }

    public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools() {
        return TAssignmentQuestionpools;
    }

    public QuestionpoolCategory setTAssignmentQuestionpools(Set<TAssignmentQuestionpool> TAssignmentQuestionpools) {
        this.TAssignmentQuestionpools = TAssignmentQuestionpools;
        return this;
    }
}
