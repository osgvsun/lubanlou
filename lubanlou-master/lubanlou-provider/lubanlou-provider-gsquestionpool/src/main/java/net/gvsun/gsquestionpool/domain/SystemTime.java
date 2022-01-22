package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;


/**
 * The persistent class for the system_time database table.
 * 
 */
@Entity
@Table(name="system_time")
@NamedQuery(name="SystemTime.findAll", query="SELECT s FROM SystemTime s")
public class SystemTime implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String combine;

	@Column(name="created_by")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="end_date")
	private Time endDate;

	private String sequence;

	@Column(name="start_date")
	private Time startDate;

	@Column(name="time_name")
	private String timeName;

	@Column(name="updated_by")
	private String updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;
	//bi-directional many-to-one association to SystemCampus
	@ManyToOne
	@JoinColumn(name="campus_number")
	private SystemCampus systemCampus;

	public SystemTime() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCombine() {
		return this.combine;
	}

	public void setCombine(String combine) {
		this.combine = combine;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Time getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Time endDate) {
		this.endDate = endDate;
	}

	public String getSequence() {
		return this.sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public Time getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Time startDate) {
		this.startDate = startDate;
	}

	public String getTimeName() {
		return this.timeName;
	}

	public void setTimeName(String timeName) {
		this.timeName = timeName;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public SystemCampus getSystemCampus() {
		return this.systemCampus;
	}

	public void setSystemCampus(SystemCampus systemCampus) {
		this.systemCampus = systemCampus;
	}

}