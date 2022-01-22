package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class UserDetailDto implements Serializable {
    private Long id;
    private String username;
    private Integer age;
    private String cname;   //中文名
    private String ename;   //英文名
    private String gender;  //性别
    private String studentNo;//学号
    private String employeeNo;//工号
    private String idNo;//身份证号
    private Date birth;
    private String birthFormat;
    private Date partyTime;
    private String partyTimeFormat;
    private String officeRoom;
    private String phone;
    private String email;
    private String political;
    private String college;
    private String collegeName;
    private String department;
    private String cardNo;
    private String nation;
    private String placeOfDomicile;
    private String hmtTrafficPermit;
    private Integer highestDegreeGetFromMatherSchool;
    private String passport;
    private String state;
    private String researchInterests;
    private Date idNoStartDatetime;
    private String idNoStartDatetimeFormat;
    private Date idNoEndDatetime;
    private String idNoEndDatetimeFormat;
    private Date passportStartDatetime;
    private String passportStartDatetimeFormat;
    private Date passportEndDatetime;
    private String passportEndDatetimeFormat;
    private Date hmtTrafficPermitStartDatetime;
    private String hmtTrafficPermitStartDatetimeFormat;
    private Date hmtTrafficPermitEndDatetime;
    private String hmtTrafficPermitEndDatetimeFormat;
    private String resume;
    private String landline;
    private String nativePlace;
    private List<RoleDto> roleList;
    private String currentSiteName;
    private Long currentRoleId;
    private String currentRoleName;
    private Long identificationPhoto;
    private String currProfession;//当前职称
    private String major;
    private Boolean death;
    private String homePage;

    public String getHomePage() {
        return homePage;
    }

    public void setHomePage(String homePage) {
        this.homePage = homePage;
    }

    public Boolean getDeath() {
        return death;
    }

    public void setDeath(Boolean death) {
        this.death = death;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCurrProfession() {
        return currProfession;
    }

    public void setCurrProfession(String currProfession) {
        this.currProfession = currProfession;
    }

    public Long getIdentificationPhoto() {
        return identificationPhoto;
    }

    public void setIdentificationPhoto(Long identificationPhoto) {
        this.identificationPhoto = identificationPhoto;
    }

    public String getCurrentRoleName() {
        return currentRoleName;
    }

    public void setCurrentRoleName(String currentRoleName) {
        this.currentRoleName = currentRoleName;
    }

    public Long getCurrentRoleId() {
        return currentRoleId;
    }

    public void setCurrentRoleId(Long currentRoleId) {
        this.currentRoleId = currentRoleId;
    }

    public String getCurrentSiteName() {
        return currentSiteName;
    }

    public void setCurrentSiteName(String currentSiteName) {
        this.currentSiteName = currentSiteName;
    }

    public String getBirth() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (birthFormat != null) {
            format = new SimpleDateFormat(birthFormat);
        }
        if (birth != null)
            return format.format(birth);
        else
            return null;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public void setBirth(Date birth, String format) {
        this.birth = birth;
        this.birthFormat = format;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getNativePlace() {
        return nativePlace;
    }

    public void setNativePlace(String nativePlace) {
        this.nativePlace = nativePlace;
    }

    public String getPolitical() {
        return political;
    }

    public void setPolitical(String political) {
        this.political = political;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
    }

    public String getEmployeeNo() {
        return employeeNo;
    }

    public void setEmployeeNo(String employeeNo) {
        this.employeeNo = employeeNo;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public List<RoleDto> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<RoleDto> roleList) {
        this.roleList = roleList;
    }

    public String getPartyTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (partyTimeFormat != null) {
            format = new SimpleDateFormat(partyTimeFormat);
        }
        if (partyTime != null)
            return format.format(partyTime);
        else
            return null;
    }

    public void setPartyTime(Date partyTime) {
        this.partyTime = partyTime;
    }

    public void setPartyTime(Date partyTime, String format) {
        this.partyTime = partyTime;
        this.partyTimeFormat = format;
    }

    public String getOfficeRoom() {
        return officeRoom;
    }

    public void setOfficeRoom(String officeRoom) {
        this.officeRoom = officeRoom;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPlaceOfDomicile() {
        return placeOfDomicile;
    }

    public void setPlaceOfDomicile(String placeOfDomicile) {
        this.placeOfDomicile = placeOfDomicile;
    }

    public String getHmtTrafficPermit() {
        return hmtTrafficPermit;
    }

    public void setHmtTrafficPermit(String hmtTrafficPermit) {
        this.hmtTrafficPermit = hmtTrafficPermit;
    }

    public Integer getHighestDegreeGetFromMatherSchool() {
        return highestDegreeGetFromMatherSchool;
    }

    public void setHighestDegreeGetFromMatherSchool(Integer highestDegreeGetFromMatherSchool) {
        this.highestDegreeGetFromMatherSchool = highestDegreeGetFromMatherSchool;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getResearchInterests() {
        return researchInterests;
    }

    public void setResearchInterests(String researchInterests) {
        this.researchInterests = researchInterests;
    }

    public String getIdNoStartDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (idNoStartDatetimeFormat != null) {
            format = new SimpleDateFormat(idNoStartDatetimeFormat);
        }
        if (idNoStartDatetime != null)
            return format.format(idNoStartDatetime);
        else
            return null;
    }

    public void setIdNoStartDatetime(Date idNoStartDatetime) {
        this.idNoStartDatetime = idNoStartDatetime;
    }

    public void setIdNoStartDatetime(Date idNoStartDatetime, String format) {
        this.idNoStartDatetime = idNoStartDatetime;
        this.idNoStartDatetimeFormat = format;
    }

    public String getIdNoEndDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (idNoEndDatetimeFormat != null) {
            format = new SimpleDateFormat(idNoEndDatetimeFormat);
        }
        if (idNoEndDatetime != null)
            return format.format(idNoEndDatetime);
        else
            return null;
    }

    public void setIdNoEndDatetime(Date idNoEndDatetime) {
        this.idNoEndDatetime = idNoEndDatetime;
    }

    public void setIdNoEndDatetime(Date idNoEndDatetime, String format) {
        this.idNoEndDatetime = idNoEndDatetime;
        this.idNoEndDatetimeFormat = format;
    }

    public String getPassportStartDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (passportStartDatetimeFormat != null) {
            format = new SimpleDateFormat(passportStartDatetimeFormat);
        }
        if (passportStartDatetime != null)
            return format.format(passportStartDatetime);
        else
            return null;
    }

    public void setPassportStartDatetime(Date passportStartDatetime) {
        this.passportStartDatetime = passportStartDatetime;
    }

    public void setPassportStartDatetime(Date passportStartDatetime, String format) {
        this.passportStartDatetime = passportStartDatetime;
        this.passportStartDatetimeFormat = format;
    }

    public String getPassportEndDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (passportEndDatetimeFormat != null) {
            format = new SimpleDateFormat(passportEndDatetimeFormat);
        }
        if (passportEndDatetime != null)
            return format.format(passportEndDatetime);
        else
            return null;
    }

    public void setPassportEndDatetime(Date passportEndDatetime) {
        this.passportEndDatetime = passportEndDatetime;
    }

    public String getHmtTrafficPermitStartDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (hmtTrafficPermitStartDatetimeFormat != null) {
            format = new SimpleDateFormat(hmtTrafficPermitStartDatetimeFormat);
        }
        if (hmtTrafficPermitStartDatetime != null)
            return format.format(hmtTrafficPermitStartDatetime);
        else
            return null;
    }

    public void setHmtTrafficPermitStartDatetime(Date hmtTrafficPermitStartDatetime) {
        this.hmtTrafficPermitStartDatetime = hmtTrafficPermitStartDatetime;
    }

    public void setHmtTrafficPermitStartDatetime(Date hmtTrafficPermitStartDatetime, String format) {
        this.hmtTrafficPermitStartDatetime = hmtTrafficPermitStartDatetime;
        this.hmtTrafficPermitStartDatetimeFormat = format;
    }

    public String getHmtTrafficPermitEndDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (hmtTrafficPermitEndDatetimeFormat != null) {
            format = new SimpleDateFormat(hmtTrafficPermitEndDatetimeFormat);
        }
        if (hmtTrafficPermitEndDatetime != null)
            return format.format(hmtTrafficPermitEndDatetime);
        else
            return null;
    }

    public void setHmtTrafficPermitEndDatetime(Date hmtTrafficPermitEndDatetime) {
        this.hmtTrafficPermitEndDatetime = hmtTrafficPermitEndDatetime;
    }

    public void setHmtTrafficPermitEndDatetime(Date hmtTrafficPermitEndDatetime, String format) {
        this.hmtTrafficPermitEndDatetime = hmtTrafficPermitEndDatetime;
        this.hmtTrafficPermitEndDatetimeFormat = format;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }
}