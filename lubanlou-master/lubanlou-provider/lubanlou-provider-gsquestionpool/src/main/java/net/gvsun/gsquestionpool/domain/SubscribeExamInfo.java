package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;

/**************************************************************************
 * Description:预约考试的信息domain
 *
 * @author:lixueteng
 * @date:2017/10/20 0020
 **************************************************************************/
@Entity
@Table(name="subscribe_exam_info")
@NamedQuery(name="SubscribeExamInfo.findAll", query="SELECT t FROM SubscribeExamInfo t")
public class SubscribeExamInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 预约考试的信息的id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 预约考试的学生的姓名
     */
    private String name;

    /**
     * 对应的预约考试
     */
    @ManyToOne
    @JoinColumn(name="subscribe_exam_id")
    private SubscribeExam subscribeExam;

    /**
     * 当前学生预约考试的状态
     */
    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SubscribeExam getSubscribeExam() {
        return subscribeExam;
    }

    public void setSubscribeExam(SubscribeExam subscribeExam) {
        this.subscribeExam = subscribeExam;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
