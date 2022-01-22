package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the school_course_student database table.
 * 
 */
@Entity
@Table(name="school_course_student")
@NamedQuery(name="SchoolCourseStudent.findAll", query="SELECT s FROM SchoolCourseStudent s")
public class SchoolCourseStudent implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="classes_students")
	private String classesStudents;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	@Column(name="major_direction_name")
	private String majorDirectionName;

	@Column(name="major_name")
	private String majorName;

	private String memo;

	private Integer state;

	@Column(name="test_num")
	private Integer testNum;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="teacher_number")
	private User userByTeacherNumber;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	//bi-directional many-to-one association to SchoolCourseDetail
	@ManyToOne
	@JoinColumn(name="course_detail_no")
	private SchoolCourseDetail schoolCourseDetail;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="student_number")
	private User userByStudentNumber;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to SchoolClass
	@ManyToOne
	@JoinColumn(name="classes_number")
	private SchoolClass schoolClass;

	public SchoolCourseStudent() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getClassesStudents() {
		return this.classesStudents;
	}

	public void setClassesStudents(String classesStudents) {
		this.classesStudents = classesStudents;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Integer getState() {
		return this.state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public Integer getTestNum() {
		return this.testNum;
	}

	public void setTestNum(int testNum) {
		this.testNum = testNum;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public User getUserByTeacherNumber() {
		return this.userByTeacherNumber;
	}

	public void setUserByTeacherNumber(User userByTeacherNumber) {
		this.userByTeacherNumber = userByTeacherNumber;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public SchoolCourseDetail getSchoolCourseDetail() {
		return this.schoolCourseDetail;
	}

	public void setSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		this.schoolCourseDetail = schoolCourseDetail;
	}

	public User getUserByStudentNumber() {
		return this.userByStudentNumber;
	}

	public void setUserByStudentNumber(User userByStudentNumber) {
		this.userByStudentNumber = userByStudentNumber;
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

}