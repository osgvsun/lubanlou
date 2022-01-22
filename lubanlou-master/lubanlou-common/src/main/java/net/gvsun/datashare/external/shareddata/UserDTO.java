package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;

public class UserDTO extends Recordable implements Shared {

    private String username;
    private String cname;
    private String phone;
    private String academy;
    private String mail;
    private String userSexy;
    private String classesNumber;
    private String userRole;
    private String password;
    private String id;
    private String text;
    private String departmentNumber;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAcademy() {
        return academy;
    }

    public void setAcademy(String academy) {
        this.academy = academy;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUserSexy() {
        return userSexy;
    }

    public void setUserSexy(String userSexy) {
        this.userSexy = userSexy;
    }

    public String getClassesNumber() {
        return classesNumber;
    }

    public void setClassesNumber(String classesNumber) {
        this.classesNumber = classesNumber;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDepartmentNumber() {
        return departmentNumber;
    }

    public void setDepartmentNumber(String departmentNumber) {
        this.departmentNumber = departmentNumber;
    }
}
