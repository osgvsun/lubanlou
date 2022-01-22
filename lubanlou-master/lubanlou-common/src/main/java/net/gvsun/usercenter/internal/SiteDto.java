package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class SiteDto implements Serializable {
    private Long id;
    private String siteCName;
    private String siteEnName;
    private String siteUrl;
    private String siteSecret;
    private String siteType;
    private String siteSource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSiteCName() {
        return siteCName;
    }

    public void setSiteCName(String siteCName) {
        this.siteCName = siteCName;
    }

    public String getSiteEnName() {
        return siteEnName;
    }

    public void setSiteEnName(String siteEnName) {
        this.siteEnName = siteEnName;
    }

    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getSiteSecret() {
        return siteSecret;
    }

    public void setSiteSecret(String siteSecret) {
        this.siteSecret = siteSecret;
    }

    public String getSiteType() {
        return siteType;
    }

    public void setSiteType(String siteType) {
        this.siteType = siteType;
    }

    public String getSiteSource() {
        return siteSource;
    }

    public void setSiteSource(String siteSource) {
        this.siteSource = siteSource;
    }
}
