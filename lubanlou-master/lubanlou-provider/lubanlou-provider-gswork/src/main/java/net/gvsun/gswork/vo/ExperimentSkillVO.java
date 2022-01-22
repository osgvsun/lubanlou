package net.gvsun.gswork.vo;

import java.io.Serializable;
import java.math.BigDecimal;

/**************************************************************************
 * Description:实验项目的VO
 *
 * @author:mashuai
 * @date:2018/1/4
 **************************************************************************/
public class ExperimentSkillVO implements Serializable {
    /**
     * 实验项目的id
     */
    private Integer id;

    /**
     * 关联的站点id
     */
    private Integer siteId;

    /**
     * 实验项目名称
     */
    private String experimentName;

    /**
     * 实验项目编号
     */
    private String experimentNo;

    /**
     * 实验项目排序
     */
    private Integer sort;

    /**
     *实验类别
     */
    private Integer experimentType;

    /**
     *是否启用
     */
    private Integer experimentIsopen;

    /**
     *实验版本
     */
    private String experimentVersion;

    /**
     *开始时间
     */
    private String  startdate;

    /**
     *结束时间
     */
    private String duedate;

    /**
     *课时数
     */
    private Integer classNum;

    /**
     *实验目的
     */
    private String experimentGoal;

    /**
     *实验描述
     */
    private String experimentDescribe;

    /**
     * 实验室名称
     */
    private LabRoomVO labRoomName;
    /**
     * 实验权重
     */
    private BigDecimal weight;

    /**
     *标志位：有无所属实验室，1：有，0：没有
     */
    private Integer roomFlag;
    /**
     *是否添加到成绩簿：yes：是，no：否
     */
    public Integer  toAddGrade;
    /**
     *所属章节id
     */
    public Integer chapterId;

    public Integer lessonId;

    public String title;

    public String count;

    public Integer getToAddGrade() {
        return toAddGrade;
    }

    public void setToAddGrade(Integer addGrade) {
        this.toAddGrade = addGrade;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getId() {
        return id;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getExperimentName() {
        return experimentName;
    }

    public void setExperimentName(String experimentName) {
        this.experimentName = experimentName;
    }

    public String getExperimentNo() {
        return experimentNo;
    }

    public void setExperimentNo(String experimentNo) {
        this.experimentNo = experimentNo;
    }

    public Integer getExperimentType() {
        return experimentType;
    }

    public void setExperimentType(Integer experimentType) {
        this.experimentType = experimentType;
    }

    public Integer getExperimentIsopen() {
        return experimentIsopen;
    }

    public void setExperimentIsopen(Integer experimentIsopen) {
        this.experimentIsopen = experimentIsopen;
    }

    public String getExperimentVersion() {
        return experimentVersion;
    }

    public void setExperimentVersion(String experimentVersion) {
        this.experimentVersion = experimentVersion;
    }

    public String getExperimentGoal() {
        return experimentGoal;
    }

    public void setExperimentGoal(String experimentGoal) {
        this.experimentGoal = experimentGoal;
    }

    public String getExperimentDescribe() {
        return experimentDescribe;
    }

    public void setExperimentDescribe(String experimentDescribe) {
        this.experimentDescribe = experimentDescribe;
    }

    public LabRoomVO getLabRoomName() {
        return labRoomName;
    }

    public void setLabRoomName(LabRoomVO labRoomName) {
        this.labRoomName = labRoomName;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getDuedate() {
        return duedate;
    }

    public void setDuedate(String duedate) {
        this.duedate = duedate;
    }

    public Integer getClassNum() {
        return classNum;
    }

    public void setClassNum(Integer classNum) {
        this.classNum = classNum;
    }

    public Integer getRoomFlag() {
        return roomFlag;
    }

    public void setRoomFlag(Integer roomFlag) {
        this.roomFlag = roomFlag;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public void setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
    }

    public Integer getLessonId() {
        return lessonId;
    }

    public void setLessonId(Integer lessonId) {
        this.lessonId = lessonId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "ExperimentSkillVO{" +
                "id=" + id +
                ", siteId=" + siteId +
                ", experimentName='" + experimentName + '\'' +
                ", experimentNo='" + experimentNo + '\'' +
                ", sort=" + sort +
                ", experimentType=" + experimentType +
                ", experimentIsopen=" + experimentIsopen +
                ", experimentVersion='" + experimentVersion + '\'' +
                ", startdate='" + startdate + '\'' +
                ", duedate='" + duedate + '\'' +
                ", classNum=" + classNum +
                ", experimentGoal='" + experimentGoal + '\'' +
                ", experimentDescribe='" + experimentDescribe + '\'' +
                ", labRoomName=" + labRoomName +
                ", weight=" + weight +
                ", roomFlag=" + roomFlag +
                ", toAddGrade=" + toAddGrade +
                ", chapterId=" + chapterId +
                ", lessonId=" + lessonId +
                ", title='" + title + '\'' +
                ", count='" + count + '\'' +
                '}';
    }
}
