package net.gvsun.gswork.vo;

import java.io.Serializable;

/**
 * Created by REM on 2021/3/30.
 */
public class DistributionDTO implements Serializable{
    private String username;
    private String cname;
    private String distribution;


    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
