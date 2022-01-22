package net.gvsun.gsquestionpool.domain;

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

	private BigDecimal points;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="record_time")
	private Date recordTime;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="student_number")
	private User user;

	//bi-directional many-to-one association to TGradeObject
	@ManyToOne
	@JoinColumn(name="object_id")
	private TGradeObject TGradeObject;

	public TGradeRecord() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getPoints() {
		return this.points;
	}

	public void setPoints(BigDecimal points) {
		this.points = points;
	}

	public Date getRecordTime() {
		return this.recordTime;
	}

	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TGradeObject getTGradeObject() {
		return this.TGradeObject;
	}

	public void setTGradeObject(TGradeObject TGradeObject) {
		this.TGradeObject = TGradeObject;
	}

}