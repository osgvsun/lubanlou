package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_exercise_item_record database table.
 * 
 */
@Entity
@Table(name="t_exercise_item_record")
@NamedQuery(name="TExerciseItemRecord.findAll", query="SELECT t FROM TExerciseItemRecord t")
public class TExerciseItemRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	@Column(name="exercise_type")
	private String exerciseType;

	private Integer iscorrect;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_date")
	private Date modifyDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="submit_date")
	private Date submitDate;

	//bi-directional many-to-one association to TExerciseAnswerRecord
	@OneToMany(mappedBy="TExerciseItemRecord")
	private Set<TExerciseAnswerRecord> TExerciseAnswerRecords;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to TAssignmentItem
	@ManyToOne
	@JoinColumn(name="item_id")
	private TAssignmentItem TAssignmentItem;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@ManyToOne
	@JoinColumn(name="question_id")
	private TAssignmentQuestionpool TAssignmentQuestionpool;

	public TExerciseItemRecord() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getExerciseType() {
		return this.exerciseType;
	}

	public void setExerciseType(String exerciseType) {
		this.exerciseType = exerciseType;
	}

	public Integer getIscorrect() {
		return this.iscorrect;
	}

	public void setIscorrect(int iscorrect) {
		this.iscorrect = iscorrect;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Date getSubmitDate() {
		return this.submitDate;
	}

	public void setSubmitDate(Date submitDate) {
		this.submitDate = submitDate;
	}

	public Set<TExerciseAnswerRecord> getTExerciseAnswerRecords() {
		return this.TExerciseAnswerRecords;
	}

	public void setTExerciseAnswerRecords(Set<TExerciseAnswerRecord> TExerciseAnswerRecords) {
		this.TExerciseAnswerRecords = TExerciseAnswerRecords;
	}

	public TExerciseAnswerRecord addTExerciseAnswerRecord(TExerciseAnswerRecord TExerciseAnswerRecord) {
		getTExerciseAnswerRecords().add(TExerciseAnswerRecord);
		TExerciseAnswerRecord.setTExerciseItemRecord(this);

		return TExerciseAnswerRecord;
	}

	public TExerciseAnswerRecord removeTExerciseAnswerRecord(TExerciseAnswerRecord TExerciseAnswerRecord) {
		getTExerciseAnswerRecords().remove(TExerciseAnswerRecord);
		TExerciseAnswerRecord.setTExerciseItemRecord(null);

		return TExerciseAnswerRecord;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public TAssignmentItem getTAssignmentItem() {
		return this.TAssignmentItem;
	}

	public void setTAssignmentItem(TAssignmentItem TAssignmentItem) {
		this.TAssignmentItem = TAssignmentItem;
	}

	public TAssignmentQuestionpool getTAssignmentQuestionpool() {
		return this.TAssignmentQuestionpool;
	}

	public void setTAssignmentQuestionpool(TAssignmentQuestionpool TAssignmentQuestionpool) {
		this.TAssignmentQuestionpool = TAssignmentQuestionpool;
	}

}