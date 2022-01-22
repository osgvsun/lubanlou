package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_experiment_skill_user database table.
 * 
 */
@Entity
@Table(name="t_experiment_skill_user")
@NamedQuery(name="TExperimentSkillUser.findAll", query="SELECT t FROM TExperimentSkillUser t")
public class TExperimentSkillUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="final_grade")
	private BigDecimal finalGrade;

	@Column(name="final_score")
	private BigDecimal finalScore;

	@Column(name="grade_teacher")
	private String gradeTeacher;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="grade_time")
	private Date gradeTime;

	@Column(name="real_grade")
	private BigDecimal realGrade;

	@Column(name="skill_id")
	private Integer skillId;

	private String username;

	public TExperimentSkillUser() {
	}

	public void setFinalScore(BigDecimal finalScore) {
		this.finalScore = finalScore;
	}

	public BigDecimal getFinalScore() {
		return finalScore;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public BigDecimal getFinalGrade() {
		return finalGrade;
	}

	public void setFinalGrade(BigDecimal finalGrade) {
		this.finalGrade = finalGrade;
	}

	public String getGradeTeacher() {
		return this.gradeTeacher;
	}

	public void setGradeTeacher(String gradeTeacher) {
		this.gradeTeacher = gradeTeacher;
	}

	public Date getGradeTime() {
		return this.gradeTime;
	}

	public void setGradeTime(Date gradeTime) {
		this.gradeTime = gradeTime;
	}

	public BigDecimal getRealGrade() {
		return realGrade;
	}

	public void setRealGrade(BigDecimal realGrade) {
		this.realGrade = realGrade;
	}

	public Integer getSkillId() {
		return this.skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}