package net.gvsun.gswork.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_course_site database table.
 */
@Entity
@Table(name = "t_course_site")
@NamedQuery(name = "TCourseSite.findAll", query = "SELECT t FROM TCourseSite t")
public class TCourseSite implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_time")
    private Date createdTime;

    @Lob
    private String description;

    @Column(name = "experiment_skill_profile")
    private String experimentSkillProfile;

    private Integer isNewApp;

    private Integer isOpen;
    private Integer isShare;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_time")
    private Date modifiedTime;

    @Column(name = "site_code")
    private String siteCode;

    private String siteImage;

    private Integer status;

    private String teacherImage;

    private String title;
    private String edu_course_no;

    private String courseEnName;
    private Integer courseSubjectId;
    private String courseEnterpriseFunds;
    private String courseSchoolFunds;
    private String courseTutorFunds;
    private Integer courseScore;
    private Calendar courseTime;
    private Integer courseAuditStatus;
    private String courseTeacher;
    private Calendar courseDelayTime;
    private String courseDelayReason;
    private String courseManager;
    private String type;
    private Integer typeId;
    private String courseAutoNumber;
    private String qrcodeUrl;
    @Column(name = "school_number")
    private String schoolNumber;
    @Column(name = "pattern")
    private String pattern;

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }
    @ManyToOne
    @JoinColumn(name = "term_id")
    private SchoolTerm schoolTerm;

    @Basic
    @Column(name = "course_en_name")
    public String getCourseEnName() {
        return courseEnName;
    }

    @Basic
    @Column(name = "course_recruit_audit")
    private Integer courseRecruitAudit;

    public void setCourseEnName(String courseEnName) {
        this.courseEnName = courseEnName;
    }

    @Basic
    @Column(name = "course_subject_id")
    public Integer getCourseSubjectId() {
        return courseSubjectId;
    }

    public void setCourseSubjectId(Integer courseSubjectId) {
        this.courseSubjectId = courseSubjectId;
    }

    @Basic
    @Column(name = "course_enterprise_funds")
    public String getCourseEnterpriseFunds() {
        return courseEnterpriseFunds;
    }

    public void setCourseEnterpriseFunds(String courseEnterpriseFunds) {
        this.courseEnterpriseFunds = courseEnterpriseFunds;
    }

    @Column(name = "course_auto_number")
    @Basic
    public String getCourseAutoNumber() {
        return courseAutoNumber;
    }

    public void setCourseAutoNumber(String courseAutoNumber) {
        this.courseAutoNumber = courseAutoNumber;
    }

    @Basic
    @Column(name = "course_school_funds")
    public String getCourseSchoolFunds() {
        return courseSchoolFunds;
    }

    public void setCourseSchoolFunds(String courseSchoolFunds) {
        this.courseSchoolFunds = courseSchoolFunds;
    }

    @Basic
    @Column(name = "course_tutor_funds")
    public String getCourseTutorFunds() {
        return courseTutorFunds;
    }

    public void setCourseTutorFunds(String courseTutorFunds) {
        this.courseTutorFunds = courseTutorFunds;
    }

    @Basic
    @Column(name = "course_score")
    public Integer getCourseScore() {
        return courseScore;
    }

    public void setCourseScore(Integer courseScore) {
        this.courseScore = courseScore;
    }

    @Basic
    @Column(name = "course_time")
    public Calendar getCourseTime() {
        return courseTime;
    }

    public void setCourseTime(Calendar courseTime) {
        this.courseTime = courseTime;
    }

    @Basic
    @Column(name = "type_id")
    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    @Basic
    @Column(name = "course_audit_status")
    public Integer getCourseAuditStatus() {
        return courseAuditStatus;
    }

    public void setCourseAuditStatus(Integer courseAuditStatus) {
        this.courseAuditStatus = courseAuditStatus;
    }

    @Basic
    @Column(name = "course_teacher")
    public String getCourseTeacher() {
        return courseTeacher;
    }

    public void setCourseTeacher(String courseTeacher) {
        this.courseTeacher = courseTeacher;
    }

    @Basic
    @Column(name = "course_delay_time")
    public Calendar getCourseDelayTime() {
        return courseDelayTime;
    }

    public void setCourseDelayTime(Calendar courseDelayTime) {
        this.courseDelayTime = courseDelayTime;
    }

    @Basic
    @Column(name = "course_delay_reason")
    public String getCourseDelayReason() {
        return courseDelayReason;
    }

    public void setCourseDelayReason(String courseDelayReason) {
        this.courseDelayReason = courseDelayReason;
    }

    @Basic
    @Column(name = "course_manager")
    public String getCourseManager() {
        return courseManager;
    }

    public void setCourseManager(String courseManager) {
        this.courseManager = courseManager;
    }

    public String getEdu_course_no() {
        return edu_course_no;
    }

    public void setEdu_course_no(String edu_course_no) {
        this.edu_course_no = edu_course_no;
    }

//    @ManyToOne
//    @JoinColumn(name = "subject_number")
//    private SchoolSubject schoolSubject;

    //bi-directional many-to-one association to User
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User userByCreatedBy;

    //bi-directional many-to-one association to User
    @ManyToOne
    @JoinColumn(name = "modified_by")
    private User userByModifiedBy;

    public String getSchoolNumber() {
        return schoolNumber;
    }

    public void setSchoolNumber(String schoolNumber) {
        this.schoolNumber = schoolNumber;
    }

    //bi-directional many-to-one association to TCourseSiteGroup
    @OneToMany(mappedBy = "TCourseSite")
    private Set<TCourseSiteGroup> TCourseSiteGroups;

    //bi-directional many-to-one association to TCourseSiteUser
    @OneToMany(mappedBy = "TCourseSite")
    private Set<TCourseSiteUser> TCourseSiteUsers;


    //bi-directional many-to-one association to WkChapter
    @OneToMany(mappedBy = "TCourseSite", cascade = {CascadeType.REMOVE})
    private Set<WkChapter> wkChapters;

    @Column(name = "pro_status")
    private Integer proStatus;

    @Column(name = "template_id")
    private Integer templateId;

    @Column(name = "class_hours")
    private Integer classHours;

    //bi-directional many-to-many association to school_academy
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "academy_course"
            , joinColumns = {
            @JoinColumn(name = "course_id")
    }
            , inverseJoinColumns = {
            @JoinColumn(name = "academy_id")
    }
    )
    @OrderBy(value = "academyNumber ASC")
    private Set<SchoolAcademy> academys;

    //bi-directional many-to-many association to school_major
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "major_course"
            , joinColumns = {
            @JoinColumn(name = "course_id")
    }
            , inverseJoinColumns = {
            @JoinColumn(name = "major_number")
    }
    )

    public Set<SchoolAcademy> getAcademys() {
        return academys;
    }

    public void setAcademys(Set<SchoolAcademy> academys) {
        this.academys = academys;
    }

    public Integer getClassHours() {
        return classHours;
    }

    public void setClassHours(Integer classHours) {
        this.classHours = classHours;
    }

    public TCourseSite() {
    }

    public Integer getId() {
        return this.id;
    }

    public SchoolTerm getSchoolTerm() {
        return schoolTerm;
    }

    public void setSchoolTerm(SchoolTerm schoolTerm) {
        this.schoolTerm = schoolTerm;
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

    public String getExperimentSkillProfile() {
        return this.experimentSkillProfile;
    }

    public void setExperimentSkillProfile(String experimentSkillProfile) {
        this.experimentSkillProfile = experimentSkillProfile;
    }

    public Integer getIsNew_app() {
        return this.isNewApp;
    }

    public void setIsNew_app(int isNewApp) {
        this.isNewApp = isNewApp;
    }

    public Integer getIsOpen() {
        return this.isOpen;
    }

    public void setIsOpen(int isOpen) {
        this.isOpen = isOpen;
    }

    public Integer getIsShare() {
        return isShare;
    }

    public void setIsShare(Integer isShare) {
        this.isShare = isShare;
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


    public Set<TCourseSiteGroup> getTCourseSiteGroups() {
        return this.TCourseSiteGroups;
    }

    public void setTCourseSiteGroups(Set<TCourseSiteGroup> TCourseSiteGroups) {
        this.TCourseSiteGroups = TCourseSiteGroups;
    }

    public TCourseSiteGroup addTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
        getTCourseSiteGroups().add(TCourseSiteGroup);
        TCourseSiteGroup.setTCourseSite(this);

        return TCourseSiteGroup;
    }

    public TCourseSiteGroup removeTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
        getTCourseSiteGroups().remove(TCourseSiteGroup);
        TCourseSiteGroup.setTCourseSite(null);

        return TCourseSiteGroup;
    }

    public Set<TCourseSiteUser> getTCourseSiteUsers() {
        return this.TCourseSiteUsers;
    }

    public void setTCourseSiteUsers(Set<TCourseSiteUser> TCourseSiteUsers) {
        this.TCourseSiteUsers = TCourseSiteUsers;
    }

    public TCourseSiteUser addTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
        getTCourseSiteUsers().add(TCourseSiteUser);
        TCourseSiteUser.setTCourseSite(this);

        return TCourseSiteUser;
    }

    public TCourseSiteUser removeTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
        getTCourseSiteUsers().remove(TCourseSiteUser);
        TCourseSiteUser.setTCourseSite(null);

        return TCourseSiteUser;
    }


    public Set<WkChapter> getWkChapters() {
        return this.wkChapters;
    }

    public void setWkChapters(Set<WkChapter> wkChapters) {
        this.wkChapters = wkChapters;
    }

    public WkChapter addWkChapter(WkChapter wkChapter) {
        getWkChapters().add(wkChapter);
        wkChapter.setTCourseSite(this);

        return wkChapter;
    }

    public WkChapter removeWkChapter(WkChapter wkChapter) {
        getWkChapters().remove(wkChapter);
        wkChapter.setTCourseSite(null);

        return wkChapter;
    }

    public Integer getProStatus() {
        return proStatus;
    }

    public void setProStatus(Integer proStatus) {
        this.proStatus = proStatus;
    }

    public Integer getCourseRecruitAudit() {
        return courseRecruitAudit;
    }

    public void setCourseRecruitAudit(Integer courseRecruitAudit) {
        this.courseRecruitAudit = courseRecruitAudit;
    }

    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }
}