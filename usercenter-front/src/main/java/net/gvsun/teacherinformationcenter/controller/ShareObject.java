package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.session.ShareAttribute;

public class ShareObject implements ShareAttribute {
    private String username;
    private String pwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}