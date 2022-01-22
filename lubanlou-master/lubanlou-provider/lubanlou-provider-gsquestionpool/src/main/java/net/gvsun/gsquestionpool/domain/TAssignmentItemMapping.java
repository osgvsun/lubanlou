package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_assignment_item_mapping database table.
 * 
 */
@Entity
@Table(name="t_assignment_item_mapping")
@NamedQuery(name="TAssignmentItemMapping.findAll", query="SELECT t FROM TAssignmentItemMapping t")
public class TAssignmentItemMapping implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;

	@Column(name="answer_text")
	private String answerText;

	private double autoscore;

	private String comments;

	@Temporal(TemporalType.TIMESTAMP)
	private Date gradetime;

	@Column(name="overider_score")
	private Double overiderScore;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="submit_date")
	private Date submitDate;

	private Integer submitTime;

	//bi-directional many-to-one association to TAssignment
	@ManyToOne
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	//bi-directional many-to-one association to TAssignmentItem
	@ManyToOne
	@JoinColumn(name="item_id")
	private TAssignmentItem TAssignmentItem;

	//bi-directional many-to-one association to TAssignmentAnswer
	@ManyToOne
	@JoinColumn(name="answer_id")
	private TAssignmentAnswer TAssignmentAnswer;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="student")
	private User userByStudent;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="gradeby")
	private User userByGradeby;

	//bi-directional many-to-one association to TAssignmentGrading
	@ManyToOne
	@JoinColumn(name="grading_id")
	private TAssignmentGrading TAssignmentGrading;

	public TAssignmentItemMapping() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAnswerText() {
		return this.answerText;
	}

	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}

	public double getAutoscore() {
		return this.autoscore;
	}

	public void setAutoscore(double autoscore) {
		this.autoscore = autoscore;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getGradetime() {
		return this.gradetime;
	}

	public void setGradetime(Date gradetime) {
		this.gradetime = gradetime;
	}

	public Double getOveriderScore() {
		return this.overiderScore;
	}

	public void setOveriderScore(Double overiderScore) {
		this.overiderScore = overiderScore;
	}

	public Date getSubmitDate() {
		return this.submitDate;
	}

	public void setSubmitDate(Date submitDate) {
		this.submitDate = submitDate;
	}

	public Integer getSubmitTime() {
		return this.submitTime;
	}

	public void setSubmitTime(int submitTime) {
		this.submitTime = submitTime;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public TAssignmentItem getTAssignmentItem() {
		return this.TAssignmentItem;
	}

	public void setTAssignmentItem(TAssignmentItem TAssignmentItem) {
		this.TAssignmentItem = TAssignmentItem;
	}

	public TAssignmentAnswer getTAssignmentAnswer() {
		return this.TAssignmentAnswer;
	}

	public void setTAssignmentAnswer(TAssignmentAnswer TAssignmentAnswer) {
		this.TAssignmentAnswer = TAssignmentAnswer;
	}

	public User getUserByStudent() {
		return this.userByStudent;
	}

	public void setUserByStudent(User userByStudent) {
		this.userByStudent = userByStudent;
	}

	public User getUserByGradeby() {
		return this.userByGradeby;
	}

	public void setUserByGradeby(User userByGradeby) {
		this.userByGradeby = userByGradeby;
	}

	public TAssignmentGrading getTAssignmentGrading() {
		return this.TAssignmentGrading;
	}

	public void setTAssignmentGrading(TAssignmentGrading TAssignmentGrading) {
		this.TAssignmentGrading = TAssignmentGrading;
	}

}