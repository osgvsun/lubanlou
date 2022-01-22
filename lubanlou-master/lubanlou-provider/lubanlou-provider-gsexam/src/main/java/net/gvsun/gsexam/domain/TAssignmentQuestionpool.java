package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_assignment_questionpool database table.
 * 
 */
@Entity
@Table(name="t_assignment_questionpool")
@NamedQuery(name="TAssignmentQuestionpool.findAll", query="SELECT t FROM TAssignmentQuestionpool t")
public class TAssignmentQuestionpool implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="questionpool_id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer questionpoolId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	private String description;

	@Column(name="is_open")
	private Integer isOpen;

	@Column(name="is_test")
	private Integer isTest;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_time")
	private Date modifyTime;

	private String title;

	@Column(name="title_num")
	private Integer titleNum;

	private Integer type;

	//bi-directional many-to-one association to TAssignmentItemComponent
	@OneToMany(mappedBy="TAssignmentQuestionpool")
	private Set<net.gvsun.gsexam.domain.TAssignmentItemComponent> TAssignmentItemComponents;

	//bi-directional many-to-many association to TAssignment
	@ManyToMany(mappedBy = "TAssignmentQuestionpools")
	private Set<net.gvsun.gsexam.domain.TAssignment> TAssignments;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@ManyToOne
	@JoinColumn(name="parentpool_id")
	private net.gvsun.gsexam.domain.TAssignmentQuestionpool TAssignmentQuestionpool;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@OneToMany(mappedBy="TAssignmentQuestionpool")
	private Set<net.gvsun.gsexam.domain.TAssignmentQuestionpool> TAssignmentQuestionpools;
	@ManyToOne
	@JoinColumn(name="category_id")
	private net.gvsun.gsexam.domain.QuestionpoolCategory QuestionpoolCategory;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="owner")
	private net.gvsun.gsexam.domain.User user;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="TAssignmentQuestionpools2")
	private Set<net.gvsun.gsexam.domain.User> users;

	//bi-directional many-to-many association to TAssignmentItem
	@ManyToMany
	@JoinTable(
			name="t_assignment_questionpool_item"
			, joinColumns={
			@JoinColumn(name="questionpool_id")
	}
			, inverseJoinColumns={
			@JoinColumn(name="item_id")
	}
	)
	private Set<net.gvsun.gsexam.domain.TAssignmentItem> TAssignmentItems;

	//bi-directional many-to-many association to TCourseSite
	@ManyToMany
	@JoinTable(
		name="t_course_questionpool"
		, joinColumns={
			@JoinColumn(name="t_questionpool_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="t_course_site_id")
			}
		)
	private Set<net.gvsun.gsexam.domain.TCourseSite> TCourseSites;

	//bi-directional many-to-one association to TExerciseInfo
	@OneToMany(mappedBy="TAssignmentQuestionpool")
	private Set<net.gvsun.gsexam.domain.TExerciseInfo> TExerciseInfos;

	//bi-directional many-to-one association to TExerciseItemRecord
	@OneToMany(mappedBy="TAssignmentQuestionpool")
	private Set<net.gvsun.gsexam.domain.TExerciseItemRecord> TExerciseItemRecords;

	public net.gvsun.gsexam.domain.QuestionpoolCategory getQuestionpoolCategory() {
		return QuestionpoolCategory;
	}

	public net.gvsun.gsexam.domain.TAssignmentQuestionpool setQuestionpoolCategory(net.gvsun.gsexam.domain.QuestionpoolCategory questionpoolCategory) {
		QuestionpoolCategory = questionpoolCategory;
		return this;
	}

	//bi-directional many-to-one association to TMistakeItem
	@OneToMany(mappedBy="TAssignmentQuestionpool")
	private Set<net.gvsun.gsexam.domain.TMistakeItem> TMistakeItems;

	public TAssignmentQuestionpool() {
	}

	public Integer getQuestionpoolId() {
		return this.questionpoolId;
	}

	public void setQuestionpoolId(int questionpoolId) {
		this.questionpoolId = questionpoolId;
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

	public Integer getIsOpen() {
		return this.isOpen;
	}

	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}

	public Integer getIsTest() {
		return this.isTest;
	}

	public void setIsTest(int isTest) {
		this.isTest = isTest;
	}

	public Date getModifyTime() {
		return this.modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getTitleNum() {
		return this.titleNum;
	}

	public void setTitleNum(int titleNum) {
		this.titleNum = titleNum;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Set<net.gvsun.gsexam.domain.TAssignmentItemComponent> getTAssignmentItemComponents() {
		return this.TAssignmentItemComponents;
	}

	public void setTAssignmentItemComponents(Set<net.gvsun.gsexam.domain.TAssignmentItemComponent> TAssignmentItemComponents) {
		this.TAssignmentItemComponents = TAssignmentItemComponents;
	}

	public net.gvsun.gsexam.domain.TAssignmentItemComponent addTAssignmentItemComponent(net.gvsun.gsexam.domain.TAssignmentItemComponent TAssignmentItemComponent) {
		getTAssignmentItemComponents().add(TAssignmentItemComponent);
		TAssignmentItemComponent.setTAssignmentQuestionpool(this);

		return TAssignmentItemComponent;
	}

	public net.gvsun.gsexam.domain.TAssignmentItemComponent removeTAssignmentItemComponent(TAssignmentItemComponent TAssignmentItemComponent) {
		getTAssignmentItemComponents().remove(TAssignmentItemComponent);
		TAssignmentItemComponent.setTAssignmentQuestionpool(null);

		return TAssignmentItemComponent;
	}

	public Set<net.gvsun.gsexam.domain.TAssignment> getTAssignments() {
		return this.TAssignments;
	}

	public void setTAssignments(Set<TAssignment> TAssignments) {
		this.TAssignments = TAssignments;
	}

	public net.gvsun.gsexam.domain.TAssignmentQuestionpool getTAssignmentQuestionpool() {
		return this.TAssignmentQuestionpool;
	}

	public void setTAssignmentQuestionpool(net.gvsun.gsexam.domain.TAssignmentQuestionpool TAssignmentQuestionpool) {
		this.TAssignmentQuestionpool = TAssignmentQuestionpool;
	}

	public Set<net.gvsun.gsexam.domain.TAssignmentQuestionpool> getTAssignmentQuestionpools() {
		return this.TAssignmentQuestionpools;
	}

	public void setTAssignmentQuestionpools(Set<net.gvsun.gsexam.domain.TAssignmentQuestionpool> TAssignmentQuestionpools) {
		this.TAssignmentQuestionpools = TAssignmentQuestionpools;
	}

	public net.gvsun.gsexam.domain.TAssignmentQuestionpool addTAssignmentQuestionpool(net.gvsun.gsexam.domain.TAssignmentQuestionpool TAssignmentQuestionpool) {
		getTAssignmentQuestionpools().add(TAssignmentQuestionpool);
		TAssignmentQuestionpool.setTAssignmentQuestionpool(this);

		return TAssignmentQuestionpool;
	}

	public net.gvsun.gsexam.domain.TAssignmentQuestionpool removeTAssignmentQuestionpool(net.gvsun.gsexam.domain.TAssignmentQuestionpool TAssignmentQuestionpool) {
		getTAssignmentQuestionpools().remove(TAssignmentQuestionpool);
		TAssignmentQuestionpool.setTAssignmentQuestionpool(null);

		return TAssignmentQuestionpool;
	}

	public net.gvsun.gsexam.domain.User getUser() {
		return this.user;
	}

	public void setUser(net.gvsun.gsexam.domain.User user) {
		this.user = user;
	}

	public Set<net.gvsun.gsexam.domain.User> getUsers() {
		return this.users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public Set<net.gvsun.gsexam.domain.TAssignmentItem> getTAssignmentItems() {
		return this.TAssignmentItems;
	}

	public void setTAssignmentItems(Set<TAssignmentItem> TAssignmentItems) {
		this.TAssignmentItems = TAssignmentItems;
	}

	public Set<net.gvsun.gsexam.domain.TCourseSite> getTCourseSites() {
		return this.TCourseSites;
	}

	public void setTCourseSites(Set<TCourseSite> TCourseSites) {
		this.TCourseSites = TCourseSites;
	}

	public Set<net.gvsun.gsexam.domain.TExerciseInfo> getTExerciseInfos() {
		return this.TExerciseInfos;
	}

	public void setTExerciseInfos(Set<net.gvsun.gsexam.domain.TExerciseInfo> TExerciseInfos) {
		this.TExerciseInfos = TExerciseInfos;
	}

	public net.gvsun.gsexam.domain.TExerciseInfo addTExerciseInfo(net.gvsun.gsexam.domain.TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().add(TExerciseInfo);
		TExerciseInfo.setTAssignmentQuestionpool(this);

		return TExerciseInfo;
	}

	public net.gvsun.gsexam.domain.TExerciseInfo removeTExerciseInfo(TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().remove(TExerciseInfo);
		TExerciseInfo.setTAssignmentQuestionpool(null);

		return TExerciseInfo;
	}

	public Set<net.gvsun.gsexam.domain.TExerciseItemRecord> getTExerciseItemRecords() {
		return this.TExerciseItemRecords;
	}

	public void setTExerciseItemRecords(Set<net.gvsun.gsexam.domain.TExerciseItemRecord> TExerciseItemRecords) {
		this.TExerciseItemRecords = TExerciseItemRecords;
	}

	public net.gvsun.gsexam.domain.TExerciseItemRecord addTExerciseItemRecord(net.gvsun.gsexam.domain.TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().add(TExerciseItemRecord);
		TExerciseItemRecord.setTAssignmentQuestionpool(this);

		return TExerciseItemRecord;
	}

	public net.gvsun.gsexam.domain.TExerciseItemRecord removeTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().remove(TExerciseItemRecord);
		TExerciseItemRecord.setTAssignmentQuestionpool(null);

		return TExerciseItemRecord;
	}

	public Set<net.gvsun.gsexam.domain.TMistakeItem> getTMistakeItems() {
		return this.TMistakeItems;
	}

	public void setTMistakeItems(Set<net.gvsun.gsexam.domain.TMistakeItem> TMistakeItems) {
		this.TMistakeItems = TMistakeItems;
	}

	public net.gvsun.gsexam.domain.TMistakeItem addTMistakeItem(net.gvsun.gsexam.domain.TMistakeItem TMistakeItem) {
		getTMistakeItems().add(TMistakeItem);
		TMistakeItem.setTAssignmentQuestionpool(this);

		return TMistakeItem;
	}

	public net.gvsun.gsexam.domain.TMistakeItem removeTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().remove(TMistakeItem);
		TMistakeItem.setTAssignmentQuestionpool(null);

		return TMistakeItem;
	}

}