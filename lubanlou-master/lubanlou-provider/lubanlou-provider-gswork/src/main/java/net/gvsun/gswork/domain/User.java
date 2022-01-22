package net.gvsun.gswork.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the user database table.
 */
@Entity
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String username;

    @Column(name = "attendance_time")
    private String attendanceTime;

    @Column(name = "bachelor_major")
    private String bachelorMajor;

    private String cardno;

    private String cname;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "doctor_major")
    private String doctorMajor;

    private String duties;

    private String email;

    private Byte enabled;

    @Column(name = "enrollment_status")
    private Integer enrollmentStatus;

    private String grade;

    @Column(name = "if_enrollment")
    private String ifEnrollment;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_login")
    private Date lastLogin;

    @Column(name = "major_direction")
    private String majorDirection;

    @Column(name = "major_number")
    private String majorNumber;

    @Column(name = "master_major")
    private String masterMajor;

    private String password;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private String qq;

    @Column(name = "teacher_number")
    private Integer teacherNumber;

    private String telephone;

    @Temporal(TemporalType.DATE)
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "user_role")
    private String userRole;

    @Column(name = "user_sexy")
    private String userSexy;

    @Column(name = "user_status")
    private String userStatus;

    @Column(name = "user_type")
    private Integer userType;

    @Column(name = "is_black_list")
    private Integer isBlackList;
    ;

    //bi-directional many-to-one association to TAssignment
    @OneToMany(mappedBy = "user")
    private Set<TAssignment> TAssignments;

    //bi-directional many-to-one association to TAssignmentAnswerAssign
    @OneToMany(mappedBy = "user")
    private Set<TAssignmentAnswerAssign> TAssignmentAnswerAssigns;

    //bi-directional many-to-one association to TAssignmentGrading
    @OneToMany(mappedBy = "userByStudent")
    private Set<TAssignmentGrading> TAssignmentGradingsByStudent;

    //bi-directional many-to-one association to TAssignmentGrading
    @OneToMany(mappedBy = "userByGradeBy")
    private Set<TAssignmentGrading> TAssignmentGradingsByGradeBy;


    //bi-directional many-to-one association to TCourseSite
    @OneToMany(mappedBy = "userByCreatedBy")
    private Set<TCourseSite> TCourseSitesByCreatedBy;

    //bi-directional many-to-one association to TCourseSite
    @OneToMany(mappedBy = "userByModifiedBy")
    private Set<TCourseSite> TCourseSitesByModifiedBy;


    //bi-directional many-to-one association to TCourseSiteUser
    @OneToMany(mappedBy = "user")
    private Set<TCourseSiteUser> TCourseSiteUsers;

    @ManyToOne
    @JoinColumn(name = "academy_number")
    private SchoolAcademy schoolAcademy;

    //bi-directional many-to-one association to SchoolClass
    @ManyToOne
    @JoinColumn(name = "classes_number")
    private SchoolClass schoolClass;


    //bi-directional many-to-many association to Authority
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_authority"
            , joinColumns = {
            @JoinColumn(name = "user_id")
    }
            , inverseJoinColumns = {
            @JoinColumn(name = "authority_id")
    }
    )
    @OrderBy(value = "id ASC")
    private Set<Authority> authorities;

    //bi-directional many-to-one association to WkFolder
    @OneToMany(mappedBy = "user")
    private Set<WkFolder> wkFolders;

    //bi-directional many-to-one association to WkUpload
    @OneToMany(mappedBy = "user")
    private Set<WkUpload> wkUploads;


    public User() {
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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


    public Integer getIsBlackList() {
        return isBlackList;
    }

    public void setIsBlackList(Integer isBlackList) {
        this.isBlackList = isBlackList;
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

}