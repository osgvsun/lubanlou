package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_grade_object database table.
 * 
 */
@Entity
@Table(name="t_grade_object")
@NamedQuery(name="TGradeObject.findAll", query="SELECT t FROM TGradeObject t")
public class TGradeObject implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="due_time")
	private Date dueTime;

	private Integer marked;

	@Column(name="points_possible")
	private BigDecimal pointsPossible;

	private Integer released;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_time")
	private Date startTime;

	private String title;

	private String type;

	private BigDecimal weight;

	//bi-directional many-to-one association to TGradebook
	@ManyToOne
	@JoinColumn(name="grade_id")
	private TGradebook TGradebook;

	//bi-directional many-to-one association to TAssignment
	@ManyToOne
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	//bi-directional many-to-one association to TGradeRecord
	@OneToMany(mappedBy="TGradeObject")
	private Set<TGradeRecord> TGradeRecords;

	public TGradeObject() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDueTime() {
		return this.dueTime;
	}

	public void setDueTime(Date dueTime) {
		this.dueTime = dueTime;
	}

	public Integer getMarked() {
		return this.marked;
	}

	public void setMarked(int marked) {
		this.marked = marked;
	}

	public BigDecimal getPointsPossible() {
		return this.pointsPossible;
	}

	public void setPointsPossible(BigDecimal pointsPossible) {
		this.pointsPossible = pointsPossible;
	}

	public Integer getReleased() {
		return this.released;
	}

	public void setReleased(int released) {
		this.released = released;
	}

	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
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

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public TGradebook getTGradebook() {
		return this.TGradebook;
	}

	public void setTGradebook(TGradebook TGradebook) {
		this.TGradebook = TGradebook;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public Set<TGradeRecord> getTGradeRecords() {
		return this.TGradeRecords;
	}

	public void setTGradeRecords(Set<TGradeRecord> TGradeRecords) {
		this.TGradeRecords = TGradeRecords;
	}

	public TGradeRecord addTGradeRecord(TGradeRecord TGradeRecord) {
		getTGradeRecords().add(TGradeRecord);
		TGradeRecord.setTGradeObject(this);

		return TGradeRecord;
	}

	public TGradeRecord removeTGradeRecord(TGradeRecord TGradeRecord) {
		getTGradeRecords().remove(TGradeRecord);
		TGradeRecord.setTGradeObject(null);

		return TGradeRecord;
	}

}