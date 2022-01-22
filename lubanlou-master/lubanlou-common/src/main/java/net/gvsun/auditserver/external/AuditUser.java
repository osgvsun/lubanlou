package net.gvsun.auditserver.external;


/**
 * Created by Administrator on 2018/8/14.
 */
public class AuditUser {
    private String auth;
    private String username;
    private String cname;

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
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
