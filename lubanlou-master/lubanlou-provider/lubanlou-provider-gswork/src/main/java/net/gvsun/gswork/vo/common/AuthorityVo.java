package net.gvsun.gswork.vo.common;

import java.io.Serializable;

public class AuthorityVo implements Serializable {
    private Integer id;
    private String authorityName;
    private String cname;
    private Integer userCount;
    private Integer nowAuthority;
    private String authorityType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public Integer getUserCount() {
        return userCount;
    }

    public void setUserCount(Integer userCount) {
        this.userCount = userCount;
    }

    public Integer getNowAuthority() {
        return nowAuthority;
    }

    public void setNowAuthority(Integer nowAuthority) {
        this.nowAuthority = nowAuthority;
    }

    public String getAuthorityType() {
        return authorityType;
    }

    public void setAuthorityType(String authorityType) {
        this.authorityType = authorityType;
    }
}
