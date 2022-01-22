package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_classes database table.
 * 
 */
@Entity
@Table(name="school_classes")
@NamedQuery(name="SchoolClass.findAll", query="SELECT s FROM SchoolClass s")
public class SchoolClass implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="class_number")
	private String classNumber;

	@Column(name="academy_number")
	private String academyNumber;

	@Column(name="attendance_time")
	private String attendanceTime;

	@Column(name="class_grade")
	private String classGrade;

	@Column(name="class_name")
	private String className;

	@Column(name="class_plan_students")
	private String classPlanStudents;

	@Column(name="class_short_name")
	private String classShortName;

	@Column(name="class_students_number")
	private String classStudentsNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	private Integer id;

	@Column(name="major_number")
	private String majorNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="schoolClass")
	private Set<SchoolCourseStudent> schoolCourseStudents;

	//bi-directional many-to-one association to User
	@OneToMany(mappedBy="schoolClass")
	private Set<User> users;

	public SchoolClass() {
	}

	public String getClassNumber() {
		return this.classNumber;
	}

	public void setClassNumber(String classNumber) {
		this.classNumber = classNumber;
	}

	public String getAcademyNumber() {
		return this.academyNumber;
	}

	public void setAcademyNumber(String academyNumber) {
		this.academyNumber = academyNumber;
	}

	public String getAttendanceTime() {
		return this.attendanceTime;
	}

	public void setAttendanceTime(String attendanceTime) {
		this.attendanceTime = attendanceTime;
	}

	public String getClassGrade() {
		return this.classGrade;
	}

	public void setClassGrade(String classGrade) {
		this.classGrade = classGrade;
	}

	public String getClassName() {
		return this.className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getClassPlanStudents() {
		return this.classPlanStudents;
	}

	public void setClassPlanStudents(String classPlanStudents) {
		this.classPlanStudents = classPlanStudents;
	}

	public String getClassShortName() {
		return this.classShortName;
	}

	public void setClassShortName(String classShortName) {
		this.classShortName = classShortName;
	}

	public String getClassStudentsNumber() {
		return this.classStudentsNumber;
	}

	public void setClassStudentsNumber(String classStudentsNumber) {
		this.classStudentsNumber = classStudentsNumber;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMajorNumber() {
		return this.majorNumber;
	}

	public void setMajorNumber(String majorNumber) {
		this.majorNumber = majorNumber;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Set<SchoolCourseStudent> getSchoolCourseStudents() {
		return this.schoolCourseStudents;
	}

	public void setSchoolCourseStudents(Set<SchoolCourseStudent> schoolCourseStudents) {
		this.schoolCourseStudents = schoolCourseStudents;
	}

	public SchoolCourseStudent addSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().add(schoolCourseStudent);
		schoolCourseStudent.setSchoolClass(this);

		return schoolCourseStudent;
	}

	public SchoolCourseStudent removeSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().remove(schoolCourseStudent);
		schoolCourseStudent.setSchoolClass(null);

		return schoolCourseStudent;
	}

	public Set<User> getUsers() {
		return this.users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setSchoolClass(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setSchoolClass(null);

		return user;
	}

}