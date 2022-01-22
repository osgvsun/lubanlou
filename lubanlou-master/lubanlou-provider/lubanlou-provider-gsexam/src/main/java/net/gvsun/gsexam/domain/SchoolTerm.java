package net.gvsun.gsexam.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_term database table.
 * 
 */
@Entity
@Table(name="school_term")
@NamedQuery(name="SchoolTerm.findAll", query="SELECT s FROM SchoolTerm s")
public class SchoolTerm implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="term_code")
	private Integer termCode;

	@Temporal(TemporalType.DATE)
	@Column(name="term_end")
	private Date termEnd;

	@Column(name="term_name")
	private String termName;

	@Temporal(TemporalType.DATE)
	@Column(name="term_start")
	private Date termStart;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	@Column(name="year_code")
	private String yearCode;

	//bi-directional many-to-one association to SchoolCourse
	@OneToMany(mappedBy="schoolTerm")
	private Set<SchoolCourse> schoolCourses;

	//bi-directional many-to-one association to SchoolCourseDetail
	@OneToMany(mappedBy="schoolTerm")
	private Set<SchoolCourseDetail> schoolCourseDetails;

	//bi-directional many-to-one association to SchoolCourseStudent
	@OneToMany(mappedBy="schoolTerm")
	private Set<SchoolCourseStudent> schoolCourseStudents;

	//bi-directional many-to-one association to SchoolWeek
	@OneToMany(mappedBy="schoolTerm")
	private Set<SchoolWeek> schoolWeeks;

	//bi-directional many-to-one association to TCourseSite
	@OneToMany(mappedBy="schoolTerm")
	private Set<TCourseSite> TCourseSites;

	//bi-directional many-to-one association to TCourseSiteCopy
	@OneToMany(mappedBy="schoolTerm")
	private Set<TCourseSiteCopy> TCourseSiteCopies;

	public SchoolTerm() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Integer getTermCode() {
		return this.termCode;
	}

	public void setTermCode(int termCode) {
		this.termCode = termCode;
	}

	public Date getTermEnd() {
		return this.termEnd;
	}

	public void setTermEnd(Date termEnd) {
		this.termEnd = termEnd;
	}

	public String getTermName() {
		return this.termName;
	}

	public void setTermName(String termName) {
		this.termName = termName;
	}

	public Date getTermStart() {
		return this.termStart;
	}

	public void setTermStart(Date termStart) {
		this.termStart = termStart;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getYearCode() {
		return this.yearCode;
	}

	public void setYearCode(String yearCode) {
		this.yearCode = yearCode;
	}

	@JsonIgnore
	public Set<SchoolCourse> getSchoolCourses() {
		return this.schoolCourses;
	}

	public void setSchoolCourses(Set<SchoolCourse> schoolCourses) {
		this.schoolCourses = schoolCourses;
	}

	public SchoolCourse addSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().add(schoolCours);
		schoolCours.setSchoolTerm(this);

		return schoolCours;
	}

	public SchoolCourse removeSchoolCours(SchoolCourse schoolCours) {
		getSchoolCourses().remove(schoolCours);
		schoolCours.setSchoolTerm(null);

		return schoolCours;
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
		schoolCourseDetail.setSchoolTerm(this);

		return schoolCourseDetail;
	}

	public SchoolCourseDetail removeSchoolCourseDetail(SchoolCourseDetail schoolCourseDetail) {
		getSchoolCourseDetails().remove(schoolCourseDetail);
		schoolCourseDetail.setSchoolTerm(null);

		return schoolCourseDetail;
	}
	@JsonIgnore
	public Set<SchoolCourseStudent> getSchoolCourseStudents() {
		return this.schoolCourseStudents;
	}

	public void setSchoolCourseStudents(Set<SchoolCourseStudent> schoolCourseStudents) {
		this.schoolCourseStudents = schoolCourseStudents;
	}

	public SchoolCourseStudent addSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().add(schoolCourseStudent);
		schoolCourseStudent.setSchoolTerm(this);

		return schoolCourseStudent;
	}

	public SchoolCourseStudent removeSchoolCourseStudent(SchoolCourseStudent schoolCourseStudent) {
		getSchoolCourseStudents().remove(schoolCourseStudent);
		schoolCourseStudent.setSchoolTerm(null);

		return schoolCourseStudent;
	}
	@JsonIgnore
	public Set<SchoolWeek> getSchoolWeeks() {
		return this.schoolWeeks;
	}

	public void setSchoolWeeks(Set<SchoolWeek> schoolWeeks) {
		this.schoolWeeks = schoolWeeks;
	}

	public SchoolWeek addSchoolWeek(SchoolWeek schoolWeek) {
		getSchoolWeeks().add(schoolWeek);
		schoolWeek.setSchoolTerm(this);

		return schoolWeek;
	}

	public SchoolWeek removeSchoolWeek(SchoolWeek schoolWeek) {
		getSchoolWeeks().remove(schoolWeek);
		schoolWeek.setSchoolTerm(null);

		return schoolWeek;
	}
	@JsonIgnore
	public Set<TCourseSite> getTCourseSites() {
		return this.TCourseSites;
	}

	public void setTCourseSites(Set<TCourseSite> TCourseSites) {
		this.TCourseSites = TCourseSites;
	}

	public TCourseSite addTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().add(TCourseSite);
		TCourseSite.setSchoolTerm(this);

		return TCourseSite;
	}

	public TCourseSite removeTCourseSite(TCourseSite TCourseSite) {
		getTCourseSites().remove(TCourseSite);
		TCourseSite.setSchoolTerm(null);

		return TCourseSite;
	}
	@JsonIgnore
	public Set<TCourseSiteCopy> getTCourseSiteCopies() {
		return this.TCourseSiteCopies;
	}

	public void setTCourseSiteCopies(Set<TCourseSiteCopy> TCourseSiteCopies) {
		this.TCourseSiteCopies = TCourseSiteCopies;
	}

	public TCourseSiteCopy addTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().add(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolTerm(this);

		return TCourseSiteCopy;
	}

	public TCourseSiteCopy removeTCourseSiteCopy(TCourseSiteCopy TCourseSiteCopy) {
		getTCourseSiteCopies().remove(TCourseSiteCopy);
		TCourseSiteCopy.setSchoolTerm(null);

		return TCourseSiteCopy;
	}
}