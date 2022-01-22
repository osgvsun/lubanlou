package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class SchoolVo implements Serializable {
    //学校编号
    private Integer number;
    //学校名称
    private String name;
    //项目名称（配置项）
    private String projectName;
    //证书名称
    private String title;
    //编号前缀
    private String prefix;
    //学校公章图片
    private String photoUrl;

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProjectName() {
        return this.projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrefix() {
        return this.prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getPhotoUrl() {
        return this.photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
