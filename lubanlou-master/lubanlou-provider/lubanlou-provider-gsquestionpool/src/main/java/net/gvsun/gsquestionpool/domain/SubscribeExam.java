package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**************************************************************************
 * Description:预约考试domain
 *
 * @author:lixueteng
 * @date:2017/10/20 0020
 **************************************************************************/
@Entity
@Table(name="subscribe_exam")
@NamedQuery(name="SubscribeExam.findAll", query="SELECT t FROM SubscribeExam t")
public class SubscribeExam implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 预约考试id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     *预约考试的标题
     */
    private String title;
    /**
     * 预约考试的描述
     */
    private String description;
    /**
     *预约的开始时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="start_time")
    private Date startTime;
    /**
     * 预约的截止时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="end_time")
    private Date endTime;
    /**
     * 预约的老师名
     */
    @Column(name="teacher_name")
    private String teacherName;
    /**
     * 预约的人数限制
     */
    private Integer number;

    /**
     * 预约考试的状态
     */
    private Integer status;
    /**
     * 预约开始信息的外键
     */
    @OneToMany(mappedBy = "subscribeExam")
    private Set<SubscribeExamInfo> SubscribeExamInfos;

    public Set<SubscribeExamInfo> getSubscribeExamInfos() {
        return SubscribeExamInfos;
    }

    public void setSubscribeExamInfos(Set<SubscribeExamInfo> subscribeExamInfos) {
        SubscribeExamInfos = subscribeExamInfos;
    }


    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
