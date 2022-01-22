package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_assignment_answer_assign database table.
 * 
 */
@Entity
@Table(name="t_assignment_answer_assign")
@NamedQuery(name="TAssignmentAnswerAssign.findAll", query="SELECT t FROM TAssignmentAnswerAssign t")
public class TAssignmentAnswerAssign implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private String content;

	@Column(name="early_score")
	private Integer earlyScore;

	private Double grade;

	@Column(name="late_score")
	private Integer lateScore;

	@Column(name="leave_score")
	private Integer leaveScore;

	@Lob
	private String reference;

	private Double score;

	@Column(name="passing_score")
	private Double passingScore;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="score_date")
	private Date scoreDate;

	@Column(name="truant_score")
	private Integer truantScore;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="teacher")
	private User user;

	//bi-directional many-to-one association to TAssignment
	@OneToOne
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	public TAssignmentAnswerAssign() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getEarlyScore() {
		return this.earlyScore;
	}

	public void setEarlyScore(int earlyScore) {
		this.earlyScore = earlyScore;
	}

	public Double getGrade() {
		return this.grade;
	}

	public void setGrade(Double grade) {
		this.grade = grade;
	}

	public Integer getLateScore() {
		return this.lateScore;
	}

	public void setLateScore(int lateScore) {
		this.lateScore = lateScore;
	}

	public Integer getLeaveScore() {
		return this.leaveScore;
	}

	public void setLeaveScore(int leaveScore) {
		this.leaveScore = leaveScore;
	}

	public String getReference() {
		return this.reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public Double getScore() {
		return this.score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Double getPassingScore() {
		return this.passingScore;
	}

	public void setPassingScore(Double passingScore) {
		this.passingScore = passingScore;
	}

	public Date getScoreDate() {
		return this.scoreDate;
	}

	public void setScoreDate(Date scoreDate) {
		this.scoreDate = scoreDate;
	}

	public Integer getTruantScore() {
		return this.truantScore;
	}

	public void setTruantScore(int truantScore) {
		this.truantScore = truantScore;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

}