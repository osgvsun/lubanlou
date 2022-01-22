package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_assignment database table.
 *
 */
@Entity
@Table(name="t_assignment")
@NamedQuery(name="TAssignment.findAll", query="SELECT t FROM TAssignment t")
public class TAssignment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	private String description;

	@Column(name="is_check_all")
	private Integer isCheckAll;

	@Column(name="is_group")
	private Integer isGroup;

	private Integer isSubmit;

	private Integer mins;

	@Column(name="need_submit")
	private Integer needSubmit;

	private Integer sequence;

	@Column(name="site_id")
	private Integer siteId;

	@Column(name="school_academy")
	private String schoolAcademy;

	@Column(name="is_make_up_exam")
	private String isMakeUpExam;

	@Column(name="old_assignment_id")
	private Integer oldAssignmentId;

	private Integer status;

	private String teacherFilePath;

	private Integer testParentId;

	private String title;

	private String type;

	@Column(name="qrcode_url")
	private String qrcodeUrl;


	@Column(name="effective_days")
	private Integer effectiveDays;

	private String evaluation;

	private String keyword;

	private String conclusion;

	private Integer categoryId;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	//bi-directional many-to-one association to WkFolder
	@ManyToOne
	@JoinColumn(name="folder_id")
	private WkFolder wkFolder;


	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User user;

	@ManyToOne
	@JoinColumn(name="exam_questionpool_id")
	private ExamQuestionpool examQuestionpool;

	//bi-directional many-to-one association to TAssignmentAnswerAssign
	@OneToOne(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private TAssignmentAnswerAssign TAssignmentAnswerAssign;

	//bi-directional many-to-one association to TAssignmentControl
	@OneToOne(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private TAssignmentControl TAssignmentControl;

	//bi-directional many-to-one association to TAssignmentGrading
	@OneToMany(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TAssignmentGrading> TAssignmentGradings;

	//bi-directional many-to-one association to TAssignmentItemComponent
	@OneToMany(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TAssignmentItemComponent> TAssignmentItemComponents;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TAssignmentItemMapping> TAssignmentItemMappings;

	//bi-directional many-to-many association to TAssignmentQuestionpool
	@ManyToMany
	@JoinTable(
			name="t_assignment_question"
			, joinColumns={
			@JoinColumn(name="t_assignment_id")
	}
			, inverseJoinColumns={
			@JoinColumn(name="t_question_id")
	}
	)
	private Set<TAssignmentQuestionpool> TAssignmentQuestionpools;

	//bi-directional many-to-one association to TAssignmentSection
	@OneToMany(mappedBy="TAssignment", cascade = { CascadeType.REMOVE }, fetch = FetchType.EAGER)
	private Set<TAssignmentSection> TAssignmentSections;

	//bi-directional many-to-one association to TGradeObject
	@OneToMany(mappedBy="TAssignment",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TGradeObject> TGradeObjects;


	@Column(name="subscribe_exam_id")
	private Integer subScribeExamId;

	public TAssignment() {
	}
	public Integer getSubScribeExamId() {
		return subScribeExamId;
	}

	public void setSubScribeExamId(Integer subScribeExamId) {
		this.subScribeExamId = subScribeExamId;
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

	public Date getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIsCheckAll() {
		return this.isCheckAll;
	}

	public void setIsCheckAll(int isCheckAll) {
		this.isCheckAll = isCheckAll;
	}

	public Integer getIsGroup() {
		return this.isGroup;
	}

	public void setIsGroup(int isGroup) {
		this.isGroup = isGroup;
	}

	public Integer getIsSubmit() {
		return this.isSubmit;
	}

	public void setIsSubmit(int isSubmit) {
		this.isSubmit = isSubmit;
	}

	public Integer getMins() {
		return this.mins;
	}

	public void setMins(int mins) {
		this.mins = mins;
	}

	public Integer getNeedSubmit() {
		return this.needSubmit;
	}

	public void setNeedSubmit(int needSubmit) {
		this.needSubmit = needSubmit;
	}

	public Integer getSequence() {
		return this.sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public Integer getSiteId() {
		return this.siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getTeacherFilePath() {
		return this.teacherFilePath;
	}

	public void setTeacherFilePath(String teacherFilePath) {
		this.teacherFilePath = teacherFilePath;
	}

	public Integer getTestParentId() {
		return this.testParentId;
	}

	public void setTestParentId(int testParentId) {
		this.testParentId = testParentId;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public WkFolder getWkFolder() {
		return this.wkFolder;
	}

	public void setWkFolder(WkFolder wkFolder) {
		this.wkFolder = wkFolder;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(String schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}
	public String getIsMakeUpExam() {
		return this.isMakeUpExam;
	}

	public void setIsMakeUpExam(String isMakeUpExam) {
		this.isMakeUpExam = isMakeUpExam;
	}
	public Integer getOldAssignmentId() {
		return this.oldAssignmentId;
	}

	public void setOldAssignmentId(Integer oldAssignmentId) {
		this.oldAssignmentId = oldAssignmentId;
	}

	public String getQrcodeUrl() {
		return qrcodeUrl;
	}

	public void setQrcodeUrl(String qrcodeUrl) {
		this.qrcodeUrl = qrcodeUrl;
	}

	public ExamQuestionpool getExamQuestionpool() {
		return examQuestionpool;
	}

	public void setExamQuestionpool(ExamQuestionpool examQuestionpool) {
		this.examQuestionpool = examQuestionpool;
	}

	public TAssignmentAnswerAssign getTAssignmentAnswerAssign() {
		return this.TAssignmentAnswerAssign;
	}

	public void setTAssignmentAnswerAssign(TAssignmentAnswerAssign TAssignmentAnswerAssign) {
		this.TAssignmentAnswerAssign = TAssignmentAnswerAssign;
	}

	public TAssignmentControl getTAssignmentControl() {
		return this.TAssignmentControl;
	}

	public void setTAssignmentControl(TAssignmentControl TAssignmentControl) {
		this.TAssignmentControl = TAssignmentControl;
	}

	public Set<TAssignmentGrading> getTAssignmentGradings() {
		return this.TAssignmentGradings;
	}

	public void setTAssignmentGradings(Set<TAssignmentGrading> TAssignmentGradings) {
		this.TAssignmentGradings = TAssignmentGradings;
	}


	public Set<TAssignmentItemComponent> getTAssignmentItemComponents() {
		return this.TAssignmentItemComponents;
	}

	public void setTAssignmentItemMappings(Set<TAssignmentItemMapping> TAssignmentItemMappings) {
		this.TAssignmentItemMappings = TAssignmentItemMappings;
	}

	public Set<TAssignmentItemMapping> getTAssignmentItemMappings() {
		return this.TAssignmentItemMappings;
	}


	public void setTAssignmentItemComponents(Set<TAssignmentItemComponent> TAssignmentItemComponents) {
		this.TAssignmentItemComponents = TAssignmentItemComponents;
	}


	public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools() {
		return this.TAssignmentQuestionpools;
	}

	public void setTAssignmentQuestionpools(Set<TAssignmentQuestionpool> TAssignmentQuestionpools) {
		this.TAssignmentQuestionpools = TAssignmentQuestionpools;
	}

	public Set<TAssignmentSection> getTAssignmentSections() {
		return this.TAssignmentSections;
	}

	public void setTAssignmentSections(Set<TAssignmentSection> TAssignmentSections) {
		this.TAssignmentSections = TAssignmentSections;
	}


	public Set<TGradeObject> getTGradeObjects() {
		return this.TGradeObjects;
	}

	public void setTGradeObjects(Set<TGradeObject> TGradeObjects) {
		this.TGradeObjects = TGradeObjects;
	}

	public Integer getEffectiveDays() {
		return effectiveDays;
	}

	public void setEffectiveDays(Integer effectiveDays) {
		this.effectiveDays = effectiveDays;
	}

	public String getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(String evaluation) {
		this.evaluation = evaluation;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getConclusion() {
		return conclusion;
	}

	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}
}