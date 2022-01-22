package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class AuthorityVo implements Serializable {
    private Integer id;
    private String authorityName;
    private String cname;

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
}
