package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_assignment_grading database table.
 * 
 */
@Entity
@Table(name="t_assignment_grading")
@NamedQuery(name="TAssignmentGrading.findAll", query="SELECT t FROM TAssignmentGrading t")
public class TAssignmentGrading implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="accessmentgrading_id")
	private Integer accessmentgradingId;

	@Column(name="attendence_type")
	private Integer attendenceType;

	private String comments;

	@Lob
	private String content;

	@Lob
	private String distribution;

	@Column(name="final_score")
	private Double finalScore;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="grade_time")
	private Date gradeTime;

	private String gradeUrl;

	@Column(name="group_id")
	private Integer groupId;

	private Integer islate;

	@Column(name="marked_pages")
	private String markedPages;

	@Column(name="marking_url")
	private String markingUrl;

	@Temporal(TemporalType.TIMESTAMP)
	private Date submitdate;

	private Integer submitTime;

	@Column(name="test_id")
	private Integer testId;

	//bi-directional many-to-one association to TAssignment
	@ManyToOne
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="student")
	private User userByStudent;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="grade_by")
	private User userByGradeBy;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="TAssignmentGrading")
	private Set<TAssignmentItemMapping> TAssignmentItemMappings;

	public TAssignmentGrading() {
	}

	public Integer getAccessmentgradingId() {
		return this.accessmentgradingId;
	}

	public void setAccessmentgradingId(int accessmentgradingId) {
		this.accessmentgradingId = accessmentgradingId;
	}

	public Integer getAttendenceType() {
		return this.attendenceType;
	}

	public void setAttendenceType(int attendenceType) {
		this.attendenceType = attendenceType;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDistribution() {
		return this.distribution;
	}

	public void setDistribution(String distribution) {
		this.distribution = distribution;
	}

	public Double getFinalScore() {
		return this.finalScore;
	}

	public void setFinalScore(Double finalScore) {
		this.finalScore = finalScore;
	}

	public Date getGradeTime() {
		return this.gradeTime;
	}

	public void setGradeTime(Date gradeTime) {
		this.gradeTime = gradeTime;
	}

	public String getGradeUrl() {
		return this.gradeUrl;
	}

	public void setGradeUrl(String gradeUrl) {
		this.gradeUrl = gradeUrl;
	}

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public Integer getIslate() {
		return this.islate;
	}

	public void setIslate(int islate) {
		this.islate = islate;
	}

	public String getMarkedPages() {
		return this.markedPages;
	}

	public void setMarkedPages(String markedPages) {
		this.markedPages = markedPages;
	}

	public String getMarkingUrl() {
		return this.markingUrl;
	}

	public void setMarkingUrl(String markingUrl) {
		this.markingUrl = markingUrl;
	}

	public Date getSubmitdate() {
		return this.submitdate;
	}

	public void setSubmitdate(Date submitdate) {
		this.submitdate = submitdate;
	}

	public Integer getSubmitTime() {
		return this.submitTime;
	}

	public void setSubmitTime(int submitTime) {
		this.submitTime = submitTime;
	}

	public Integer getTestId() {
		return this.testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public User getUserByStudent() {
		return this.userByStudent;
	}

	public void setUserByStudent(User userByStudent) {
		this.userByStudent = userByStudent;
	}

	public User getUserByGradeBy() {
		return this.userByGradeBy;
	}

	public void setUserByGradeBy(User userByGradeBy) {
		this.userByGradeBy = userByGradeBy;
	}

	public Set<TAssignmentItemMapping> getTAssignmentItemMappings() {
		return this.TAssignmentItemMappings;
	}

	public void setTAssignmentItemMappings(Set<TAssignmentItemMapping> TAssignmentItemMappings) {
		this.TAssignmentItemMappings = TAssignmentItemMappings;
	}

	public TAssignmentItemMapping addTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().add(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentGrading(this);

		return TAssignmentItemMapping;
	}

	public TAssignmentItemMapping removeTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().remove(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentGrading(null);

		return TAssignmentItemMapping;
	}

}