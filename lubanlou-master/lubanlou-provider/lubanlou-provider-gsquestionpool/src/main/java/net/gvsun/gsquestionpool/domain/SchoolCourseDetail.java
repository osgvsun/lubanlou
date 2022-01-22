package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the school_course_detail database table.
 * 
 */
@Entity
@Table(name="school_course_detail")
@NamedQuery(name="SchoolCourseDetail.findAll", query="SELECT s FROM SchoolCourseDetail s")
public class SchoolCourseDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="course_detail_no")
	private String courseDetailNo;

	@Column(name="classes_experiment")
	private String classesExperiment;

	@Column(name="classroom_type")
	private String classroomType;

	private String classtime;

	@Column(name="compute_time")
	private String computeTime;

	@Column(name="course_name")
	private String courseName;

	@Column(name="course_number")
	private String courseNumber;

	@Column(name="course_type")
	private String courseType;

	@Column(name="course_type_name")
	private String courseTypeName;

	@Column(name="detail_id")
	private Integer detailId;

	@Column(name="end_class")
	private Integer endClass;

	@Column(name="end_week")
	private Integer endWeek;

	@Column(name="environmental_requirements")
	private String environmentalRequirements;

	@Column(name="equipment_configuration")
	private String equipmentConfiguration;

	@Column(name="evaluation_mode")
	private String evaluationMode;

	@Column(name="evaluation_mode_name")
	private String evaluationModeName;

	@Column(name="experimental_class_hour")
	private String experimentalClassHour;

	@Column(name="experimental_proportion")
	private String experimentalProportion;

	private Integer id;

	@Column(name="if_allow_course")
	private byte ifAllowCourse;

	@Column(name="if_appointment")
	private byte ifAppointment;

	@Column(name="if_arrange")
	private byte ifArrange;

	@Column(name="if_flop")
	private byte ifFlop;

	@Column(name="if_select")
	private byte ifSelect;

	@Column(name="if_temporary")
	private byte ifTemporary;

	@Column(name="instruction_type")
	private String instructionType;

	@Column(name="instruction_type_name")
	private String instructionTypeName;

	@Column(name="major_direction_name")
	private String majorDirectionName;

	@Column(name="major_name")
	private String majorName;

	@Column(name="max_students")
	private String maxStudents;

	@Column(name="min_students")
	private String minStudents;

	@Column(name="need_id")
	private Integer needId;

	@Column(name="plan_student_number")
	private String planStudentNumber;

	@Column(name="remaining_arrange")
	private String remainingArrange;

	@Column(name="required_software")
	private String requiredSoftware;

	@Column(name="start_class")
	private Integer startClass;

	@Column(name="start_week")
	private Integer startWeek;

	private Integer state;

	@Column(name="total_class_hour")
	private String totalClassHour;

	@Column(name="total_classes")
	private Integer totalClasses;

	@Column(name="total_weeks")
	private String totalWeeks;

	private String tutor;

	private String useweek;

	@Column(name="week_class_hour")
	private String weekClassHour;

	@Column(name="week_type")
	private String weekType;

	private Integer weekday;

	@Column(name="weeks_experiment")
	private String weeksExperiment;

	//bi-directional many-to-one association to SchoolCourse
	@ManyToOne
	@JoinColumn(name="course_no")
	private SchoolCourse schoolCourse;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="teacher_number")
	private User user;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="schoolCourseDetail")
	private Set<SchoolCourseStudent> schoolCourseStudents;

	//bi-directional many-to-one association to TimetableAppointment
	@OneToMany(mappedBy="schoolCourseDetail")
	private Set<TimetableAppointment> timetableAppointments;

	public SchoolCourseDetail() {
	}

	public String getCourseDetailNo() {
		return this.courseDetailNo;
	}

	public void setCourseDetailNo(String courseDetailNo) {
		this.courseDetailNo = courseDetailNo;
	}

	public String getClassesExperiment() {
		return this.classesExperiment;
	}

	public void setClassesExperiment(String classesExperiment) {
		this.classesExperiment = classesExperiment;
	}

	public String getClassroomType() {
		return this.classroomType;
	}

	public void setClassroomType(String classroomType) {
		this.classroomType = classroomType;
	}

	public String getClasstime() {
		return this.classtime;
	}

	public void setClasstime(String classtime) {
		this.classtime = classtime;
	}

	public String getComputeTime() {
		return this.computeTime;
	}

	public void setComputeTime(String computeTime) {
		this.computeTime = computeTime;
	}

	public String getCourseName() {
		return this.courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseNumber() {
		return this.courseNumber;
	}

	public void setCourseNumber(String courseNumber) {
		this.courseNumber = courseNumber;
	}

	public String getCourseType() {
		return this.courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

	public String getCourseTypeName() {
		return this.courseTypeName;
	}

	public void setCourseTypeName(String courseTypeName) {
		this.courseTypeName = courseTypeName;
	}

	public Integer getDetailId() {
		return this.detailId;
	}

	public void setDetailId(int detailId) {
		this.detailId = detailId;
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

	public String getEnvironmentalRequirements() {
		return this.environmentalRequirements;
	}

	public void setEnvironmentalRequirements(String environmentalRequirements) {
		this.environmentalRequirements = environmentalRequirements;
	}

	public String getEquipmentConfiguration() {
		return this.equipmentConfiguration;
	}

	public void setEquipmentConfiguration(String equipmentConfiguration) {
		this.equipmentConfiguration = equipmentConfiguration;
	}

	public String getEvaluationMode() {
		return this.evaluationMode;
	}

	public void setEvaluationMode(String evaluationMode) {
		this.evaluationMode = evaluationMode;
	}

	public String getEvaluationModeName() {
		return this.evaluationModeName;
	}

	public void setEvaluationModeName(String evaluationModeName) {
		this.evaluationModeName = evaluationModeName;
	}

	public String getExperimentalClassHour() {
		return this.experimentalClassHour;
	}

	public void setExperimentalClassHour(String experimentalClassHour) {
		this.experimentalClassHour = experimentalClassHour;
	}

	public String getExperimentalProportion() {
		return this.experimentalProportion;
	}

	public void setExperimentalProportion(String experimentalProportion) {
		this.experimentalProportion = experimentalProportion;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte getIfAllowCourse() {
		return this.ifAllowCourse;
	}

	public void setIfAllowCourse(byte ifAllowCourse) {
		this.ifAllowCourse = ifAllowCourse;
	}

	public byte getIfAppointment() {
		return this.ifAppointment;
	}

	public void setIfAppointment(byte ifAppointment) {
		this.ifAppointment = ifAppointment;
	}

	public byte getIfArrange() {
		return this.ifArrange;
	}

	public void setIfArrange(byte ifArrange) {
		this.ifArrange = ifArrange;
	}

	public byte getIfFlop() {
		return this.ifFlop;
	}

	public void setIfFlop(byte ifFlop) {
		this.ifFlop = ifFlop;
	}

	public byte getIfSelect() {
		return this.ifSelect;
	}

	public void setIfSelect(byte ifSelect) {
		this.ifSelect = ifSelect;
	}

	public byte getIfTemporary() {
		return this.ifTemporary;
	}

	public void setIfTemporary(byte ifTemporary) {
		this.ifTemporary = ifTemporary;
	}

	public String getInstructionType() {
		return this.instructionType;
	}

	public void setInstructionType(String instructionType) {
		this.instructionType = instructionType;
	}

	public String getInstructionTypeName() {
		return this.instructionTypeName;
	}

	public void setInstructionTypeName(String instructionTypeName) {
		this.instructionTypeName = instructionTypeName;
	}

	public String getMajorDirectionName() {
		return this.majorDirectionName;
	}

	public void setMajorDirectionName(String majorDirectionName) {
		this.majorDirectionName = majorDirectionName;
	}

	public String getMajorName() {
		return this.majorName;
	}

	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}

	public String getMaxStudents() {
		return this.maxStudents;
	}

	public void setMaxStudents(String maxStudents) {
		this.maxStudents = maxStudents;
	}

	public String getMinStudents() {
		return this.minStudents;
	}

	public void setMinStudents(String minStudents) {
		this.minStudents = minStudents;
	}

	public Integer getNeedId() {
		return this.needId;
	}

	public void setNeedId(int needId) {
		this.needId = needId;
	}

	public String getPlanStudentNumber() {
		return this.planStudentNumber;
	}

	public void setPlanStudentNumber(String planStudentNumber) {
		this.planStudentNumber = planStudentNumber;
	}

	public String getRemainingArrange() {
		return this.remainingArrange;
	}

	public void setRemainingArrange(String remainingArrange) {
		this.remainingArrange = remainingArrange;
	}

	public String getRequiredSoftware() {
		return this.requiredSoftware;
	}

	public void setRequiredSoftware(String requiredSoftware) {
		this.requiredSoftware = requiredSoftware;
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

	public Integer getState() {
		return this.state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getTotalClassHour() {
		return this.totalClassHour;
	}

	public void setTotalClassHour(String totalClassHour) {
		this.totalClassHour = totalClassHour;
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

	public String getTutor() {
		return this.tutor;
	}

	public void setTutor(String tutor) {
		this.tutor = tutor;
	}

	public String getUseweek() {
		return this.useweek;
	}

	public void setUseweek(String useweek) {
		this.useweek = useweek;
	}

	public String getWeekClassHour() {
		return this.weekClassHour;
	}

	public void setWeekClassHour(String weekClassHour) {
		this.weekClassHour = weekClassHour;
	}

	public String getWeekType() {
		return this.weekType;
	}

	public void setWeekType(String weekType) {
		this.weekType = weekType;
	}

	public Integer getWeekday() {
		return this.weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}

	public String getWeeksExperiment() {
		return this.weeksExperiment;
	}

	public void setWeeksExperiment(String weeksExperiment) {
		this.weeksExperiment = weeksExperiment;
	}

	public SchoolCourse getSchoolCourse() {
		return this.schoolCourse;
	}

	public void setSchoolCourse(SchoolCourse schoolCourse) {
		this.schoolCourse = schoolCourse;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<SchoolCourseStudent> getSchoolCourseStudents() {
		return this.schoolCourseStudents;
	}

	public void setSchoolCourseStudents(Set<SchoolCourseStudent> schoolCourseStudents) {
		this.schoolCourseStudents = schoolCourseStudents;
	}

	public SchoolCourseStudent addSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().add(schoolCourseStudent);
		schoolCourseStudent.setSchoolCourseDetail(this);

		return schoolCourseStudent;
	}

	public SchoolCourseStudent removeSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().remove(schoolCourseStudent);
		schoolCourseStudent.setSchoolCourseDetail(null);

		return schoolCourseStudent;
	}

	public Set<TimetableAppointment> getTimetableAppointments() {
		return this.timetableAppointments;
	}

	public void setTimetableAppointments(Set<TimetableAppointment> timetableAppointments) {
		this.timetableAppointments = timetableAppointments;
	}

	public TimetableAppointment addTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().add(timetableAppointment);
		timetableAppointment.setSchoolCourseDetail(this);

		return timetableAppointment;
	}

	public TimetableAppointment removeTimetableAppointment(TimetableAppointment timetableAppointment) {
		getTimetableAppointments().remove(timetableAppointment);
		timetableAppointment.setSchoolCourseDetail(null);

		return timetableAppointment;
	}

}