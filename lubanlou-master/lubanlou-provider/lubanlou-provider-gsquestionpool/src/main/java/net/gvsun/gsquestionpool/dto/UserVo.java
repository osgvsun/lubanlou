package net.gvsun.gsquestionpool.dto;

import java.io.Serializable;
import java.util.Set;

public class UserVo implements Serializable {
    private String uid;
    private String username;
    private String password;
    private String cname;
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
}
