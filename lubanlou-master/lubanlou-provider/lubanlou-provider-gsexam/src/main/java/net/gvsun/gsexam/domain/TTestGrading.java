package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the t_test_grading database table.
 * 
 */
@Entity
@Table(name="t_test_grading")
@NamedQuery(name="TTestGrading.findAll", query="SELECT t FROM TTestGrading t")
public class TTestGrading implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Column(name="action_grade")
	private BigDecimal actionGrade;

	@Column(name="attendance_grade")
	private BigDecimal attendanceGrade;

	@Column(name="exam_grade")
	private BigDecimal examGrade;

	@Column(name="experiment_grade")
	private BigDecimal experimentGrade;

	@Column(name="group_grade")
	private BigDecimal groupGrade;

	@Column(name="task_grade")
	private BigDecimal taskGrade;

	@Column(name="test_grade")
	private BigDecimal testGrade;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="student")
	private User user;

	public TTestGrading() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public BigDecimal getActionGrade() {
		return actionGrade;
	}

	public void setActionGrade(BigDecimal actionGrade) {
		this.actionGrade = actionGrade;
	}

	public BigDecimal getAttendanceGrade() {
		return attendanceGrade;
	}

	public void setAttendanceGrade(BigDecimal attendanceGrade) {
		this.attendanceGrade = attendanceGrade;
	}

	public BigDecimal getExamGrade() {
		return examGrade;
	}

	public void setExamGrade(BigDecimal examGrade) {
		this.examGrade = examGrade;
	}

	public BigDecimal getExperimentGrade() {
		return experimentGrade;
	}

	public void setExperimentGrade(BigDecimal experimentGrade) {
		this.experimentGrade = experimentGrade;
	}

	public BigDecimal getGroupGrade() {
		return groupGrade;
	}

	public void setGroupGrade(BigDecimal groupGrade) {
		this.groupGrade = groupGrade;
	}

	public BigDecimal getTaskGrade() {
		return taskGrade;
	}

	public void setTaskGrade(BigDecimal taskGrade) {
		this.taskGrade = taskGrade;
	}

	public BigDecimal getTestGrade() {
		return testGrade;
	}

	public void setTestGrade(BigDecimal testGrade) {
		this.testGrade = testGrade;
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

}