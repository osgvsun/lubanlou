package net.gvsun.usercenter.internal;

import java.io.Serializable;


public class GroupsDto implements Serializable {
    private Long id;
    private String groupName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
