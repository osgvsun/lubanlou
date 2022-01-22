package net.gvsun.gswork.domain;

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

	@Column(name="qrcode_url")
	private String qrcodeUrl;

	private Integer status;

	private String teacherFilePath;

	private Integer testParentId;

	private String title;

	private String type;

	private Integer categoryId;

	//bi-directional many-to-one association to WkFolder
	@ManyToOne
	@JoinColumn(name="folder_id")
	private WkFolder wkFolder;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User user;

	//bi-directional many-to-one association to TAssignmentAnswerAssign
	@OneToOne(mappedBy="TAssignment", cascade = { CascadeType.REMOVE })
	private TAssignmentAnswerAssign TAssignmentAnswerAssign;

	//bi-directional many-to-one association to TAssignmentControl
	@OneToOne(mappedBy="TAssignment", cascade = { CascadeType.REMOVE })
	private TAssignmentControl TAssignmentControl;

	//bi-directional many-to-one association to TAssignmentGrading
	@OneToMany(mappedBy="TAssignment", cascade = { CascadeType.REMOVE })
	private Set<TAssignmentGrading> TAssignmentGradings;



	@Column(name="subscribe_exam_id")
	private Integer subScribeExamId;

	public TAssignment() {
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
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

	public void setSiteId(int siteId) {
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

	public String getQrcodeUrl() {
		return this.qrcodeUrl;
	}

	public void setQrcodeUrl(String qrcodeUrl) {
		this.qrcodeUrl = qrcodeUrl;
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

	public TAssignmentGrading addTAssignmentGrading(TAssignmentGrading TAssignmentGrading) {
		getTAssignmentGradings().add(TAssignmentGrading);
		TAssignmentGrading.setTAssignment(this);

		return TAssignmentGrading;
	}

	public TAssignmentGrading removeTAssignmentGrading(TAssignmentGrading TAssignmentGrading) {
		getTAssignmentGradings().remove(TAssignmentGrading);
		TAssignmentGrading.setTAssignment(null);

		return TAssignmentGrading;
	}


}