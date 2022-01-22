package net.gvsun.gswork.vo;


import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:章节VO
 *
 * @author:mashuai
 * @date:2018/1/4
 **************************************************************************/
public class WkChapterVO implements Serializable {
    /**
     * 章节id
     */
    private Integer id;

    /**
     * 章节名称
     */
    private String name;

    /**
     * 章节排序
     */
    private Integer sort;

    /**
     * 章节类型
     */
    private Integer type;

    /**
     * 章节内容概述
     */
    private String context;
    /**
     * 课程站点id
     */
    private Integer siteId;

    /**
     * 封存
     */
    private Integer lockchapter;

    /**
     * 课时集合
     */
    private List<WkLessonVO> lessionVOList;


    /**
     * 章节序号
     */
    private Integer seq;

    /**
     * 实验项目是否开放
     */
    private Integer isOpen;

    /**
     * 实验项目编号
     */
    private Integer skillId;

    /*
     * 章节是否有作业
     * */
    private Integer hasHomework;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getContext() {
        return context;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Integer getLockchapter() {
        return lockchapter;
    }

    public void setLockchapter(Integer lockchapter) {
        this.lockchapter = lockchapter;
    }

    public List<WkLessonVO> getLessionVOList() {
        return lessionVOList;
    }

    public void setLessionVOList(List<WkLessonVO> lessionVOList) {
        this.lessionVOList = lessionVOList;
    }


    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
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
