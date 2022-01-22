package net.gvsun.gswork.domain;

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

	@Column(name="school_number")
	private Integer schoolNumber;

	@Column(name="academy_description")
	private String academyDescription;


	//bi-directional many-to-one association to User
	@OneToMany(mappedBy="schoolAcademy")
	private Set<User> users;

	//bi-directional many-to-many association to t_course_site
	@ManyToMany(mappedBy="academys",fetch = FetchType.LAZY)
	private Set<TCourseSite> courses;

	public Set<TCourseSite> getCourses() {
		return courses;
	}

	public void setCourses(Set<TCourseSite> courses) {
		this.courses = courses;
	}

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

	public Integer getSchoolNumber() {
		return schoolNumber;
	}

	public void setSchoolNumber(Integer schoolNumber) {
		this.schoolNumber = schoolNumber;
	}

	public String getAcademyDescription() {
		return academyDescription;
	}

	public void setAcademyDescription(String academyDescription) {
		this.academyDescription = academyDescription;
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