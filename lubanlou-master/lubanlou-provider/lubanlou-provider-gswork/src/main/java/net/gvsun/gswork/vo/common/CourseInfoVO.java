package net.gvsun.gswork.vo.common;

import java.io.Serializable;

/**************************************************************************
 * Description:课程信息的VO
 *
 * @author:朱宇飞
 * @date:2018/1/5
 **************************************************************************/
public class CourseInfoVO implements Serializable {
    /*
    站点id
    */
    private Integer siteId;
    /*
    课程图片
     */
    private String siteImage;
    /*
    教师图片
     */
    private String teachImage;

    /*
    创建人信息
     */
    private UserVo userByCreatedBy;

    /**
     * 课程站点的名称
     */
    private String title;
    /**
     * 课程站点的英文名称
     */
    private String enTitle;
    /**
     * 实验技能概要
     */
    private String experimentSkillProfile;
    /**
     * 学期id
     */
    private Integer termId;
    private String description;
    private String teachers;

    public String getTeachers() {
        return teachers;
    }

    public void setTeachers(String teachers) {
        this.teachers = teachers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEnTitle() {
        return enTitle;
    }

    public void setEnTitle(String enTitle) {
        this.enTitle = enTitle;
    }

    public String getExperimentSkillProfile() {
        return experimentSkillProfile;
    }

    public void setExperimentSkillProfile(String experimentSkillProfile) {
        this.experimentSkillProfile = experimentSkillProfile;
    }

    public UserVo getUserByCreatedBy() {
        return userByCreatedBy;
    }

    public void setUserByCreatedBy(UserVo userByCreatedBy) {
        this.userByCreatedBy = userByCreatedBy;
    }

    public String getTeachImage() {
        return teachImage;
    }

    public void setTeachImage(String teachImage) {
        this.teachImage = teachImage;
    }

    public String getSiteImage() {

        return siteImage;
    }

    public void setSiteImage(String siteImage) {
        this.siteImage = siteImage;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }
}