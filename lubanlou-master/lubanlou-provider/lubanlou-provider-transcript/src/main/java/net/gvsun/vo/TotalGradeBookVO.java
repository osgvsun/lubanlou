package net.gvsun.vo;

import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by Administrator on 2018/1/31.
 */
public class TotalGradeBookVO implements Serializable {
    /**
     *  成绩册id
    */
    @ApiModelProperty(value = "成绩id",name = "id")
    private Integer id;

    /**
     *  课程站点id
     */
    @ApiModelProperty(value = "课程站点id",name = "siteId")
    private Integer siteId;
    /**
     *  学生名称
     */
    @ApiModelProperty(value = "学生姓名",name = "cname")
    private String cname;
    /**
     *  学生学号
     */
    @ApiModelProperty(value = "学生学号",name = "username")
    private String username;
    /**
     *  额外成绩
     */
    @ApiModelProperty(value = "额外成绩",name = "additionScore")
    private String additionScore;

    /**
     *  作业成绩
     */
    @ApiModelProperty(value = "作业成绩",name = "assignmentScore")
    private String assignmentScore;
    /**
     *  测验成绩
     */
    @ApiModelProperty(value = "测验成绩",name = "testScore")
    private String testScore;
    /**
     * 实验项目测试成绩
     */
    @ApiModelProperty(value = "实验项目测试成绩",name = "skillTestScore")
    private String skillTestScore;
    /**
     *  考试成绩
     */
    @ApiModelProperty(value = "考试成绩",name = "examScore")
    private String examScore;
    /**
     *  考勤成绩
     */
    @ApiModelProperty(value = "考勤成绩",name = "attendenceScore")
    private String attendenceScore;
    /**
     *  实验项目成绩
     */
    @ApiModelProperty(value = "实验项目成绩",name = "experimentScore")
    private String experimentScore;

    /**
     *  行为成绩
     */
    @ApiModelProperty(value = "行为成绩",name = "actionScore")
    private String actionScore;
    /**
     *  体验小组成绩
     */
    @ApiModelProperty(value = "体验小组成绩",name = "experienceScore")
    private String experienceScore;
    /**
     *  权重成绩
     */
    @ApiModelProperty(value = "权重成绩",name = "weightScore")
    private String weightScore;
    /**
     *  更新时间
     */
    @ApiModelProperty(value = "更新时间",name = "updateTime")
    private String updateTime;
    /**
     *  实验作业成绩
     */
    @ApiModelProperty(value = "实验作业成绩",name = "skillAssignmentScore")
    private String skillAssignmentScore;
    /**
     *  实验报告成绩
     */
    @ApiModelProperty(value = "实验报告成绩",name = "skillReportScore")
    private String skillReportScore;
    /**
     *  实验数据成绩
     */
    @ApiModelProperty(value = "实验数据成绩",name = "skillDataScore")
    private String skillDataScore;
    /**
     *  实验考勤成绩
     */
    @ApiModelProperty(value = "实验考勤成绩",name = "skillAttendanceScore")
    private String skillAttendanceScore;

    /**
     *  作业成绩
     */
    @ApiModelProperty(value = "体验作业成绩",name = "experienceWorkScore")
    private String experienceWorkScore;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAssignmentScore() {
        return assignmentScore;
    }

    public void setAssignmentScore(String assignmentScore) {
        this.assignmentScore = assignmentScore;
    }

    public String getTestScore() {
        return testScore;
    }

    public void setTestScore(String testScore) {
        this.testScore = testScore;
    }

    public String getExamScore() {
        return examScore;
    }

    public void setExamScore(String examScore) {
        this.examScore = examScore;
    }

    public String getAttendenceScore() {
        return attendenceScore;
    }

    public void setAttendenceScore(String attendenceScore) {
        this.attendenceScore = attendenceScore;
    }

    public String getExperimentScore() {
        return experimentScore;
    }

    public void setExperimentScore(String experimentScore) {
        this.experimentScore = experimentScore;
    }

    public String getActionScore() {
        return actionScore;
    }

    public void setActionScore(String actionScore) {
        this.actionScore = actionScore;
    }

    public String getExperienceScore() {
        return experienceScore;
    }

    public void setExperienceScore(String experienceScore) {
        this.experienceScore = experienceScore;
    }

    public String getWeightScore() {
        return weightScore;
    }

    public void setWeightScore(String weightScore) {
        this.weightScore = weightScore;
    }

    public String getAdditionScore() {
        return additionScore;
    }

    public void setAdditionScore(String additionScore) {
        this.additionScore = additionScore;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getSkillTestScore() {
        return skillTestScore;
    }

    public void setSkillTestScore(String skillTestScore) {
        this.skillTestScore = skillTestScore;
    }

    public String getSkillAssignmentScore() {
        return skillAssignmentScore;
    }

    public void setSkillAssignmentScore(String skillAssignmentScore) {
        this.skillAssignmentScore = skillAssignmentScore;
    }

    public String getSkillReportScore() {
        return skillReportScore;
    }

    public void setSkillReportScore(String skillReportScore) {
        this.skillReportScore = skillReportScore;
    }

    public String getSkillDataScore() {
        return skillDataScore;
    }

    public void setSkillDataScore(String skillDataScore) {
        this.skillDataScore = skillDataScore;
    }

    public String getSkillAttendanceScore() {
        return skillAttendanceScore;
    }

    public void setSkillAttendanceScore(String skillAttendanceScore) {
        this.skillAttendanceScore = skillAttendanceScore;
    }

    public String getExperienceWorkScore() {
        return experienceWorkScore;
    }

    public void setExperienceWorkScore(String experienceWorkScore) {
        this.experienceWorkScore = experienceWorkScore;
    }
}
