package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class TAssignmentVo implements Serializable {
    private String uid;
    private Integer id;
    private String UserByStudent;
    public String getUid() {
        return uid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserByStudent() {
        return UserByStudent;
    }

    public void setUserByStudent(String userByStudent) {
        UserByStudent = userByStudent;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }
}
