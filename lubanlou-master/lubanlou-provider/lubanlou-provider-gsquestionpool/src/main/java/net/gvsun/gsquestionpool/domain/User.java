package net.gvsun.gsquestionpool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String username;

	@Column(name="attendance_time")
	private String attendanceTime;

	@Column(name="bachelor_major")
	private String bachelorMajor;

	private String cardno;

	private String cname;

	@Temporal(TemporalType.DATE)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="doctor_major")
	private String doctorMajor;

	private String duties;

	private String email;

	private Byte enabled;

	@Column(name="enrollment_status")
	private Integer enrollmentStatus;

	private String grade;

	@Column(name="if_enrollment")
	private String ifEnrollment;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_login")
	private Date lastLogin;

	@Column(name="major_direction")
	private String majorDirection;

	@Column(name="major_number")
	private String majorNumber;

	@Column(name="master_major")
	private String masterMajor;

	private String password;

	@Column(name="photo_url")
	private String photoUrl;

	private String qq;

	@Column(name="teacher_number")
	private Integer teacherNumber;

	private String telephone;

	@Temporal(TemporalType.DATE)
	@Column(name="updated_at")
	private Date updatedAt;

	@Column(name="user_role")
	private String userRole;

	@Column(name="user_sexy")
	private String userSexy;

	@Column(name="user_status")
	private String userStatus;

	@Column(name="user_type")
	private Integer userType;

	//bi-directional many-to-one association to Folder
	@OneToMany(mappedBy="user")
	private Set<Folder> folders;

	//bi-directional many-to-one association to TTestGrading
	@OneToMany(mappedBy="user")
	private List<TTestGrading> TTestGradings;

	//bi-directional many-to-one association to LabRoom
	@OneToMany(mappedBy="user")
	private Set<LabRoom> labRooms;
	//bi-directional many-to-one association to LabRoomDevice
	@OneToMany(mappedBy="user")
	private Set<LabRoomDevice> labRoomDevices;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="userByCreatedBy")
	private Set<SchoolCourse> schoolCoursesByCreatedBy;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="userByUpdatedBy")
	private Set<SchoolCourse> schoolCoursesByUpdatedBy;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="userByTeacher")
	private Set<SchoolCourse> schoolCoursesByTeacher;

	//bi-directional many-to-one association to SchoolCourseDetail
	@OneToMany(mappedBy="user")
	private Set<SchoolCourseDetail> schoolCourseDetails;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="userByTeacherNumber")
	private Set<SchoolCourseStudent> schoolCourseStudentsByTeacherNumber;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="userByStudentNumber")
	private Set<SchoolCourseStudent> schoolCourseStudentsByStudentNumber;

	//bi-directional many-to-one association to SchoolDevice
	@OneToMany(mappedBy="userByKeepUser")
	private Set<SchoolDevice> schoolDevicesByKeepUser;

	//bi-directional many-to-one association to SchoolDevice
	@OneToMany(mappedBy="userByUserNumber")
	private Set<SchoolDevice> schoolDevicesByUserNumber;

	//bi-directional many-to-one association to SystemBuild
	@OneToMany(mappedBy="userByCreatedBy")
	private Set<SystemBuild> systemBuildsByCreatedBy;

	//bi-directional many-to-one association to SystemBuild
	@OneToMany(mappedBy="userByUpdatedBy")
	private Set<SystemBuild> systemBuildsByUpdatedBy;

	//bi-directional many-to-one association to TAssignment
	@OneToMany(mappedBy="user")
	private Set<TAssignment> TAssignments;

	//bi-directional many-to-one association to TAssignmentAnswerAssign
	@OneToMany(mappedBy="user")
	private Set<TAssignmentAnswerAssign> TAssignmentAnswerAssigns;

	//bi-directional many-to-one association to TAssignmentGrading
	@OneToMany(mappedBy="userByStudent")
	private Set<TAssignmentGrading> TAssignmentGradingsByStudent;

	//bi-directional many-to-one association to TAssignmentGrading
	@OneToMany(mappedBy="userByGradeBy")
	private Set<TAssignmentGrading> TAssignmentGradingsByGradeBy;

	//bi-directional many-to-one association to TAssignmentItem
	@OneToMany(mappedBy="user")
	private Set<TAssignmentItem> TAssignmentItems;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="userByStudent")
	private Set<TAssignmentItemMapping> TAssignmentItemMappingsByStudent;

	//bi-directional many-to-one association to TAssignmentItemMapping
	@OneToMany(mappedBy="userByGradeby")
	private Set<TAssignmentItemMapping> TAssignmentItemMappingsByGradeby;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@OneToMany(mappedBy="user")
	private Set<TAssignmentQuestionpool> TAssignmentQuestionpools1;
	//bi-directional many-to-one association to TCourseSiteGroupJudge
	@OneToMany(mappedBy="user")
	private List<TCourseSiteGroupJudge> TCourseSiteGroupJudges;

	//bi-directional many-to-many association to TAssignmentQuestionpool
	@ManyToMany
	@JoinTable(
		name="t_assignment_questionpool_access"
		, joinColumns={
			@JoinColumn(name="manger")
			}
		, inverseJoinColumns={
			@JoinColumn(name="questionpool_id")
			}
		)
	private Set<TAssignmentQuestionpool> TAssignmentQuestionpools2;

	//bi-directional many-to-one association to TAssignmentSection
	@OneToMany(mappedBy="user")
	private Set<TAssignmentSection> TAssignmentSections;

	//bi-directional many-to-one association to TCourseSite
	@OneToMany(mappedBy="userByCreatedBy")
	private Set<TCourseSite> TCourseSitesByCreatedBy;

	//bi-directional many-to-one association to TCourseSite
	@OneToMany(mappedBy="userByModifiedBy")
	private Set<TCourseSite> TCourseSitesByModifiedBy;

	//bi-directional many-to-one association to TCourseSiteArtical
	@OneToMany(mappedBy="user")
	private Set<TCourseSiteArtical> TCourseSiteArticals;

	//bi-directional many-to-one association to TCourseSiteChannel
	@OneToMany(mappedBy="user")
	private Set<TCourseSiteChannel> TCourseSiteChannels;

	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="userByCreatedBy")
	private Set<TCourseSiteCopy> TCourseSiteCopiesByCreatedBy;

	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="userByModifiedBy")
	private Set<TCourseSiteCopy> TCourseSiteCopiesByModifiedBy;

	//bi-directional many-to-one association to TCourseSiteSchedule
	@OneToMany(mappedBy="user")
	private Set<TCourseSiteSchedule> TCourseSiteSchedules;

	//bi-directional many-to-one association to TCourseSiteUser
	@OneToMany(mappedBy="user")
	private Set<TCourseSiteUser> TCourseSiteUsers;

	//bi-directional many-to-one association to TDiscuss
	@OneToMany(mappedBy="user")
	private Set<TDiscuss> TDiscusses;

	//bi-directional many-to-one association to TExerciseInfo
	@OneToMany(mappedBy="user")
	private Set<TExerciseInfo> TExerciseInfos;

	//bi-directional many-to-one association to TExerciseItemRecord
	@OneToMany(mappedBy="user")
	private Set<TExerciseItemRecord> TExerciseItemRecords;

	//bi-directional many-to-one association to TGradeRecord
	@OneToMany(mappedBy="user")
	private Set<TGradeRecord> TGradeRecords;

	//bi-directional many-to-one association to TMessage
	@OneToMany(mappedBy="user")
	private Set<TMessage> TMessages;

	//bi-directional many-to-one association to TMistakeItem
	@OneToMany(mappedBy="user")
	private Set<TMistakeItem> TMistakeItems;

	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to SchoolClass
	@ManyToOne
	@JoinColumn(name="classes_number")
	private SchoolClass schoolClass;

	@OneToMany(mappedBy="user")
	private List<TimetableOnlinetime> timetableOnlinetimes;

	//bi-directional many-to-many association to Authority
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name="user_authority"
		, joinColumns={
			@JoinColumn(name="user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="authority_id")
			}
		)
	private Set<Authority> authorities;

	//bi-directional many-to-one association to UserCard
	@OneToMany(mappedBy="user")
	private Set<UserCard> userCards;

	//bi-directional many-to-one association to WkFolder
	@OneToMany(mappedBy="user")
	private Set<WkFolder> wkFolders;

	//bi-directional many-to-one association to WkUpload
	@OneToMany(mappedBy="user")
	private Set<WkUpload> wkUploads;
	//bi-directional many-to-one association to TCourseSiteGroupActivity
	@OneToMany(mappedBy="user")
	private List<TCourseSiteGroupActivity> TCourseSiteGroupActivities;
	//bi-directional many-to-one association to TCourseSiteGroupComment
	@OneToMany(mappedBy="user")
	private List<TCourseSiteGroupComment> TCourseSiteGroupComments;

	public User() {
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAttendanceTime() {
		return this.attendanceTime;
	}

	public void setAttendanceTime(String attendanceTime) {
		this.attendanceTime = attendanceTime;
	}

	public String getBachelorMajor() {
		return this.bachelorMajor;
	}

	public void setBachelorMajor(String bachelorMajor) {
		this.bachelorMajor = bachelorMajor;
	}

	public String getCardno() {
		return this.cardno;
	}

	public void setCardno(String cardno) {
		this.cardno = cardno;
	}

	public String getCname() {
		return this.cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getDoctorMajor() {
		return this.doctorMajor;
	}

	public void setDoctorMajor(String doctorMajor) {
		this.doctorMajor = doctorMajor;
	}

	public String getDuties() {
		return this.duties;
	}

	public void setDuties(String duties) {
		this.duties = duties;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Byte getEnabled() {
		return this.enabled;
	}

	public void setEnabled(Byte enabled) {
		this.enabled = enabled;
	}

	public Integer getEnrollmentStatus() {
		return this.enrollmentStatus;
	}

	public void setEnrollmentStatus(Integer enrollmentStatus) {
		this.enrollmentStatus = enrollmentStatus;
	}

	public String getGrade() {
		return this.grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getIfEnrollment() {
		return this.ifEnrollment;
	}

	public void setIfEnrollment(String ifEnrollment) {
		this.ifEnrollment = ifEnrollment;
	}

	public Date getLastLogin() {
		return this.lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public String getMajorDirection() {
		return this.majorDirection;
	}

	public void setMajorDirection(String majorDirection) {
		this.majorDirection = majorDirection;
	}

	public String getMajorNumber() {
		return this.majorNumber;
	}

	public void setMajorNumber(String majorNumber) {
		this.majorNumber = majorNumber;
	}

	public String getMasterMajor() {
		return this.masterMajor;
	}

	public void setMasterMajor(String masterMajor) {
		this.masterMajor = masterMajor;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhotoUrl() {
		return this.photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public String getQq() {
		return this.qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public Integer getTeacherNumber() {
		return this.teacherNumber;
	}

	public void setTeacherNumber(Integer teacherNumber) {
		this.teacherNumber = teacherNumber;
	}

	public String getTelephone() {
		return this.telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getUserRole() {
		return this.userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public String getUserSexy() {
		return this.userSexy;
	}

	public void setUserSexy(String userSexy) {
		this.userSexy = userSexy;
	}

	public String getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public Integer getUserType() {
		return this.userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public List<TimetableOnlinetime> getTimetableOnlinetimes() {
		return timetableOnlinetimes;
	}

	public void setTimetableOnlinetimes(List<TimetableOnlinetime> timetableOnlinetimes) {
		this.timetableOnlinetimes = timetableOnlinetimes;
	}


	public Set<Folder> getFolders() {
		return this.folders;
	}

	public void setFolders(Set<Folder> folders) {
		this.folders = folders;
	}

	public Folder addFolder(Folder folder) {
		getFolders().add(folder);
		folder.setUser(this);

		return folder;
	}

	public Folder removeFolder(Folder folder) {
		getFolders().remove(folder);
		folder.setUser(null);

		return folder;
	}

	public List<TCourseSiteGroupComment> getTCourseSiteGroupComments() {
		return this.TCourseSiteGroupComments;
	}

	public void setTCourseSiteGroupComments(List<TCourseSiteGroupComment> TCourseSiteGroupComments) {
		this.TCourseSiteGroupComments = TCourseSiteGroupComments;
	}


	public Set<LabRoom> getLabRooms() {
		return this.labRooms;
	}

	public void setLabRooms(Set<LabRoom> labRooms) {
		this.labRooms = labRooms;
	}

	public LabRoom addLabRoom(LabRoom labRoom) {
		getLabRooms().add(labRoom);
		labRoom.setUser(this);

		return labRoom;
	}

	public LabRoom removeLabRoom(LabRoom labRoom) {
		getLabRooms().remove(labRoom);
		labRoom.setUser(null);

		return labRoom;
	}



	public Set<LabRoomDevice> getLabRoomDevices() {
		return this.labRoomDevices;
	}

	public void setLabRoomDevices(Set<LabRoomDevice> labRoomDevices) {
		this.labRoomDevices = labRoomDevices;
	}

	public LabRoomDevice addLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().add(labRoomDevice);
		labRoomDevice.setUser(this);

		return labRoomDevice;
	}

	public LabRoomDevice removeLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().remove(labRoomDevice);
		labRoomDevice.setUser(null);

		return labRoomDevice;
	}


	public List<TTestGrading> getTTestGradings() {
		return TTestGradings;
	}

	public void setTTestGradings(List<TTestGrading> TTestGradings) {
		this.TTestGradings = TTestGradings;
	}


	public Set<SchoolCourse> getSchoolCoursesByCreatedBy() {
		return this.schoolCoursesByCreatedBy;
	}

	public void setSchoolCoursesByCreatedBy(Set<SchoolCourse> schoolCoursesByCreatedBy) {
		this.schoolCoursesByCreatedBy = schoolCoursesByCreatedBy;
	}

	public SchoolCourse addSchoolCoursesByCreatedBy(SchoolCourse schoolCoursesByCreatedBy) {
		getSchoolCoursesByCreatedBy().add(schoolCoursesByCreatedBy);
		schoolCoursesByCreatedBy.setUserByCreatedBy(this);

		return schoolCoursesByCreatedBy;
	}

	public SchoolCourse removeSchoolCoursesByCreatedBy(SchoolCourse schoolCoursesByCreatedBy) {
		getSchoolCoursesByCreatedBy().remove(schoolCoursesByCreatedBy);
		schoolCoursesByCreatedBy.setUserByCreatedBy(null);

		return schoolCoursesByCreatedBy;
	}

	public Set<SchoolCourse> getSchoolCoursesByUpdatedBy() {
		return this.schoolCoursesByUpdatedBy;
	}

	public void setSchoolCoursesByUpdatedBy(Set<SchoolCourse> schoolCoursesByUpdatedBy) {
		this.schoolCoursesByUpdatedBy = schoolCoursesByUpdatedBy;
	}

	public SchoolCourse addSchoolCoursesByUpdatedBy(SchoolCourse schoolCoursesByUpdatedBy) {
		getSchoolCoursesByUpdatedBy().add(schoolCoursesByUpdatedBy);
		schoolCoursesByUpdatedBy.setUserByUpdatedBy(this);

		return schoolCoursesByUpdatedBy;
	}

	public SchoolCourse removeSchoolCoursesByUpdatedBy(SchoolCourse schoolCoursesByUpdatedBy) {
		getSchoolCoursesByUpdatedBy().remove(schoolCoursesByUpdatedBy);
		schoolCoursesByUpdatedBy.setUserByUpdatedBy(null);

		return schoolCoursesByUpdatedBy;
	}
	@JsonIgnore
	public Set<SchoolCourse> getSchoolCoursesByTeacher() {
		return this.schoolCoursesByTeacher;
	}

	public void setSchoolCoursesByTeacher(Set<SchoolCourse> schoolCoursesByTeacher) {
		this.schoolCoursesByTeacher = schoolCoursesByTeacher;
	}

	public SchoolCourse addSchoolCoursesByTeacher(SchoolCourse schoolCoursesByTeacher) {
		getSchoolCoursesByTeacher().add(schoolCoursesByTeacher);
		schoolCoursesByTeacher.setUserByTeacher(this);

		return schoolCoursesByTeacher;
	}

	public SchoolCourse removeSchoolCoursesByTeacher(SchoolCourse schoolCoursesByTeacher) {
		getSchoolCoursesByTeacher().remove(schoolCoursesByTeacher);
		schoolCoursesByTeacher.setUserByTeacher(null);

		return schoolCoursesByTeacher;
	}
	@JsonIgnore
	public Set<SchoolCourseDetail> getSchoolCourseDetails() {
		return this.schoolCourseDetails;
	}

	public void setSchoolCourseDetails(Set<SchoolCourseDetail> schoolCourseDetails) {
		this.schoolCourseDetails = schoolCourseDetails;
	}

	public SchoolCourseDetail addSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().add(schoolCourseDetail);
		schoolCourseDetail.setUser(this);

		return schoolCourseDetail;
	}

	public SchoolCourseDetail removeSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().remove(schoolCourseDetail);
		schoolCourseDetail.setUser(null);

		return schoolCourseDetail;
	}
	@JsonIgnore
	public Set<SchoolCourseStudent> getSchoolCourseStudentsByTeacherNumber() {
		return this.schoolCourseStudentsByTeacherNumber;
	}

	public void setSchoolCourseStudentsByTeacherNumber(Set<SchoolCourseStudent> schoolCourseStudentsByTeacherNumber) {
		this.schoolCourseStudentsByTeacherNumber = schoolCourseStudentsByTeacherNumber;
	}

	public SchoolCourseStudent addSchoolCourseStudentsByTeacherNumber(SchoolCourseStudent schoolCourseStudentsByTeacherNumber) {
		getSchoolCourseStudentsByTeacherNumber().add(schoolCourseStudentsByTeacherNumber);
		schoolCourseStudentsByTeacherNumber.setUserByTeacherNumber(this);

		return schoolCourseStudentsByTeacherNumber;
	}

	public SchoolCourseStudent removeSchoolCourseStudentsByTeacherNumber(SchoolCourseStudent schoolCourseStudentsByTeacherNumber) {
		getSchoolCourseStudentsByTeacherNumber().remove(schoolCourseStudentsByTeacherNumber);
		schoolCourseStudentsByTeacherNumber.setUserByTeacherNumber(null);

		return schoolCourseStudentsByTeacherNumber;
	}
	@JsonIgnore
	public Set<SchoolCourseStudent> getSchoolCourseStudentsByStudentNumber() {
		return this.schoolCourseStudentsByStudentNumber;
	}

	public void setSchoolCourseStudentsByStudentNumber(Set<SchoolCourseStudent> schoolCourseStudentsByStudentNumber) {
		this.schoolCourseStudentsByStudentNumber = schoolCourseStudentsByStudentNumber;
	}

	public SchoolCourseStudent addSchoolCourseStudentsByStudentNumber(SchoolCourseStudent schoolCourseStudentsByStudentNumber) {
		getSchoolCourseStudentsByStudentNumber().add(schoolCourseStudentsByStudentNumber);
		schoolCourseStudentsByStudentNumber.setUserByStudentNumber(this);

		return schoolCourseStudentsByStudentNumber;
	}

	public SchoolCourseStudent removeSchoolCourseStudentsByStudentNumber(SchoolCourseStudent schoolCourseStudentsByStudentNumber) {
		getSchoolCourseStudentsByStudentNumber().remove(schoolCourseStudentsByStudentNumber);
		schoolCourseStudentsByStudentNumber.setUserByStudentNumber(null);

		return schoolCourseStudentsByStudentNumber;
	}
	@JsonIgnore
	public Set<SchoolDevice> getSchoolDevicesByKeepUser() {
		return this.schoolDevicesByKeepUser;
	}

	public void setSchoolDevicesByKeepUser(Set<SchoolDevice> schoolDevicesByKeepUser) {
		this.schoolDevicesByKeepUser = schoolDevicesByKeepUser;
	}

	public SchoolDevice addSchoolDevicesByKeepUser(SchoolDevice schoolDevicesByKeepUser) {
		getSchoolDevicesByKeepUser().add(schoolDevicesByKeepUser);
		schoolDevicesByKeepUser.setUserByKeepUser(this);

		return schoolDevicesByKeepUser;
	}

	public SchoolDevice removeSchoolDevicesByKeepUser(SchoolDevice schoolDevicesByKeepUser) {
		getSchoolDevicesByKeepUser().remove(schoolDevicesByKeepUser);
		schoolDevicesByKeepUser.setUserByKeepUser(null);

		return schoolDevicesByKeepUser;
	}
	@JsonIgnore
	public Set<SchoolDevice> getSchoolDevicesByUserNumber() {
		return this.schoolDevicesByUserNumber;
	}

	public void setSchoolDevicesByUserNumber(Set<SchoolDevice> schoolDevicesByUserNumber) {
		this.schoolDevicesByUserNumber = schoolDevicesByUserNumber;
	}

	public SchoolDevice addSchoolDevicesByUserNumber(SchoolDevice schoolDevicesByUserNumber) {
		getSchoolDevicesByUserNumber().add(schoolDevicesByUserNumber);
		schoolDevicesByUserNumber.setUserByUserNumber(this);

		return schoolDevicesByUserNumber;
	}

	public SchoolDevice removeSchoolDevicesByUserNumber(SchoolDevice schoolDevicesByUserNumber) {
		getSchoolDevicesByUserNumber().remove(schoolDevicesByUserNumber);
		schoolDevicesByUserNumber.setUserByUserNumber(null);

		return schoolDevicesByUserNumber;
	}

	public Set<SystemBuild> getSystemBuildsByCreatedBy() {
		return this.systemBuildsByCreatedBy;
	}

	public void setSystemBuildsByCreatedBy(Set<SystemBuild> systemBuildsByCreatedBy) {
		this.systemBuildsByCreatedBy = systemBuildsByCreatedBy;
	}

	public SystemBuild addSystemBuildsByCreatedBy(SystemBuild systemBuildsByCreatedBy) {
		getSystemBuildsByCreatedBy().add(systemBuildsByCreatedBy);
		systemBuildsByCreatedBy.setUserByCreatedBy(this);

		return systemBuildsByCreatedBy;
	}

	public SystemBuild removeSystemBuildsByCreatedBy(SystemBuild systemBuildsByCreatedBy) {
		getSystemBuildsByCreatedBy().remove(systemBuildsByCreatedBy);
		systemBuildsByCreatedBy.setUserByCreatedBy(null);

		return systemBuildsByCreatedBy;
	}
	@JsonIgnore
	public Set<SystemBuild> getSystemBuildsByUpdatedBy() {
		return this.systemBuildsByUpdatedBy;
	}

	public void setSystemBuildsByUpdatedBy(Set<SystemBuild> systemBuildsByUpdatedBy) {
		this.systemBuildsByUpdatedBy = systemBuildsByUpdatedBy;
	}

	public SystemBuild addSystemBuildsByUpdatedBy(SystemBuild systemBuildsByUpdatedBy) {
		getSystemBuildsByUpdatedBy().add(systemBuildsByUpdatedBy);
		systemBuildsByUpdatedBy.setUserByUpdatedBy(this);

		return systemBuildsByUpdatedBy;
	}

	public SystemBuild removeSystemBuildsByUpdatedBy(SystemBuild systemBuildsByUpdatedBy) {
		getSystemBuildsByUpdatedBy().remove(systemBuildsByUpdatedBy);
		systemBuildsByUpdatedBy.setUserByUpdatedBy(null);

		return systemBuildsByUpdatedBy;
	}
	@JsonIgnore
	public Set<TAssignment> getTAssignments() {
		return this.TAssignments;
	}

	public void setTAssignments(Set<TAssignment> TAssignments) {
		this.TAssignments = TAssignments;
	}

	public TAssignment addTAssignment(TAssignment TAssignment) {
		getTAssignments().add(TAssignment);
		TAssignment.setUser(this);

		return TAssignment;
	}

	public TAssignment removeTAssignment(TAssignment TAssignment) {
		getTAssignments().remove(TAssignment);
		TAssignment.setUser(null);

		return TAssignment;
	}
	@JsonIgnore
	public Set<TAssignmentAnswerAssign> getTAssignmentAnswerAssigns() {
		return this.TAssignmentAnswerAssigns;
	}

	public void setTAssignmentAnswerAssigns(Set<TAssignmentAnswerAssign> TAssignmentAnswerAssigns) {
		this.TAssignmentAnswerAssigns = TAssignmentAnswerAssigns;
	}

	public TAssignmentAnswerAssign addTAssignmentAnswerAssign(TAssignmentAnswerAssign TAssignmentAnswerAssign) {
		getTAssignmentAnswerAssigns().add(TAssignmentAnswerAssign);
		TAssignmentAnswerAssign.setUser(this);

		return TAssignmentAnswerAssign;
	}

	public TAssignmentAnswerAssign removeTAssignmentAnswerAssign(TAssignmentAnswerAssign TAssignmentAnswerAssign) {
		getTAssignmentAnswerAssigns().remove(TAssignmentAnswerAssign);
		TAssignmentAnswerAssign.setUser(null);

		return TAssignmentAnswerAssign;
	}
	@JsonIgnore
	public Set<TAssignmentGrading> getTAssignmentGradingsByStudent() {
		return this.TAssignmentGradingsByStudent;
	}

	public void setTAssignmentGradingsByStudent(Set<TAssignmentGrading> TAssignmentGradingsByStudent) {
		this.TAssignmentGradingsByStudent = TAssignmentGradingsByStudent;
	}

	public TAssignmentGrading addTAssignmentGradingsByStudent(TAssignmentGrading TAssignmentGradingsByStudent) {
		getTAssignmentGradingsByStudent().add(TAssignmentGradingsByStudent);
		TAssignmentGradingsByStudent.setUserByStudent(this);

		return TAssignmentGradingsByStudent;
	}

	public TAssignmentGrading removeTAssignmentGradingsByStudent(TAssignmentGrading TAssignmentGradingsByStudent) {
		getTAssignmentGradingsByStudent().remove(TAssignmentGradingsByStudent);
		TAssignmentGradingsByStudent.setUserByStudent(null);

		return TAssignmentGradingsByStudent;
	}
	@JsonIgnore
	public Set<TAssignmentGrading> getTAssignmentGradingsByGradeBy() {
		return this.TAssignmentGradingsByGradeBy;
	}

	public void setTAssignmentGradingsByGradeBy(Set<TAssignmentGrading> TAssignmentGradingsByGradeBy) {
		this.TAssignmentGradingsByGradeBy = TAssignmentGradingsByGradeBy;
	}

	public TAssignmentGrading addTAssignmentGradingsByGradeBy(TAssignmentGrading TAssignmentGradingsByGradeBy) {
		getTAssignmentGradingsByGradeBy().add(TAssignmentGradingsByGradeBy);
		TAssignmentGradingsByGradeBy.setUserByGradeBy(this);

		return TAssignmentGradingsByGradeBy;
	}

	public TAssignmentGrading removeTAssignmentGradingsByGradeBy(TAssignmentGrading TAssignmentGradingsByGradeBy) {
		getTAssignmentGradingsByGradeBy().remove(TAssignmentGradingsByGradeBy);
		TAssignmentGradingsByGradeBy.setUserByGradeBy(null);

		return TAssignmentGradingsByGradeBy;
	}

	public Set<TAssignmentItem> getTAssignmentItems() {
		return this.TAssignmentItems;
	}

	public void setTAssignmentItems(Set<TAssignmentItem> TAssignmentItems) {
		this.TAssignmentItems = TAssignmentItems;
	}

	public TAssignmentItem addTAssignmentItem(TAssignmentItem TAssignmentItem) {
		getTAssignmentItems().add(TAssignmentItem);
		TAssignmentItem.setUser(this);

		return TAssignmentItem;
	}

	public TAssignmentItem removeTAssignmentItem(TAssignmentItem TAssignmentItem) {
		getTAssignmentItems().remove(TAssignmentItem);
		TAssignmentItem.setUser(null);

		return TAssignmentItem;
	}
	@JsonIgnore
	public Set<TAssignmentItemMapping> getTAssignmentItemMappingsByStudent() {
		return this.TAssignmentItemMappingsByStudent;
	}

	public void setTAssignmentItemMappingsByStudent(Set<TAssignmentItemMapping> TAssignmentItemMappingsByStudent) {
		this.TAssignmentItemMappingsByStudent = TAssignmentItemMappingsByStudent;
	}

	public TAssignmentItemMapping addTAssignmentItemMappingsByStudent(TAssignmentItemMapping tAssignmentItemMappingsByStudent) {
		getTAssignmentItemMappingsByStudent().add(tAssignmentItemMappingsByStudent);
		tAssignmentItemMappingsByStudent.setUserByStudent(this);

		return tAssignmentItemMappingsByStudent;
	}

	public TAssignmentItemMapping removeTAssignmentItemMappingsByStudent(TAssignmentItemMapping tAssignmentItemMappingsByStudent) {
		getTAssignmentItemMappingsByStudent().remove(tAssignmentItemMappingsByStudent);
		tAssignmentItemMappingsByStudent.setUserByStudent(null);

		return tAssignmentItemMappingsByStudent;
	}

	public Set<TAssignmentItemMapping> getTAssignmentItemMappingsByGradeby() {
		return this.TAssignmentItemMappingsByGradeby;
	}

	public void setTAssignmentItemMappingsByGradeby(Set<TAssignmentItemMapping> TAssignmentItemMappingsByGradeby) {
		this.TAssignmentItemMappingsByGradeby = TAssignmentItemMappingsByGradeby;
	}

	public TAssignmentItemMapping addTAssignmentItemMappingsByGradeby(TAssignmentItemMapping tAssignmentItemMappingsByGradeby) {
		getTAssignmentItemMappingsByGradeby().add(tAssignmentItemMappingsByGradeby);
		tAssignmentItemMappingsByGradeby.setUserByGradeby(this);

		return tAssignmentItemMappingsByGradeby;
	}

	public TAssignmentItemMapping removeTAssignmentItemMappingsByGradeby(TAssignmentItemMapping tAssignmentItemMappingsByGradeby) {
		getTAssignmentItemMappingsByGradeby().remove(tAssignmentItemMappingsByGradeby);
		tAssignmentItemMappingsByGradeby.setUserByGradeby(null);

		return tAssignmentItemMappingsByGradeby;
	}
	@JsonIgnore
	public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools1() {
		return this.TAssignmentQuestionpools1;
	}

	public void setTAssignmentQuestionpools1(Set<TAssignmentQuestionpool> TAssignmentQuestionpools1) {
		this.TAssignmentQuestionpools1 = TAssignmentQuestionpools1;
	}

	public TAssignmentQuestionpool addTAssignmentQuestionpools1(TAssignmentQuestionpool TAssignmentQuestionpools1) {
		getTAssignmentQuestionpools1().add(TAssignmentQuestionpools1);
		TAssignmentQuestionpools1.setUser(this);

		return TAssignmentQuestionpools1;
	}

	public TAssignmentQuestionpool removeTAssignmentQuestionpools1(TAssignmentQuestionpool TAssignmentQuestionpools1) {
		getTAssignmentQuestionpools1().remove(TAssignmentQuestionpools1);
		TAssignmentQuestionpools1.setUser(null);

		return TAssignmentQuestionpools1;
	}

	public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools2() {
		return this.TAssignmentQuestionpools2;
	}

	public void setTAssignmentQuestionpools2(Set<TAssignmentQuestionpool> TAssignmentQuestionpools2) {
		this.TAssignmentQuestionpools2 = TAssignmentQuestionpools2;
	}
	@JsonIgnore
	public Set<TAssignmentSection> getTAssignmentSections() {
		return this.TAssignmentSections;
	}

	public void setTAssignmentSections(Set<TAssignmentSection> TAssignmentSections) {
		this.TAssignmentSections = TAssignmentSections;
	}

	public TAssignmentSection addTAssignmentSection(TAssignmentSection TAssignmentSection) {
		getTAssignmentSections().add(TAssignmentSection);
		TAssignmentSection.setUser(this);

		return TAssignmentSection;
	}

	public TAssignmentSection removeTAssignmentSection(TAssignmentSection TAssignmentSection) {
		getTAssignmentSections().remove(TAssignmentSection);
		TAssignmentSection.setUser(null);

		return TAssignmentSection;
	}
	@JsonIgnore
	public Set<TCourseSite> getTCourseSitesByCreatedBy() {
		return this.TCourseSitesByCreatedBy;
	}

	public void setTCourseSitesByCreatedBy(Set<TCourseSite> TCourseSitesByCreatedBy) {
		this.TCourseSitesByCreatedBy = TCourseSitesByCreatedBy;
	}

	public TCourseSite addTCourseSitesByCreatedBy(TCourseSite tCourseSitesByCreatedBy) {
		getTCourseSitesByCreatedBy().add(tCourseSitesByCreatedBy);
		tCourseSitesByCreatedBy.setUserByCreatedBy(this);

		return tCourseSitesByCreatedBy;
	}

	public TCourseSite removeTCourseSitesByCreatedBy(TCourseSite tCourseSitesByCreatedBy) {
		getTCourseSitesByCreatedBy().remove(tCourseSitesByCreatedBy);
		tCourseSitesByCreatedBy.setUserByCreatedBy(null);

		return tCourseSitesByCreatedBy;
	}
	@JsonIgnore
	public Set<TCourseSite> getTCourseSitesByModifiedBy() {
		return this.TCourseSitesByModifiedBy;
	}

	public void setTCourseSitesByModifiedBy(Set<TCourseSite> TCourseSitesByModifiedBy) {
		this.TCourseSitesByModifiedBy = TCourseSitesByModifiedBy;
	}

	public TCourseSite addTCourseSitesByModifiedBy(TCourseSite tCourseSitesByModifiedBy) {
		getTCourseSitesByModifiedBy().add(tCourseSitesByModifiedBy);
		tCourseSitesByModifiedBy.setUserByModifiedBy(this);

		return tCourseSitesByModifiedBy;
	}

	public TCourseSite removeTCourseSitesByModifiedBy(TCourseSite tCourseSitesByModifiedBy) {
		getTCourseSitesByModifiedBy().remove(tCourseSitesByModifiedBy);
		tCourseSitesByModifiedBy.setUserByModifiedBy(null);

		return tCourseSitesByModifiedBy;
	}
	@JsonIgnore
	public Set<TCourseSiteArtical> getTCourseSiteArticals() {
		return this.TCourseSiteArticals;
	}

	public void setTCourseSiteArticals(Set<TCourseSiteArtical> TCourseSiteArticals) {
		this.TCourseSiteArticals = TCourseSiteArticals;
	}

	public TCourseSiteArtical addTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().add(TCourseSiteArtical);
		TCourseSiteArtical.setUser(this);

		return TCourseSiteArtical;
	}

	public TCourseSiteArtical removeTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().remove(TCourseSiteArtical);
		TCourseSiteArtical.setUser(null);

		return TCourseSiteArtical;
	}

	public Set<TCourseSiteChannel> getTCourseSiteChannels() {
		return this.TCourseSiteChannels;
	}

	public void setTCourseSiteChannels(Set<TCourseSiteChannel> TCourseSiteChannels) {
		this.TCourseSiteChannels = TCourseSiteChannels;
	}

	public TCourseSiteChannel addTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().add(TCourseSiteChannel);
		TCourseSiteChannel.setUser(this);

		return TCourseSiteChannel;
	}

	public TCourseSiteChannel removeTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().remove(TCourseSiteChannel);
		TCourseSiteChannel.setUser(null);

		return TCourseSiteChannel;
	}
	@JsonIgnore
	public Set<TCourseSiteCopy> getTCourseSiteCopiesByCreatedBy() {
		return this.TCourseSiteCopiesByCreatedBy;
	}

	public void setTCourseSiteCopiesByCreatedBy(Set<TCourseSiteCopy> TCourseSiteCopiesByCreatedBy) {
		this.TCourseSiteCopiesByCreatedBy = TCourseSiteCopiesByCreatedBy;
	}

	public TCourseSiteCopy addTCourseSiteCopiesByCreatedBy(TCourseSiteCopy tCourseSiteCopiesByCreatedBy) {
		getTCourseSiteCopiesByCreatedBy().add(tCourseSiteCopiesByCreatedBy);
		tCourseSiteCopiesByCreatedBy.setUserByCreatedBy(this);

		return tCourseSiteCopiesByCreatedBy;
	}

	public TCourseSiteCopy removeTCourseSiteCopiesByCreatedBy(TCourseSiteCopy tCourseSiteCopiesByCreatedBy) {
		getTCourseSiteCopiesByCreatedBy().remove(tCourseSiteCopiesByCreatedBy);
		tCourseSiteCopiesByCreatedBy.setUserByCreatedBy(null);

		return tCourseSiteCopiesByCreatedBy;
	}
	@JsonIgnore
	public Set<TCourseSiteCopy> getTCourseSiteCopiesByModifiedBy() {
		return this.TCourseSiteCopiesByModifiedBy;
	}

	public void setTCourseSiteCopiesByModifiedBy(Set<TCourseSiteCopy> TCourseSiteCopiesByModifiedBy) {
		this.TCourseSiteCopiesByModifiedBy = TCourseSiteCopiesByModifiedBy;
	}

	public TCourseSiteCopy addTCourseSiteCopiesByModifiedBy(TCourseSiteCopy tCourseSiteCopiesByModifiedBy) {
		getTCourseSiteCopiesByModifiedBy().add(tCourseSiteCopiesByModifiedBy);
		tCourseSiteCopiesByModifiedBy.setUserByModifiedBy(this);

		return tCourseSiteCopiesByModifiedBy;
	}

	public TCourseSiteCopy removeTCourseSiteCopiesByModifiedBy(TCourseSiteCopy tCourseSiteCopiesByModifiedBy) {
		getTCourseSiteCopiesByModifiedBy().remove(tCourseSiteCopiesByModifiedBy);
		tCourseSiteCopiesByModifiedBy.setUserByModifiedBy(null);

		return tCourseSiteCopiesByModifiedBy;
	}

	public Set<TCourseSiteSchedule> getTCourseSiteSchedules() {
		return this.TCourseSiteSchedules;
	}

	public void setTCourseSiteSchedules(Set<TCourseSiteSchedule> TCourseSiteSchedules) {
		this.TCourseSiteSchedules = TCourseSiteSchedules;
	}

	public TCourseSiteSchedule addTCourseSiteSchedule(TCourseSiteSchedule TCourseSiteSchedule) {
		getTCourseSiteSchedules().add(TCourseSiteSchedule);
		TCourseSiteSchedule.setUser(this);

		return TCourseSiteSchedule;
	}

	public TCourseSiteSchedule removeTCourseSiteSchedule(TCourseSiteSchedule TCourseSiteSchedule) {
		getTCourseSiteSchedules().remove(TCourseSiteSchedule);
		TCourseSiteSchedule.setUser(null);

		return TCourseSiteSchedule;
	}
	@JsonIgnore
	public Set<TCourseSiteUser> getTCourseSiteUsers() {
		return this.TCourseSiteUsers;
	}

	public void setTCourseSiteUsers(Set<TCourseSiteUser> TCourseSiteUsers) {
		this.TCourseSiteUsers = TCourseSiteUsers;
	}

	public TCourseSiteUser addTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().add(TCourseSiteUser);
		TCourseSiteUser.setUser(this);

		return TCourseSiteUser;
	}

	public TCourseSiteUser removeTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().remove(TCourseSiteUser);
		TCourseSiteUser.setUser(null);

		return TCourseSiteUser;
	}

	public Set<TDiscuss> getTDiscusses() {
		return this.TDiscusses;
	}

	public void setTDiscusses(Set<TDiscuss> TDiscusses) {
		this.TDiscusses = TDiscusses;
	}

	public TDiscuss addTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().add(TDiscuss);
		TDiscuss.setUser(this);

		return TDiscuss;
	}

	public TDiscuss removeTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().remove(TDiscuss);
		TDiscuss.setUser(null);

		return TDiscuss;
	}
	@JsonIgnore
	public Set<TExerciseInfo> getTExerciseInfos() {
		return this.TExerciseInfos;
	}

	public void setTExerciseInfos(Set<TExerciseInfo> TExerciseInfos) {
		this.TExerciseInfos = TExerciseInfos;
	}

	public TExerciseInfo addTExerciseInfo(TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().add(TExerciseInfo);
		TExerciseInfo.setUser(this);

		return TExerciseInfo;
	}

	public TExerciseInfo removeTExerciseInfo(TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().remove(TExerciseInfo);
		TExerciseInfo.setUser(null);

		return TExerciseInfo;
	}

	public Set<TExerciseItemRecord> getTExerciseItemRecords() {
		return this.TExerciseItemRecords;
	}

	public void setTExerciseItemRecords(Set<TExerciseItemRecord> TExerciseItemRecords) {
		this.TExerciseItemRecords = TExerciseItemRecords;
	}

	public TExerciseItemRecord addTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().add(TExerciseItemRecord);
		TExerciseItemRecord.setUser(this);

		return TExerciseItemRecord;
	}

	public TExerciseItemRecord removeTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().remove(TExerciseItemRecord);
		TExerciseItemRecord.setUser(null);

		return TExerciseItemRecord;
	}
	@JsonIgnore
	public Set<TGradeRecord> getTGradeRecords() {
		return this.TGradeRecords;
	}

	public void setTGradeRecords(Set<TGradeRecord> TGradeRecords) {
		this.TGradeRecords = TGradeRecords;
	}

	public TGradeRecord addTGradeRecord(TGradeRecord TGradeRecord) {
		getTGradeRecords().add(TGradeRecord);
		TGradeRecord.setUser(this);

		return TGradeRecord;
	}

	public TGradeRecord removeTGradeRecord(TGradeRecord TGradeRecord) {
		getTGradeRecords().remove(TGradeRecord);
		TGradeRecord.setUser(null);

		return TGradeRecord;
	}
	@JsonIgnore
	public Set<TMessage> getTMessages() {
		return this.TMessages;
	}

	public void setTMessages(Set<TMessage> TMessages) {
		this.TMessages = TMessages;
	}

	public TMessage addTMessage(TMessage TMessage) {
		getTMessages().add(TMessage);
		TMessage.setUser(this);

		return TMessage;
	}

	public TMessage removeTMessage(TMessage TMessage) {
		getTMessages().remove(TMessage);
		TMessage.setUser(null);

		return TMessage;
	}

	public Set<TMistakeItem> getTMistakeItems() {
		return this.TMistakeItems;
	}

	public void setTMistakeItems(Set<TMistakeItem> TMistakeItems) {
		this.TMistakeItems = TMistakeItems;
	}

	public TMistakeItem addTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().add(TMistakeItem);
		TMistakeItem.setUser(this);

		return TMistakeItem;
	}

	public TMistakeItem removeTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().remove(TMistakeItem);
		TMistakeItem.setUser(null);

		return TMistakeItem;
	}
	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public SchoolClass getSchoolClass() {
		return this.schoolClass;
	}

	public void setSchoolClass(SchoolClass schoolClass) {
		this.schoolClass = schoolClass;
	}

	public Set<Authority> getAuthorities() {
		return this.authorities;
	}

	public void setAuthorities(Set<Authority> authorities) {
		this.authorities = authorities;
	}
	@JsonIgnore
	public Set<UserCard> getUserCards() {
		return this.userCards;
	}

	public void setUserCards(Set<UserCard> userCards) {
		this.userCards = userCards;
	}

	public UserCard addUserCard(UserCard userCard) {
		getUserCards().add(userCard);
		userCard.setUser(this);

		return userCard;
	}

	public UserCard removeUserCard(UserCard userCard) {
		getUserCards().remove(userCard);
		userCard.setUser(null);

		return userCard;
	}
	@JsonIgnore
	public Set<WkFolder> getWkFolders() {
		return this.wkFolders;
	}

	public void setWkFolders(Set<WkFolder> wkFolders) {
		this.wkFolders = wkFolders;
	}

	public WkFolder addWkFolder(WkFolder wkFolder) {
		getWkFolders().add(wkFolder);
		wkFolder.setUser(this);

		return wkFolder;
	}

	public WkFolder removeWkFolder(WkFolder wkFolder) {
		getWkFolders().remove(wkFolder);
		wkFolder.setUser(null);

		return wkFolder;
	}

	public Set<WkUpload> getWkUploads() {
		return this.wkUploads;
	}

	public void setWkUploads(Set<WkUpload> wkUploads) {
		this.wkUploads = wkUploads;
	}

	public WkUpload addWkUpload(WkUpload wkUpload) {
		getWkUploads().add(wkUpload);
		wkUpload.setUser(this);

		return wkUpload;
	}

	public WkUpload removeWkUpload(WkUpload wkUpload) {
		getWkUploads().remove(wkUpload);
		wkUpload.setUser(null);

		return wkUpload;
	}
	public TCourseSiteGroupComment addTCourseSiteGroupComment(TCourseSiteGroupComment TCourseSiteGroupComment) {
		getTCourseSiteGroupComments().add(TCourseSiteGroupComment);
		TCourseSiteGroupComment.setUser(this);

		return TCourseSiteGroupComment;
	}

	public TCourseSiteGroupComment removeTCourseSiteGroupComment(TCourseSiteGroupComment TCourseSiteGroupComment) {
		getTCourseSiteGroupComments().remove(TCourseSiteGroupComment);
		TCourseSiteGroupComment.setUser(null);

		return TCourseSiteGroupComment;
	}

}