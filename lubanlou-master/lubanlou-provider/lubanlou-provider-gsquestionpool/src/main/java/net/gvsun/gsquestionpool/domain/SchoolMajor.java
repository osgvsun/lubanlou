package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_major database table.
 * 
 */
@Entity
@Table(name="school_major")
@NamedQuery(name="SchoolMajor.findAll", query="SELECT s FROM SchoolMajor s")
public class SchoolMajor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="major_number")
	private String majorNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="created_by")
	private String createdBy;

	private Integer id;

	@Column(name="major_name")
	private String majorName;

	@Column(name="student_type")
	private String studentType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	@Column(name="updated_by")
	private String updatedBy;

	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="schoolMajor")
	private Set<TCourseSiteCopy> TCourseSiteCopies;

	public SchoolMajor() {
	}

	public String getMajorNumber() {
		return this.majorNumber;
	}

	public void setMajorNumber(String majorNumber) {
		this.majorNumber = majorNumber;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMajorName() {
		return this.majorName;
	}

	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}

	public String getStudentType() {
		return this.studentType;
	}

	public void setStudentType(String studentType) {
		this.studentType = studentType;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Set<TCourseSiteCopy> getTCourseSiteCopies() {
		return this.TCourseSiteCopies;
	}

	public void setTCourseSiteCopies(Set<TCourseSiteCopy> TCourseSiteCopies) {
		this.TCourseSiteCopies = TCourseSiteCopies;
	}

	public TCourseSiteCopy addTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().add(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolMajor(this);

		return TCourseSiteCopy;
	}

	public TCourseSiteCopy removeTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().remove(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolMajor(null);

		return TCourseSiteCopy;
	}

}