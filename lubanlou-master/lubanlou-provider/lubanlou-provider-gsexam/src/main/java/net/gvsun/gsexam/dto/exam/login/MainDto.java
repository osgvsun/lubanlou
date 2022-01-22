package net.gvsun.gsexam.dto.exam.login;
import java.io.Serializable;

public class MainDto implements Serializable {
    private String username;
    private String cname;
    private String academyNumber;
    private String academyName;

    private String AuthorityCname;
    private String AuthorityName;

    public String getAuthorityCname() {
        return AuthorityCname;
    }

    public void setAuthorityCname(String authorityCname) {
        AuthorityCname = authorityCname;
    }

    public String getAuthorityName() {
        return AuthorityName;
    }

    public void setAuthorityName(String authorityName) {
        AuthorityName = authorityName;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
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
}