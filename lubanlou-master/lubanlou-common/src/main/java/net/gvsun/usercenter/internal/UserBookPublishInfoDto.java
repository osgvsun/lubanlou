package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserBookPublishInfoDto implements Serializable {
    private Long id;
    private String bookName;
    private String isbnNumber;
    private String press;
    private Date publishTime;
    private String publishTimeFormat;
    private String bookNature;
    private String characters;
    private Integer wordCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
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

    public String getBookNature() {
        return bookNature;
    }

    public void setBookNature(String bookNature) {
        this.bookNature = bookNature;
    }

    public String getCharacters() {
        return characters;
    }

    public void setCharacters(String characters) {
        this.characters = characters;
    }

    public Integer getWordCount() {
        return wordCount;
    }

    public void setWordCount(Integer wordCount) {
        this.wordCount = wordCount;
    }
}
