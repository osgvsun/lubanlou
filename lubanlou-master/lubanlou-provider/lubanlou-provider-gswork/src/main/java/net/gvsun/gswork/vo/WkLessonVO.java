package net.gvsun.gswork.vo;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:课程中课时VO
 *
 * @author:mashuai
 * @date:2018/1/4
 **************************************************************************/
public class WkLessonVO implements Serializable {
    /**
     * 课时id
     */
    private Integer id;

    /**
     * 课时标题
     */
    private String title;

    /**
     * 课时内容概述
     */
    private String content;

    /**
     * 课时排序
     */
    private Integer seq;
    /**
     * 学习目标
     */
    private String learningTarget;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 章节id
     */
    private Integer chapterId;
    /**
     * 课程id
     */
    private Integer siteId;

    private Integer isOpen;

    private Integer skillId;
    /*
     * 小节是否有作业
     * */
    private Integer hasHomework;


    /**
     * 文件对应的tAssignment
     */
    private List<TAssignmentVO> tAssignmentVOS;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getLearningTarget() {
        return learningTarget;
    }

    public void setLearningTarget(String learningTarget) {
        this.learningTarget = learningTarget;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public List<TAssignmentVO> gettAssignmentVOS() {
        return tAssignmentVOS;
    }

    public void settAssignmentVOS(List<TAssignmentVO> tAssignmentVOS) {
        this.tAssignmentVOS = tAssignmentVOS;
    }

    public Integer getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Integer isOpen) {
        this.isOpen = isOpen;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public Integer getHasHomework() {
        return hasHomework;
    }

    public void setHasHomework(Integer hasHomework) {
        this.hasHomework = hasHomework;
    }

}
