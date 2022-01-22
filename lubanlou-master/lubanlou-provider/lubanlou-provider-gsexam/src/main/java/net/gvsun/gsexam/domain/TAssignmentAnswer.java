package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;


/**
 * The persistent class for the t_assignment_answer database table.
 *
 */
@Entity
@Table(name="t_assignment_answer")
@NamedQuery(name="TAssignmentAnswer.findAll", query="SELECT t FROM TAssignmentAnswer t")
public class TAssignmentAnswer implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String grade;

	private Integer iscorrect;

	private String label;

	private BigDecimal score;

	private Integer sequence;

	private String text;

	private Double weight;

	//bi-directional many-to-one association to TAssignmentItem
	@ManyToOne
	@JoinColumn(name="item_id")
	private TAssignmentItem TAssignmentItem;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="TAssignmentAnswer",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TAssignmentItemMapping> TAssignmentItemMappings;

	//bi-directional many-to-one association to TExerciseAnswerRecord
	@OneToMany(mappedBy="TAssignmentAnswer",cascade={CascadeType.REMOVE},fetch= FetchType.LAZY)
	private Set<TExerciseAnswerRecord> TExerciseAnswerRecords;

	public TAssignmentAnswer() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public Integer getIscorrect() {
		return this.iscorrect;
	}

	public void setIscorrect(Integer iscorrect) {
		this.iscorrect = iscorrect;
	}

	public String getLabel() {
		return this.label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public BigDecimal getScore() {
		return this.score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}

	public Integer getSequence() {
		return this.sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public TAssignmentItem getTAssignmentItem() {
		return this.TAssignmentItem;
	}

	public void setTAssignmentItem(TAssignmentItem TAssignmentItem) {
		this.TAssignmentItem = TAssignmentItem;
	}

	public Set<TAssignmentItemMapping> getTAssignmentItemMappings() {
		return this.TAssignmentItemMappings;
	}

	public void setTAssignmentItemMappings(Set<TAssignmentItemMapping> TAssignmentItemMappings) {
		this.TAssignmentItemMappings = TAssignmentItemMappings;
	}

	public TAssignmentItemMapping addTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().add(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentAnswer(this);

		return TAssignmentItemMapping;
	}

	public TAssignmentItemMapping removeTAssignmentItemMapping(TAssignmentItemMapping TAssignmentItemMapping) {
		getTAssignmentItemMappings().remove(TAssignmentItemMapping);
		TAssignmentItemMapping.setTAssignmentAnswer(null);

		return TAssignmentItemMapping;
	}

	public Set<TExerciseAnswerRecord> getTExerciseAnswerRecords() {
		return this.TExerciseAnswerRecords;
	}

	public void setTExerciseAnswerRecords(Set<TExerciseAnswerRecord> TExerciseAnswerRecords) {
		this.TExerciseAnswerRecords = TExerciseAnswerRecords;
	}

	public TExerciseAnswerRecord addTExerciseAnswerRecord(TExerciseAnswerRecord TExerciseAnswerRecord) {
		getTExerciseAnswerRecords().add(TExerciseAnswerRecord);
		TExerciseAnswerRecord.setTAssignmentAnswer(this);

		return TExerciseAnswerRecord;
	}

	public TExerciseAnswerRecord removeTExerciseAnswerRecord(TExerciseAnswerRecord TExerciseAnswerRecord) {
		getTExerciseAnswerRecords().remove(TExerciseAnswerRecord);
		TExerciseAnswerRecord.setTAssignmentAnswer(null);

		return TExerciseAnswerRecord;
	}

}