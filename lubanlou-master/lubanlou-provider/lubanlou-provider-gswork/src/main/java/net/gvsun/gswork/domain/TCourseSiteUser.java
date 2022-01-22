package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_user database table.
 */
@Entity
@Table(name = "t_course_site_user")
@NamedQuery(name = "TCourseSiteUser.findAll", query = "SELECT t FROM TCourseSiteUser t")
public class TCourseSiteUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "final_grade")
    private Integer finalGrade;

    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "real_grade")
    private Integer realGrade;

    private Integer role;

    @Column(name = "audit_status")
    private Integer auditStatus;

    public Integer getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(Integer auditStatus) {
        this.auditStatus = auditStatus;
    }

    //bi-directional many-to-one association to TCourseSite
    @ManyToOne
    @JoinColumn(name = "site_id")
    private TCourseSite TCourseSite;

    //bi-directional many-to-one association to User
    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    //bi-directional many-to-one association to Authority
    @ManyToOne
    @JoinColumn(name = "permission")
    private Authority authority;

    @Column(name = "evaluation_each_other_score")
    private Double evaluationEachOtherScore;

    @Column(name = "group_ranking")
    private Integer groupRanking;

    @Column(name = "last_time")
    private Date lastTime;

    public TCourseSiteUser() {
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFinalGrade() {
        return this.finalGrade;
    }

    public void setFinalGrade(Integer finalGrade) {
        this.finalGrade = finalGrade;
    }

    public Integer getGroupId() {
        return this.groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getRealGrade() {
        return this.realGrade;
    }

    public void setRealGrade(Integer realGrade) {
        this.realGrade = realGrade;
    }

    public Integer getRole() {
        return this.role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public TCourseSite getTCourseSite() {
        return this.TCourseSite;
    }

    public void setTCourseSite(TCourseSite TCourseSite) {
        this.TCourseSite = TCourseSite;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Authority getAuthority() {
        return this.authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public Double getEvaluationEachOtherScore() {
        return evaluationEachOtherScore;
    }

    public void setEvaluationEachOtherScore(Double evaluationEachOtherScore) {
        this.evaluationEachOtherScore = evaluationEachOtherScore;
    }

    public Integer getGroupRanking() {
        return groupRanking;
    }

    public void setGroupRanking(Integer groupRanking) {
        this.groupRanking = groupRanking;
    }
}