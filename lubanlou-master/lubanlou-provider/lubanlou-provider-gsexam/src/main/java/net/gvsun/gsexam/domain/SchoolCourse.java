package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_course database table.
 * 
 */
@Entity
@Table(name="school_course")
@NamedQuery(name="SchoolCourse.findAll", query="SELECT s FROM SchoolCourse s")
public class SchoolCourse implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="course_no")
	private String courseNo;

	@Column(name="class_hour")
	private String classHour;

	@Column(name="classes_name")
	private String classesName;

	@Column(name="course_address_type")
	private String courseAddressType;

	@Column(name="course_code")
	private String courseCode;

	@Column(name="course_name")
	private String courseName;

	@Column(name="course_type")
	private String courseType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	private String credits;

	private String memo;

	@Column(name="plan_lab_time")
	private String planLabTime;

	@Column(name="plan_student_number")
	private String planStudentNumber;

	private Integer state;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User userByCreatedBy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="updated_by")
	private User userByUpdatedBy;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="teacher")
	private User userByTeacher;

	//bi-directional many-to-one association to SchoolCourseInfo
	@ManyToOne
	@JoinColumn(name="course_number")
	private SchoolCourseInfo schoolCourseInfo;

	//bi-directional many-to-one association to SchoolCourseDetail
	@OneToMany(mappedBy="schoolCourse")
	private Set<SchoolCourseDetail> schoolCourseDetails;

	//bi-directional many-to-one association to TCourseSite
	@OneToMany(mappedBy="schoolCourse")
	private Set<TCourseSite> TCourseSites;

	//bi-directional many-to-one association to TimetableAppointment
	@OneToMany(mappedBy="schoolCourse")
	private Set<TimetableAppointment> timetableAppointments;

	public SchoolCourse() {
	}

	public String getCourseNo() {
		return this.courseNo;
	}

	public void setCourseNo(String courseNo) {
		this.courseNo = courseNo;
	}

	public String getClassHour() {
		return this.classHour;
	}

	public void setClassHour(String classHour) {
		this.classHour = classHour;
	}

	public String getClassesName() {
		return this.classesName;
	}

	public void setClassesName(String classesName) {
		this.classesName = classesName;
	}

	public String getCourseAddressType() {
		return this.courseAddressType;
	}

	public void setCourseAddressType(String courseAddressType) {
		this.courseAddressType = courseAddressType;
	}

	public String getCourseCode() {
		return this.courseCode;
	}

	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}

	public String getCourseName() {
		return this.courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseType() {
		return this.courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCredits() {
		return this.credits;
	}

	public void setCredits(String credits) {
		this.credits = credits;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getPlanLabTime() {
		return this.planLabTime;
	}

	public void setPlanLabTime(String planLabTime) {
		this.planLabTime = planLabTime;
	}

	public String getPlanStudentNumber() {
		return this.planStudentNumber;
	}

	public void setPlanStudentNumber(String planStudentNumber) {
		this.planStudentNumber = planStudentNumber;
	}

	public Integer getState() {
		return this.state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public User getUserByCreatedBy() {
		return this.userByCreatedBy;
	}

	public void setUserByCreatedBy(User userByCreatedBy) {
		this.userByCreatedBy = userByCreatedBy;
	}

	public User getUserByUpdatedBy() {
		return this.userByUpdatedBy;
	}

	public void setUserByUpdatedBy(User userByUpdatedBy) {
		this.userByUpdatedBy = userByUpdatedBy;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public User getUserByTeacher() {
		return this.userByTeacher;
	}

	public void setUserByTeacher(User user3) {
		this.userByTeacher = userByTeacher;
	}

	public SchoolCourseInfo getSchoolCourseInfo() {
		return this.schoolCourseInfo;
	}

	public void setSchoolCourseInfo(SchoolCourseInfo schoolCourseInfo) {
		this.schoolCourseInfo = schoolCourseInfo;
	}

	public Set<SchoolCourseDetail> getSchoolCourseDetails() {
		return this.schoolCourseDetails;
	}

	public void setSchoolCourseDetails(Set<SchoolCourseDetail> schoolCourseDetails) {
		this.schoolCourseDetails = schoolCourseDetails;
	}

	public SchoolCourseDetail addSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().add(schoolCourseDetail);
		schoolCourseDetail.setSchoolCourse(this);

		return schoolCourseDetail;
	}

	public SchoolCourseDetail removeSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().remove(schoolCourseDetail);
		schoolCourseDetail.setSchoolCourse(null);

		return schoolCourseDetail;
	}

	public Set<TCourseSite> getTCourseSites() {
		return this.TCourseSites;
	}

	public void setTCourseSites(Set<TCourseSite> TCourseSites) {
		this.TCourseSites = TCourseSites;
	}

	public TCourseSite addTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().add(TCourseSite);
		TCourseSite.setSchoolCourse(this);

		return TCourseSite;
	}

	public TCourseSite removeTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().remove(TCourseSite);
		TCourseSite.setSchoolCourse(null);

		return TCourseSite;
	}

	public Set<TimetableAppointment> getTimetableAppointments() {
		return this.timetableAppointments;
	}

	public void setTimetableAppointments(Set<TimetableAppointment> timetableAppointments) {
		this.timetableAppointments = timetableAppointments;
	}

	public TimetableAppointment addTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().add(timetableAppointment);
		timetableAppointment.setSchoolCourse(this);

		return timetableAppointment;
	}

	public TimetableAppointment removeTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().remove(timetableAppointment);
		timetableAppointment.setSchoolCourse(null);

		return timetableAppointment;
	}

}