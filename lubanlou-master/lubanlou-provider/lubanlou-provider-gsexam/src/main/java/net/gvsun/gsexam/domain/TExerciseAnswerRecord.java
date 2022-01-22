package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_exercise_answer_record database table.
 * 
 */
@Entity
@Table(name="t_exercise_answer_record")
@NamedQuery(name="TExerciseAnswerRecord.findAll", query="SELECT t FROM TExerciseAnswerRecord t")
public class TExerciseAnswerRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="answer_text")
	private String answerText;

	//bi-directional many-to-one association to TExerciseItemRecord
	@ManyToOne
	@JoinColumn(name="item_record_id")
	private TExerciseItemRecord TExerciseItemRecord;

	//bi-directional many-to-one association to TAssignmentAnswer
	@ManyToOne
	@JoinColumn(name="answer_id")
	private TAssignmentAnswer TAssignmentAnswer;

	public TExerciseAnswerRecord() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAnswerText() {
		return this.answerText;
	}

	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}

	public TExerciseItemRecord getTExerciseItemRecord() {
		return this.TExerciseItemRecord;
	}

	public void setTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		this.TExerciseItemRecord = TExerciseItemRecord;
	}

	public TAssignmentAnswer getTAssignmentAnswer() {
		return this.TAssignmentAnswer;
	}

	public void setTAssignmentAnswer(TAssignmentAnswer TAssignmentAnswer) {
		this.TAssignmentAnswer = TAssignmentAnswer;
	}

}