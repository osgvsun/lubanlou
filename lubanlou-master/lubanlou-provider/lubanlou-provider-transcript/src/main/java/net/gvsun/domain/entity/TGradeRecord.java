package net.gvsun.domain.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_grade_record database table.
 * 
 */
@Entity
@Table(name="t_grade_record")
@NamedQuery(name="TGradeRecord.findAll", query="SELECT t FROM TGradeRecord t")
public class TGradeRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "student_number")
	private String studentNumber;

	private String cname;

	private BigDecimal points;

	@Column(name="object_id")
	private Integer objectId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="record_time")
	private Date recordTime;

	@Column(name="weight_id")
	private Integer weightId;

	@Column(name = "grade_by")
	private String gradeBy;

	@Column(name = "grade_cname")
	private String gradeCname;

	public TGradeRecord() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public BigDecimal getPoints() {
		return points;
	}

	public void setPoints(BigDecimal points) {
		this.points = points;
	}


	public Date getRecordTime() {
		return recordTime;
	}

	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	public String getStudentNumber() {
		return studentNumber;
	}

	public void setStudentNumber(String studentNumber) {
		this.studentNumber = studentNumber;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Integer getObjectId() {
		return objectId;
	}

	public void setObjectId(Integer objectId) {
		this.objectId = objectId;
	}

	public Integer getWeightId() {
		return weightId;
	}

	public void setWeightId(Integer weightId) {
		this.weightId = weightId;
	}

	public String getGradeBy() {
		return gradeBy;
	}

	public void setGradeBy(String gradeBy) {
		this.gradeBy = gradeBy;
	}

	public String getGradeCname() {
		return gradeCname;
	}

	public void setGradeCname(String gradeCname) {
		this.gradeCname = gradeCname;
	}
}