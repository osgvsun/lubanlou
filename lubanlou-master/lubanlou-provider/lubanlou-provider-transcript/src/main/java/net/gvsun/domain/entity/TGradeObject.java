package net.gvsun.domain.entity;

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
	@Column(name="assignment_id")
	private  String assignmentId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="due_time")
	private Date dueTime;

	private Integer marked;

	@Column(name="points_possible")
	private BigDecimal pointsPossible;
	@Column(name="grade_id")
	private Integer gradeId;

	private Integer released;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_time")
	private Date startTime;

	private String title;

	private String type;
	private String module;

	private BigDecimal weight;
	@Column(name="experiment_title")
	private String experimentTitle;
	@Column(name="experiment_id")
	private Integer experimentId;
	@Column(name="is_open")
	private Integer isOpen;



	public TGradeObject() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAssignmentId() {
		return assignmentId;
	}

	public void setAssignmentId(String assignmentId) {
		this.assignmentId = assignmentId;
	}

	public Date getDueTime() {
		return dueTime;
	}

	public void setDueTime(Date dueTime) {
		this.dueTime = dueTime;
	}

	public Integer getMarked() {
		return marked;
	}

	public void setMarked(Integer marked) {
		this.marked = marked;
	}

	public BigDecimal getPointsPossible() {
		return pointsPossible;
	}

	public void setPointsPossible(BigDecimal pointsPossible) {
		this.pointsPossible = pointsPossible;
	}

	public Integer getGradeId() {
		return gradeId;
	}

	public void setGradeId(Integer gradeId) {
		this.gradeId = gradeId;
	}

	public Integer getReleased() {
		return released;
	}

	public void setReleased(Integer released) {
		this.released = released;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public String getExperimentTitle() {
		return experimentTitle;
	}

	public void setExperimentTitle(String experimentTitle) {
		this.experimentTitle = experimentTitle;
	}

	public Integer getExperimentId() {
		return experimentId;
	}

	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}

	public Integer getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Integer isOpen) {
		this.isOpen = isOpen;
	}
}