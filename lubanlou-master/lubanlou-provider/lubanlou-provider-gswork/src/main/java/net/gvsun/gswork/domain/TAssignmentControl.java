package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_assignment_control database table.
 * 
 */
@Entity
@Table(name="t_assignment_control")
@NamedQuery(name="TAssignmentControl.findAll", query="SELECT t FROM TAssignmentControl t")
public class TAssignmentControl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="answer_to_student")
	private String answerToStudent;

	@Temporal(TemporalType.TIMESTAMP)
	private Date duedate;

	@Column(name="grade_to_student")
	private String gradeToStudent;

	@Column(name="grade_to_total_grade")
	private String gradeToTotalGrade;

	@Column(name="is_online_marking")
	private Integer isOnlineMarking;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startdate;

	private String submessage;

	@Column(name="submit_type")
	private Integer submitType;

	@Column(name="test_from")
	private String testFrom;

	private Integer timelimit;

	@Column(name="to_gradebook")
	private String toGradebook;

	@Column(name="submit_late")
	private Integer submitLate;

	@Column(name="appendix_type")
	private String appendixType;

	@Column(name="is_duplicate_checking")
	private Integer isDuplicateChecking;
	//bi-directional many-to-one association to TAssignment
	@ManyToOne
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	public TAssignmentControl() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAnswerToStudent() {
		return this.answerToStudent;
	}

	public void setAnswerToStudent(String answerToStudent) {
		this.answerToStudent = answerToStudent;
	}

	public Date getDuedate() {
		return this.duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public String getGradeToStudent() {
		return this.gradeToStudent;
	}

	public void setGradeToStudent(String gradeToStudent) {
		this.gradeToStudent = gradeToStudent;
	}

	public String getGradeToTotalGrade() {
		return this.gradeToTotalGrade;
	}

	public void setGradeToTotalGrade(String gradeToTotalGrade) {
		this.gradeToTotalGrade = gradeToTotalGrade;
	}

	public Integer getIsOnlineMarking() {
		return this.isOnlineMarking;
	}

	public void setIsOnlineMarking(int isOnlineMarking) {
		this.isOnlineMarking = isOnlineMarking;
	}

	public Date getStartdate() {
		return this.startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public String getSubmessage() {
		return this.submessage;
	}

	public void setSubmessage(String submessage) {
		this.submessage = submessage;
	}

	public Integer getSubmitType() {
		return this.submitType;
	}

	public void setSubmitType(int submitType) {
		this.submitType = submitType;
	}

	public String getTestFrom() {
		return this.testFrom;
	}

	public void setTestFrom(String testFrom) {
		this.testFrom = testFrom;
	}

	public Integer getTimelimit() {
		return this.timelimit;
	}

	public void setTimelimit(int timelimit) {
		this.timelimit = timelimit;
	}

	public String getToGradebook() {
		return this.toGradebook;
	}

	public void setToGradebook(String toGradebook) {
		this.toGradebook = toGradebook;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public Integer getSubmitLate() {
		return submitLate;
	}

	public void setSubmitLate(Integer submitLate) {
		this.submitLate = submitLate;
	}

	public String getAppendixType() {
		return appendixType;
	}

	public void setAppendixType(String appendixType) {
		this.appendixType = appendixType;
	}

	public Integer getIsDuplicateChecking() {
		return isDuplicateChecking;
	}

	public void setIsDuplicateChecking(Integer isDuplicateChecking) {
		this.isDuplicateChecking = isDuplicateChecking;
	}
}