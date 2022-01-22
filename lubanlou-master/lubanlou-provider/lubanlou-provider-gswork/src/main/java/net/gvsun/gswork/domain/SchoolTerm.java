package net.gvsun.gswork.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_term database table.
 */
@Entity
@Table(name = "school_term")
@NamedQuery(name = "SchoolTerm.findAll", query = "SELECT s FROM SchoolTerm s")
public class SchoolTerm implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "term_code")
    private Integer termCode;

    @Temporal(TemporalType.DATE)
    @Column(name = "term_end")
    private Date termEnd;

    @Column(name = "term_name")
    private String termName;

    @Temporal(TemporalType.DATE)
    @Column(name = "term_start")
    private Date termStart;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "year_code")
    private String yearCode;

    @Column(name = "now_term")
    private Integer nowTerm;
    /**
     * 学期状态 1可用 0不可用
     */
    @Column(name = "term_status")
    private Integer termStatus;


    //bi-directional many-to-one association to SchoolWeek
    @OneToMany(mappedBy = "schoolTerm")
    private Set<SchoolWeek> schoolWeeks;

    //bi-directional many-to-one association to TCourseSite
    @OneToMany(mappedBy = "schoolTerm")
    private Set<TCourseSite> TCourseSites;


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

    public Integer getNowTerm() {
        return nowTerm;
    }

    public void setNowTerm(Integer nowTerm) {
        this.nowTerm = nowTerm;
    }

    public Integer getTermStatus() {
        return termStatus;
    }

    public void setTermStatus(Integer termStatus) {
        this.termStatus = termStatus;
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

}