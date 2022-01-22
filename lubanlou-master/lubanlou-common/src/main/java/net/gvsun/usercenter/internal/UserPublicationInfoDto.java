package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserPublicationInfoDto implements Serializable {
    private Long id;
    private String publicationName;
    private String isbnNumber;
    private String press;
    private Date publishTime;
    private String publishTimeFormat;
    private String characters;
    private Integer personRank;
    private Integer wordCount;
    private String coverFileIds;
    private String titlePageFileIds;
    private String backCoverFileIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPublicationName() {
        return publicationName;
    }

    public void setPublicationName(String publicationName) {
        this.publicationName = publicationName;
    }

    public String getIsbnNumber() {
        return isbnNumber;
    }

    public void setIsbnNumber(String isbnNumber) {
        this.isbnNumber = isbnNumber;
    }

    public String getPress() {
        return press;
    }

    public void setPress(String press) {
        this.press = press;
    }

    public String getPublishTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (publishTimeFormat != null) {
            format = new SimpleDateFormat(publishTimeFormat);
        }
        if (publishTime != null)
            return format.format(publishTime);
        else
            return null;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public void setPublishTime(Date publishTime, String format) {
        this.publishTime = publishTime;
        this.publishTimeFormat = format;
    }

    public String getCharacters() {
        return characters;
    }

    public void setCharacters(String characters) {
        this.characters = characters;
    }

    public Integer getPersonRank() {
        return personRank;
    }

    public void setPersonRank(Integer personRank) {
        this.personRank = personRank;
    }

    public Integer getWordCount() {
        return wordCount;
    }

    public void setWordCount(Integer wordCount) {
        this.wordCount = wordCount;
    }

    public String getCoverFileIds() {
        return coverFileIds;
    }

    public void setCoverFileIds(String coverFileIds) {
        this.coverFileIds = coverFileIds;
    }

    public String getTitlePageFileIds() {
        return titlePageFileIds;
    }

    public void setTitlePageFileIds(String titlePageFileIds) {
        this.titlePageFileIds = titlePageFileIds;
    }

    public String getBackCoverFileIds() {
        return backCoverFileIds;
    }

    public void setBackCoverFileIds(String backCoverFileIds) {
        this.backCoverFileIds = backCoverFileIds;
    }
}
