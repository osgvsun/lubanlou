package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_academy database table.
 * 
 */
@Entity
@Table(name="school_academy")
@NamedQuery(name="SchoolAcademy.findAll", query="SELECT s FROM SchoolAcademy s")
public class SchoolAcademy implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="academy_number")
	private String academyNumber;

	@Column(name="academy_name")
	private String academyName;

	@Column(name="academy_type")
	private String academyType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="is_vaild")
	private byte isVaild;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SchoolCourse> schoolCourses;

	//bi-directional many-to-one association to SchoolCourseDetail
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SchoolCourseDetail> schoolCourseDetails;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SchoolCourseStudent> schoolCourseStudents;

	//bi-directional many-to-one association to SchoolDevice
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SchoolDevice> schoolDevices;

	//bi-directional many-to-one association to SchoolMajor
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SchoolMajor> schoolMajors;

	//bi-directional many-to-one association to SystemBuild
	@OneToMany(mappedBy="schoolAcademy")
	private Set<SystemBuild> systemBuilds;


	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="schoolAcademy")
	private Set<TCourseSiteCopy> TCourseSiteCopies;

	//bi-directional many-to-one association to User
	@OneToMany(mappedBy="schoolAcademy")
	private Set<User> users;

	public SchoolAcademy() {
	}

	public String getAcademyNumber() {
		return this.academyNumber;
	}

	public void setAcademyNumber(String academyNumber) {
		this.academyNumber = academyNumber;
	}

	public String getAcademyName() {
		return this.academyName;
	}

	public void setAcademyName(String academyName) {
		this.academyName = academyName;
	}

	public String getAcademyType() {
		return this.academyType;
	}

	public void setAcademyType(String academyType) {
		this.academyType = academyType;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public byte getIsVaild() {
		return this.isVaild;
	}

	public void setIsVaild(byte isVaild) {
		this.isVaild = isVaild;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Set<SchoolCourse> getSchoolCourses() {
		return this.schoolCourses;
	}

	public void setSchoolCourses(Set<SchoolCourse> schoolCourses) {
		this.schoolCourses = schoolCourses;
	}

	public SchoolCourse addSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().add(schoolCours);
		schoolCours.setSchoolAcademy(this);

		return schoolCours;
	}

	public SchoolCourse removeSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().remove(schoolCours);
		schoolCours.setSchoolAcademy(null);

		return schoolCours;
	}

	public Set<SchoolCourseDetail> getSchoolCourseDetails() {
		return this.schoolCourseDetails;
	}

	public void setSchoolCourseDetails(Set<SchoolCourseDetail> schoolCourseDetails) {
		this.schoolCourseDetails = schoolCourseDetails;
	}

	public SchoolCourseDetail addSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().add(schoolCourseDetail);
		schoolCourseDetail.setSchoolAcademy(this);

		return schoolCourseDetail;
	}

	public SchoolCourseDetail removeSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().remove(schoolCourseDetail);
		schoolCourseDetail.setSchoolAcademy(null);

		return schoolCourseDetail;
	}

	public Set<SchoolCourseStudent> getSchoolCourseStudents() {
		return this.schoolCourseStudents;
	}

	public void setSchoolCourseStudents(Set<SchoolCourseStudent> schoolCourseStudents) {
		this.schoolCourseStudents = schoolCourseStudents;
	}

	public SchoolCourseStudent addSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().add(schoolCourseStudent);
		schoolCourseStudent.setSchoolAcademy(this);

		return schoolCourseStudent;
	}

	public SchoolCourseStudent removeSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().remove(schoolCourseStudent);
		schoolCourseStudent.setSchoolAcademy(null);

		return schoolCourseStudent;
	}

	public Set<SchoolDevice> getSchoolDevices() {
		return this.schoolDevices;
	}

	public void setSchoolDevices(Set<SchoolDevice> schoolDevices) {
		this.schoolDevices = schoolDevices;
	}

	public SchoolDevice addSchoolDevice(SchoolDevice schoolDevice) {
		getSchoolDevices().add(schoolDevice);
		schoolDevice.setSchoolAcademy(this);

		return schoolDevice;
	}

	public SchoolDevice removeSchoolDevice(SchoolDevice schoolDevice) {
		getSchoolDevices().remove(schoolDevice);
		schoolDevice.setSchoolAcademy(null);

		return schoolDevice;
	}

	public Set<SchoolMajor> getSchoolMajors() {
		return this.schoolMajors;
	}

	public void setSchoolMajors(Set<SchoolMajor> schoolMajors) {
		this.schoolMajors = schoolMajors;
	}

	public SchoolMajor addSchoolMajor(SchoolMajor schoolMajor) {
		getSchoolMajors().add(schoolMajor);
		schoolMajor.setSchoolAcademy(this);

		return schoolMajor;
	}

	public SchoolMajor removeSchoolMajor(SchoolMajor schoolMajor) {
		getSchoolMajors().remove(schoolMajor);
		schoolMajor.setSchoolAcademy(null);

		return schoolMajor;
	}

	public Set<SystemBuild> getSystemBuilds() {
		return this.systemBuilds;
	}

	public void setSystemBuilds(Set<SystemBuild> systemBuilds) {
		this.systemBuilds = systemBuilds;
	}

	public SystemBuild addSystemBuild(SystemBuild systemBuild) {
		getSystemBuilds().add(systemBuild);
		systemBuild.setSchoolAcademy(this);

		return systemBuild;
	}

	public SystemBuild removeSystemBuild(SystemBuild systemBuild) {
		getSystemBuilds().remove(systemBuild);
		systemBuild.setSchoolAcademy(null);

		return systemBuild;
	}

	public Set<TCourseSiteCopy> getTCourseSiteCopies() {
		return this.TCourseSiteCopies;
	}

	public void setTCourseSiteCopies(Set<TCourseSiteCopy> TCourseSiteCopies) {
		this.TCourseSiteCopies = TCourseSiteCopies;
	}

	public TCourseSiteCopy addTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().add(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolAcademy(this);

		return TCourseSiteCopy;
	}

	public TCourseSiteCopy removeTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().remove(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolAcademy(null);

		return TCourseSiteCopy;
	}

	public Set<User> getUsers() {
		return this.users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setSchoolAcademy(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setSchoolAcademy(null);

		return user;
	}

}