package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_course_info database table.
 * 
 */
@Entity
@Table(name="school_course_info")
@NamedQuery(name="SchoolCourseInfo.findAll", query="SELECT s FROM SchoolCourseInfo s")
public class SchoolCourseInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="course_number")
	private String courseNumber;

	@Column(name="academy_number")
	private String academyNumber;

	@Column(name="course_en_name")
	private String courseEnName;

	@Column(name="course_name")
	private String courseName;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="created_by")
	private BigInteger createdBy;

	private Integer flag;

	@Column(name="theoretical_hours")
	private Integer theoreticalHours;

	@Column(name="total_hours")
	private Integer totalHours;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	@Column(name="updated_by")
	private BigInteger updatedBy;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="schoolCourseInfo")
	private Set<SchoolCourse> schoolCourses;

	//bi-directional many-to-one association to TCourseSite
	@OneToMany(mappedBy="schoolCourseInfo")
	private Set<TCourseSite> TCourseSites;

	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="schoolCourseInfo")
	private Set<TCourseSiteCopy> TCourseSiteCopies;

	//bi-directional many-to-one association to TimetableAppointment
	@OneToMany(mappedBy="schoolCourseInfo")
	private Set<TimetableAppointment> timetableAppointments;

	public SchoolCourseInfo() {
	}

	public String getCourseNumber() {
		return this.courseNumber;
	}

	public void setCourseNumber(String courseNumber) {
		this.courseNumber = courseNumber;
	}

	public String getAcademyNumber() {
		return this.academyNumber;
	}

	public void setAcademyNumber(String academyNumber) {
		this.academyNumber = academyNumber;
	}

	public String getCourseEnName() {
		return this.courseEnName;
	}

	public void setCourseEnName(String courseEnName) {
		this.courseEnName = courseEnName;
	}

	public String getCourseName() {
		return this.courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public BigInteger getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(BigInteger createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getFlag() {
		return this.flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Integer getTheoreticalHours() {
		return this.theoreticalHours;
	}

	public void setTheoreticalHours(Integer theoreticalHours) {
		this.theoreticalHours = theoreticalHours;
	}

	public Integer getTotalHours() {
		return this.totalHours;
	}

	public void setTotalHours(Integer totalHours) {
		this.totalHours = totalHours;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public BigInteger getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(BigInteger updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Set<SchoolCourse> getSchoolCourses() {
		return this.schoolCourses;
	}

	public void setSchoolCourses(Set<SchoolCourse> schoolCourses) {
		this.schoolCourses = schoolCourses;
	}

	public SchoolCourse addSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().add(schoolCours);
		schoolCours.setSchoolCourseInfo(this);

		return schoolCours;
	}

	public SchoolCourse removeSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().remove(schoolCours);
		schoolCours.setSchoolCourseInfo(null);

		return schoolCours;
	}

	public Set<TCourseSite> getTCourseSites() {
		return this.TCourseSites;
	}

	public void setTCourseSites(Set<TCourseSite> TCourseSites) {
		this.TCourseSites = TCourseSites;
	}

	public TCourseSite addTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().add(TCourseSite);
		TCourseSite.setSchoolCourseInfo(this);

		return TCourseSite;
	}

	public TCourseSite removeTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().remove(TCourseSite);
		TCourseSite.setSchoolCourseInfo(null);

		return TCourseSite;
	}

	public Set<TCourseSiteCopy> getTCourseSiteCopies() {
		return this.TCourseSiteCopies;
	}

	public void setTCourseSiteCopies(Set<TCourseSiteCopy> TCourseSiteCopies) {
		this.TCourseSiteCopies = TCourseSiteCopies;
	}

	public TCourseSiteCopy addTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().add(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolCourseInfo(this);

		return TCourseSiteCopy;
	}

	public TCourseSiteCopy removeTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().remove(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolCourseInfo(null);

		return TCourseSiteCopy;
	}

	public Set<TimetableAppointment> getTimetableAppointments() {
		return this.timetableAppointments;
	}

	public void setTimetableAppointments(Set<TimetableAppointment> timetableAppointments) {
		this.timetableAppointments = timetableAppointments;
	}

	public TimetableAppointment addTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().add(timetableAppointment);
		timetableAppointment.setSchoolCourseInfo(this);

		return timetableAppointment;
	}

	public TimetableAppointment removeTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().remove(timetableAppointment);
		timetableAppointment.setSchoolCourseInfo(null);

		return timetableAppointment;
	}

}