package net.gvsun.domain.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String student;

	@Column(name="site_id")
	private Integer siteId;

	private String cname;

	@Column(name="course_number")
	private String courseNumber;

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

	@Column(name="addition_score")
	private BigDecimal additionScore;

	@Column(name="addition_test_score")
	private BigDecimal additionTestScore;

	@Column(name="addition_task_score")
	private BigDecimal additionTaskScore;

	@Column(name="addition_exam_score")
	private BigDecimal additionExamScore;

	@Column(name="addition_attendance_score")
	private BigDecimal additionAttendanceScore;

	@Column(name="addition_action_score")
	private BigDecimal additionActionScore;

	@Column(name="addition_experiment_score")
	private BigDecimal additionExperimentScore;

	@Column(name="addition_group_score")
	private BigDecimal additionGroupScore;

	@Column(name="test_grade")
	private BigDecimal testGrade;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_time")
	private Date updateTime;

	@Column(name="group_id")
	private Integer groupId;

	@Column(name="group_title")
	private String groupTitle;

	@Column(name="classes_number")
	private String classesNumber;

	@Column(name="group_ranking")
	private Integer groupRanking;

	@Column(name="group_marking")
	private String groupMarking;

	public TTestGrading() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStudent() {
		return student;
	}

	public void setStudent(String student) {
		this.student = student;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
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

	public BigDecimal getAdditionScore() {
		return additionScore;
	}

	public void setAdditionScore(BigDecimal additionScore) {
		this.additionScore = additionScore;
	}

	public BigDecimal getAdditionTestScore() {
		return additionTestScore;
	}

	public void setAdditionTestScore(BigDecimal additionTestScore) {
		this.additionTestScore = additionTestScore;
	}

	public BigDecimal getAdditionTaskScore() {
		return additionTaskScore;
	}

	public void setAdditionTaskScore(BigDecimal additionTaskScore) {
		this.additionTaskScore = additionTaskScore;
	}

	public BigDecimal getAdditionExamScore() {
		return additionExamScore;
	}

	public void setAdditionExamScore(BigDecimal additionExamScore) {
		this.additionExamScore = additionExamScore;
	}

	public BigDecimal getAdditionAttendanceScore() {
		return additionAttendanceScore;
	}

	public void setAdditionAttendanceScore(BigDecimal additionAttendanceScore) {
		this.additionAttendanceScore = additionAttendanceScore;
	}

	public BigDecimal getAdditionActionScore() {
		return additionActionScore;
	}

	public void setAdditionActionScore(BigDecimal additionActionScore) {
		this.additionActionScore = additionActionScore;
	}

	public BigDecimal getAdditionExperimentScore() {
		return additionExperimentScore;
	}

	public void setAdditionExperimentScore(BigDecimal additionExperimentScore) {
		this.additionExperimentScore = additionExperimentScore;
	}

	public BigDecimal getAdditionGroupScore() {
		return additionGroupScore;
	}

	public void setAdditionGroupScore(BigDecimal additionGroupScore) {
		this.additionGroupScore = additionGroupScore;
	}

	public BigDecimal getTestGrade() {
		return testGrade;
	}

	public void setTestGrade(BigDecimal testGrade) {
		this.testGrade = testGrade;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public String getGroupTitle() {
		return groupTitle;
	}

	public void setGroupTitle(String groupTitle) {
		this.groupTitle = groupTitle;
	}

	public String getCourseNumber() {
		return courseNumber;
	}

	public void setCourseNumber(String courseNumber) {
		this.courseNumber = courseNumber;
	}

	public String getClassesNumber() {
		return classesNumber;
	}

	public void setClassesNumber(String classesNumber) {
		this.classesNumber = classesNumber;
	}

	public Integer getGroupRanking() {
		return groupRanking;
	}

	public void setGroupRanking(Integer groupRanking) {
		this.groupRanking = groupRanking;
	}

	public String getGroupMarking() {
		return groupMarking;
	}

	public void setGroupMarking(String groupMarking) {
		this.groupMarking = groupMarking;
	}
}