package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class RoleDto implements Serializable {
    private Long id;
    private String roleName;
    private String roleCname;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleCname() {
        return roleCname;
    }

    public void setRoleCname(String roleCname) {
        this.roleCname = roleCname;
    }
}
