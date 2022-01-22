package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the timetable_appointment_same_number database table.
 * 
 */
@Entity
@Table(name="timetable_appointment_same_number")
@NamedQuery(name="TimetableAppointmentSameNumber.findAll", query="SELECT t FROM TimetableAppointmentSameNumber t")
public class TimetableAppointmentSameNumber implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="created_by")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="end_class")
	private Integer endClass;

	@Column(name="end_week")
	private Integer endWeek;

	@Column(name="start_class")
	private Integer startClass;

	@Column(name="start_week")
	private Integer startWeek;

	@Column(name="total_classes")
	private Integer totalClasses;

	@Column(name="total_weeks")
	private String totalWeeks;

	@Column(name="updated_by")
	private String updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;

	private Integer weekday;

	//bi-directional many-to-one association to TimetableAppointment
	@ManyToOne
	@JoinColumn(name="appointment_id")
	private TimetableAppointment timetableAppointment;

	public TimetableAppointmentSameNumber() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Integer getEndClass() {
		return this.endClass;
	}

	public void setEndClass(int endClass) {
		this.endClass = endClass;
	}

	public Integer getEndWeek() {
		return this.endWeek;
	}

	public void setEndWeek(int endWeek) {
		this.endWeek = endWeek;
	}

	public Integer getStartClass() {
		return this.startClass;
	}

	public void setStartClass(int startClass) {
		this.startClass = startClass;
	}

	public Integer getStartWeek() {
		return this.startWeek;
	}

	public void setStartWeek(int startWeek) {
		this.startWeek = startWeek;
	}

	public Integer getTotalClasses() {
		return this.totalClasses;
	}

	public void setTotalClasses(int totalClasses) {
		this.totalClasses = totalClasses;
	}

	public String getTotalWeeks() {
		return this.totalWeeks;
	}

	public void setTotalWeeks(String totalWeeks) {
		this.totalWeeks = totalWeeks;
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

	public Integer getWeekday() {
		return this.weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}

	public TimetableAppointment getTimetableAppointment() {
		return this.timetableAppointment;
	}

	public void setTimetableAppointment(TimetableAppointment timetableAppointment) {
		this.timetableAppointment = timetableAppointment;
	}

}