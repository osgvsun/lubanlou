package net.gvsun.entity;

import net.gvsun.oauth2.dto.CustomGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

public class UserForDataSource extends User implements Cloneable {
    private String schoolName;
    private String collegeId;
    private String college;
    private Collection<CustomGrantedAuthority> authorities = new ArrayList<>();


    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public Collection<CustomGrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<CustomGrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    @Override
    public UserForDataSource clone() throws CloneNotSupportedException {
        return (UserForDataSource) super.clone();
    }
}
