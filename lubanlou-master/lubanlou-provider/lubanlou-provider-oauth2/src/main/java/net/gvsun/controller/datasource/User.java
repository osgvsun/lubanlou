package net.gvsun.controller.datasource;

import java.util.List;

public class User {
    private String username;
    private String password;
    private String cname;
    private String gender;
    private boolean enabled;
    private String gitlabUsername;
    private String qqOpenid;
    private String wechatOpenid;
    private String phone;
    private String unionid;
    private boolean firstLogin;
    private boolean enterprise;
    private String email;
    private String SJTUUserNo;
    private String hduUserNo;
    private List<Authority> authorities;

    public List<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getGitlabUsername() {
        return gitlabUsername;
    }

    public void setGitlabUsername(String gitlabUsername) {
        this.gitlabUsername = gitlabUsername;
    }

    public String getQqOpenid() {
        return qqOpenid;
    }

    public void setQqOpenid(String qqOpenid) {
        this.qqOpenid = qqOpenid;
    }

    public String getWechatOpenid() {
        return wechatOpenid;
    }

    public void setWechatOpenid(String wechatOpenid) {
        this.wechatOpenid = wechatOpenid;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUnionid() {
        return unionid;
    }

    public void setUnionid(String unionid) {
        this.unionid = unionid;
    }

    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public boolean isEnterprise() {
        return enterprise;
    }

    public void setEnterprise(boolean enterprise) {
        this.enterprise = enterprise;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSJTUUserNo() {
        return SJTUUserNo;
    }

    public void setSJTUUserNo(String SJTUUserNo) {
        this.SJTUUserNo = SJTUUserNo;
    }

    public String getHduUserNo() {
        return hduUserNo;
    }

    public void setHduUserNo(String hduUserNo) {
        this.hduUserNo = hduUserNo;
    }
}
