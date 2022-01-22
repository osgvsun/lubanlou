package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_copy database table.
 * 
 */
@Entity
@Table(name="t_course_site_copy")
@NamedQuery(name="TCourseSiteCopy.findAll", query="SELECT t FROM TCourseSiteCopy t")
public class TCourseSiteCopy implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	@Lob
	private String description;

	private Integer isOpen;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modified_time")
	private Date modifiedTime;

	@Column(name="site_code")
	private String siteCode;

	private String siteImage;

	private Integer status;

	private String teacherImage;

	private String title;

	private String type;

	//bi-directional many-to-one association to SchoolCourseInfo
	@ManyToOne
	@JoinColumn(name="course_number")
	private SchoolCourseInfo schoolCourseInfo;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User userByCreatedBy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="modified_by")
	private User userByModifiedBy;

	//bi-directional many-to-one association to SchoolMajor
	@ManyToOne
	@JoinColumn(name="major_number")
	private SchoolMajor schoolMajor;

	public TCourseSiteCopy() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIsOpen() {
		return this.isOpen;
	}

	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}

	public Date getModifiedTime() {
		return this.modifiedTime;
	}

	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	public String getSiteCode() {
		return this.siteCode;
	}

	public void setSiteCode(String siteCode) {
		this.siteCode = siteCode;
	}

	public String getSiteImage() {
		return this.siteImage;
	}

	public void setSiteImage(String siteImage) {
		this.siteImage = siteImage;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getTeacherImage() {
		return this.teacherImage;
	}

	public void setTeacherImage(String teacherImage) {
		this.teacherImage = teacherImage;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public SchoolCourseInfo getSchoolCourseInfo() {
		return this.schoolCourseInfo;
	}

	public void setSchoolCourseInfo(SchoolCourseInfo schoolCourseInfo) {
		this.schoolCourseInfo = schoolCourseInfo;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public User getUserByCreatedBy() {
		return this.userByCreatedBy;
	}

	public void setUserByCreatedBy(User userByCreatedBy) {
		this.userByCreatedBy = userByCreatedBy;
	}

	public User getUserByModifiedBy() {
		return this.userByModifiedBy;
	}

	public void setUserByModifiedBy(User userByModifiedBy) {
		this.userByModifiedBy = userByModifiedBy;
	}

	public SchoolMajor getSchoolMajor() {
		return this.schoolMajor;
	}

	public void setSchoolMajor(SchoolMajor schoolMajor) {
		this.schoolMajor = schoolMajor;
	}

}