package net.gvsun.iot.external;

import java.io.Serializable;

public class AttendanceGroupUserEntity implements Serializable{
    private Integer groupId;
    private String username;

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
