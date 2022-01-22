package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_experiment_skill database table.
 * 
 */
@Entity
@Table(name="t_experiment_skill")
@NamedQuery(name="TExperimentSkill.findAll", query="SELECT t FROM TExperimentSkill t")
public class TExperimentSkill implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Column(name="chapter_id")
	private Integer chapterId;

	@Column(name="class_num")
	private Integer classNum;

	@Column(name="created_by")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	@Temporal(TemporalType.TIMESTAMP)
	private Date duedate;

	@Lob
	@Column(name="experiment_describe")
	private String experimentDescribe;

	@Column(name="experiment_goal")
	private String experimentGoal;

	@Column(name="experiment_isopen")
	private Integer experimentIsopen;

	@Column(name="experiment_name")
	private String experimentName;

	@Column(name="experiment_no")
	private String experimentNo;

	@Column(name="experiment_status")
	private Integer experimentStatus;

	@Column(name="experiment_type")
	private Integer experimentType;

	@Column(name="experiment_version")
	private String experimentVersion;

	@Column(name="operation_item_id")
	private Integer operationItemId;

	@Column(name="site_id")
	private Integer siteId;

	private Integer sort;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startdate;

	@Column(name = "weight")
	BigDecimal weight;
	@Column(name="lesson_id")
	private Integer lessonId;
	public TExperimentSkill() {
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getChapterId() {
		return this.chapterId;
	}

	public void setChapterId(int chapterId) {
		this.chapterId = chapterId;
	}

	public Integer getClassNum() {
		return this.classNum;
	}

	public void setClassNum(int classNum) {
		this.classNum = classNum;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public Date getDuedate() {
		return this.duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public String getExperimentDescribe() {
		return this.experimentDescribe;
	}

	public void setExperimentDescribe(String experimentDescribe) {
		this.experimentDescribe = experimentDescribe;
	}

	public String getExperimentGoal() {
		return this.experimentGoal;
	}

	public void setExperimentGoal(String experimentGoal) {
		this.experimentGoal = experimentGoal;
	}

	public Integer getExperimentIsopen() {
		return this.experimentIsopen;
	}

	public void setExperimentIsopen(int experimentIsopen) {
		this.experimentIsopen = experimentIsopen;
	}

	public String getExperimentName() {
		return this.experimentName;
	}

	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}

	public String getExperimentNo() {
		return this.experimentNo;
	}

	public void setExperimentNo(String experimentNo) {
		this.experimentNo = experimentNo;
	}

	public Integer getExperimentStatus() {
		return this.experimentStatus;
	}

	public void setExperimentStatus(int experimentStatus) {
		this.experimentStatus = experimentStatus;
	}

	public Integer getExperimentType() {
		return this.experimentType;
	}

	public void setExperimentType(int experimentType) {
		this.experimentType = experimentType;
	}

	public String getExperimentVersion() {
		return this.experimentVersion;
	}

	public void setExperimentVersion(String experimentVersion) {
		this.experimentVersion = experimentVersion;
	}

	public Integer getOperationItemId() {
		return this.operationItemId;
	}

	public void setOperationItemId(int operationItemId) {
		this.operationItemId = operationItemId;
	}

	public Integer getSiteId() {
		return this.siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public Date getStartdate() {
		return this.startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Integer getLessonId() {
		return lessonId;
	}

	public void setLessonId(Integer lessonId) {
		this.lessonId = lessonId;
	}
}