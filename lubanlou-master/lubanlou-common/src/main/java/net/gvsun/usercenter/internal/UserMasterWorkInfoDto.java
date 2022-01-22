package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserMasterWorkInfoDto implements Serializable {
    private Long id;
    private String thesisTitle;
    private String periodical;
    private String periodicalVolume;
    private String periodicalPage;
    private Date publicationTime;
    private String publicationTimeFormat;
    private String characters;
    private String firstAuthor;
    private String withFirstAuthorRelationship;
    private String jcr;
    private String impactFactor;
    private String thesisLink;
    private Integer selfSetting;

    public Integer getSelfSetting() {
        return selfSetting;
    }

    public void setSelfSetting(Integer selfSetting) {
        this.selfSetting = selfSetting;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThesisTitle() {
        return thesisTitle;
    }

    public void setThesisTitle(String thesisTitle) {
        this.thesisTitle = thesisTitle;
    }

    public String getPeriodical() {
        return periodical;
    }

    public void setPeriodical(String periodical) {
        this.periodical = periodical;
    }

    public String getPeriodicalVolume() {
        return periodicalVolume;
    }

    public void setPeriodicalVolume(String periodicalVolume) {
        this.periodicalVolume = periodicalVolume;
    }

    public String getPeriodicalPage() {
        return periodicalPage;
    }

    public void setPeriodicalPage(String periodicalPage) {
        this.periodicalPage = periodicalPage;
    }

    public String getCharacters() {
        return characters;
    }

    public void setCharacters(String characters) {
        this.characters = characters;
    }

    public String getFirstAuthor() {
        return firstAuthor;
    }

    public void setFirstAuthor(String firstAuthor) {
        this.firstAuthor = firstAuthor;
    }

    public String getWithFirstAuthorRelationship() {
        return withFirstAuthorRelationship;
    }

    public void setWithFirstAuthorRelationship(String withFirstAuthorRelationship) {
        this.withFirstAuthorRelationship = withFirstAuthorRelationship;
    }

    public String getPublicationTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        if (publicationTimeFormat != null) {
            format = new SimpleDateFormat(publicationTimeFormat);
        }
        if (publicationTime != null)
            return format.format(publicationTime);
        else
            return null;
    }

    public void setPublicationTime(Date publicationTime) {
        this.publicationTime = publicationTime;
    }

    public void setPublicationTime(Date publicationTime, String format) {
        this.publicationTime = publicationTime;
        this.publicationTimeFormat = format;
    }

    public String getJcr() {
        return jcr;
    }

    public void setJcr(String jcr) {
        this.jcr = jcr;
    }

    public String getImpactFactor() {
        return impactFactor;
    }

    public void setImpactFactor(String impactFactor) {
        this.impactFactor = impactFactor;
    }

    public String getThesisLink() {
        return thesisLink;
    }

    public void setThesisLink(String thesisLink) {
        this.thesisLink = thesisLink;
    }
}
