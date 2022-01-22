package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_assignment_item database table.
 * 
 */
@Entity
@Table(name="t_assignment_item")
@NamedQuery(name="TAssignmentItem.findAll", query="SELECT t FROM TAssignmentItem t")
public class TAssignmentItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	private String description;

	private String descriptionTemp;

	private String grade;

	@Column(name="item_parent")
	private Integer itemParent;

	private Double score;

	private Integer sequence;

	private Integer status;

	private Integer type;

	private Integer flag;

	@Column(name="gaps_number")
	private Integer gapsNumber;

	@Column(name="is_order")
	private Integer isOrder;

	//bi-directional many-to-one association to TAssignmentAnswer
	@OneToMany(mappedBy="TAssignmentItem")
	@OrderBy(value="label ASC")
	private Set<TAssignmentAnswer> TAssignmentAnswers;

	//bi-directional many-to-one association to TAssignmentSection
	@ManyToOne
	@JoinColumn(name="section_id")
	private TAssignmentSection TAssignmentSection;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User user;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="TAssignmentItem")
	private Set<TAssignmentItemMapping> TAssignmentItemMappings;

	//bi-directional many-to-many association to TAssignmentQuestionpool
	@ManyToMany
	@JoinTable(
		name="t_assignment_questionpool_item"
		, joinColumns={
			@JoinColumn(name="item_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="questionpool_id")
			}
		)
	private Set<TAssignmentQuestionpool> TAssignmentQuestionpools;

	//bi-directional many-to-one association to TExerciseItemRecord
	@OneToMany(mappedBy="TAssignmentItem")
	private Set<TExerciseItemRecord> TExerciseItemRecords;

	//bi-directional many-to-one association to TMistakeItem
	@OneToMany(mappedBy="TAssignmentItem")
	private Set<TMistakeItem> TMistakeItems;

	@ManyToMany
	@JoinTable(
			name="exam_section_item"
			, joinColumns={
			@JoinColumn(name="item_id")
	}
			, inverseJoinColumns={
			@JoinColumn(name="exam_section_id")
	}
	)
	private Set<ExamSection> ExamSections;

	public TAssignmentItem() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getDescriptionTemp() {
		return this.descriptionTemp;
	}

	public void setDescriptionTemp(String descriptionTemp) {
		this.descriptionTemp = descriptionTemp;
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public Integer getItemParent() {
		return this.itemParent;
	}

	public void setItemParent(int itemParent) {
		this.itemParent = itemParent;
	}

	public Double getScore() {
		return this.score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Integer getSequence() {
		return this.sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Integer getFlag() {
		return this.flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public Integer getGapsNumber() {
		return this.gapsNumber;
	}

	public void setGapsNumber(int gapsNumber) {
		this.gapsNumber = gapsNumber;
	}

	public Integer getIsOrder() {
		return this.isOrder;
	}

	public void setIsOrder(int isOrder) {
		this.isOrder = isOrder;
	}

	public Set<TAssignmentAnswer> getTAssignmentAnswers() {
		return this.TAssignmentAnswers;
	}

	public void setTAssignmentAnswers(Set<TAssignmentAnswer> TAssignmentAnswers) {
		this.TAssignmentAnswers = TAssignmentAnswers;
	}

	public TAssignmentAnswer addTAssignmentAnswer(TAssignmentAnswer TAssignmentAnswer) {
		getTAssignmentAnswers().add(TAssignmentAnswer);
		TAssignmentAnswer.setTAssignmentItem(this);

		return TAssignmentAnswer;
	}

	public TAssignmentAnswer removeTAssignmentAnswer(TAssignmentAnswer TAssignmentAnswer) {
		getTAssignmentAnswers().remove(TAssignmentAnswer);
		TAssignmentAnswer.setTAssignmentItem(null);

		return TAssignmentAnswer;
	}

	public TAssignmentSection getTAssignmentSection() {
		return this.TAssignmentSection;
	}

	public void setTAssignmentSection(TAssignmentSection TAssignmentSection) {
		this.TAssignmentSection = TAssignmentSection;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<TAssignmentItemMapping> getTAssignmentItemMappings() {
		return this.TAssignmentItemMappings;
	}

	public void setTAssignmentItemMappings(Set<TAssignmentItemMapping> TAssignmentItemMappings) {
		this.TAssignmentItemMappings = TAssignmentItemMappings;
	}

	public TAssignmentItemMapping addTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().add(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentItem(this);

		return TAssignmentItemMapping;
	}

	public TAssignmentItemMapping removeTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().remove(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentItem(null);

		return TAssignmentItemMapping;
	}

	public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools() {
		return this.TAssignmentQuestionpools;
	}

	public void setTAssignmentQuestionpools(Set<TAssignmentQuestionpool> TAssignmentQuestionpools) {
		this.TAssignmentQuestionpools = TAssignmentQuestionpools;
	}

	public Set<TExerciseItemRecord> getTExerciseItemRecords() {
		return this.TExerciseItemRecords;
	}

	public void setTExerciseItemRecords(Set<TExerciseItemRecord> TExerciseItemRecords) {
		this.TExerciseItemRecords = TExerciseItemRecords;
	}

	public TExerciseItemRecord addTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().add(TExerciseItemRecord);
		TExerciseItemRecord.setTAssignmentItem(this);

		return TExerciseItemRecord;
	}

	public TExerciseItemRecord removeTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().remove(TExerciseItemRecord);
		TExerciseItemRecord.setTAssignmentItem(null);

		return TExerciseItemRecord;
	}

	public Set<TMistakeItem> getTMistakeItems() {
		return this.TMistakeItems;
	}

	public void setTMistakeItems(Set<TMistakeItem> TMistakeItems) {
		this.TMistakeItems = TMistakeItems;
	}

	public TMistakeItem addTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().add(TMistakeItem);
		TMistakeItem.setTAssignmentItem(this);

		return TMistakeItem;
	}

	public TMistakeItem removeTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().remove(TMistakeItem);
		TMistakeItem.setTAssignmentItem(null);

		return TMistakeItem;
	}

	public Set<ExamSection> getExamSections() {
		return ExamSections;
	}

	public TAssignmentItem setExamSections(Set<ExamSection> examSections) {
		ExamSections = examSections;
		return this;
	}
}