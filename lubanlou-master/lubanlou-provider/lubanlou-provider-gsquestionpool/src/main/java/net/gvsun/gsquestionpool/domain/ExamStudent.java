package net.gvsun.gsquestionpool.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import java.io.Serializable;

/**************************************************************************
 * Description:
 *
 * @author:lixueteng
 * @date:2017/10/31 0031
 **************************************************************************/
@Entity
@NamedQuery(name="ExamStudent.findAll", query="SELECT f FROM ExamStudent f")
public class ExamStudent implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @Id
    private Integer id;
    /**
     * 预约的学生名
     */
    private String username;

    /**
     * 预约的考试id
     */
    @Column(name="exam_id")
    private Integer examId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }
}
