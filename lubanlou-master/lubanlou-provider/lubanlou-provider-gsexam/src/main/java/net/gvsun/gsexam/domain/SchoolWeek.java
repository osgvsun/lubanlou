package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the school_week database table.
 * 
 */
@Entity
@Table(name="school_week")
@NamedQuery(name="SchoolWeek.findAll", query="SELECT s FROM SchoolWeek s")
public class SchoolWeek implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Temporal(TemporalType.DATE)
	private Date date;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	private Integer week;

	private Integer weekday;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	public SchoolWeek() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getWeek() {
		return this.week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

	public Integer getWeekday() {
		return this.weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

}