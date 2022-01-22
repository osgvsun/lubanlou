package net.gvsun.controller.datasource;

public class Authority {
    private String clientId;
    private int clientAuthorityId;
    private String authorityEname;
    private String authorityCname;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public int getClientAuthorityId() {
        return clientAuthorityId;
    }

    public void setClientAuthorityId(int clientAuthorityId) {
        this.clientAuthorityId = clientAuthorityId;
    }

    public String getAuthorityEname() {
        return authorityEname;
    }

    public void setAuthorityEname(String authorityEname) {
        this.authorityEname = authorityEname;
    }

    public String getAuthorityCname() {
        return authorityCname;
    }

    public void setAuthorityCname(String authorityCname) {
        this.authorityCname = authorityCname;
    }
}
