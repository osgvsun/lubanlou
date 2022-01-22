package net.gvsun.gsexam.dto.common;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

public class UserVo implements Serializable {
    private String uid;
    private String username;
    private String password;
    private String cname;
    private String schoolAcademy;
    private String academyNumber;
    private String academyName;
    private String schoolClass;
    private String className;
    private String classNumber;
    private String sex;
    private String role;
    /**
     * 图片地址
     */
    private String photoUrl;
    /**
     * 用户权限
     */
    private List<AuthorityVo> authorityVoList;


    public String getUid() {
        return uid;
    }
    private Set<AuthorityVo> authorities;

    public void setUid(String uid) {
        this.uid = uid;
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

    public Set<AuthorityVo> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<AuthorityVo> authorities) {
        this.authorities = authorities;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSchoolAcademy() { return schoolAcademy; }

    public void setSchoolAcademy(String schoolAcademy) {
        this.schoolAcademy = schoolAcademy;
    }

    public String getSchoolClass() { return schoolClass; }

    public void setSchoolClass(String schoolClass) {
        this.schoolClass = schoolClass;
    }

    public String getSex() { return sex; }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public List<AuthorityVo> getAuthorityVoList() {
        return authorityVoList;
    }

    public void setAuthorityVoList(List<AuthorityVo> authorityVoList) {
        this.authorityVoList = authorityVoList;
    }

    public String  getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
