package net.gvsun.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/1/31.
 */
public class TotalWeightSettingVO implements Serializable {
    /**
     *  成绩册id
    */
    private Integer id;

    /**
     *  课程站点id
     */
    private Integer siteId;
    /**
     *  作业权重
     */
    private Double assignmentWeight;
    private String assignmentTitle;
    /**
     *  知识测验权重
     */
    private Double testWeight;
    private String testTitle;
    /**
     *  技能测验权重
     */
    private Double skillTestWeight;
    private String skillTestTitle;
    /**
     *  考试权重
     */
    private Double examWeight;
    private String examTitle;
    /**
     *  考勤权重
     */
    private Double attendenceWeight;
    private String attendenceTitle;
    /**
     *  实验项目权重
     */
    private Double experimentWeight;
    private String experimentTitle;

    /**
     *  行为权重
     */
    private Double actionWeight;
    private String actionTitle;
    /**
     *  体验小组权重
     */
    private Double experienceWeight;
    private String experienceTitle;
    /**
     *  体验小组导师权重
     */
    private Double teachWeight;
    private String teachTitle;
    /**
     *  体验小组评委权重
     */
    private Double judgesWeight;
    private String judgesTitle;
    /**
     *  体验小组权重
     */
    private List<Map<Integer,Double>> groupStageWeight;

    /**
     *  技能作业权重
     */
    private Double skillAssignmentWeight;

    /**
     *  技能报告权重
     */
    private Double skillReportWeight;

    /**
     *  技能数据权重
     */
    private Double skillDataWeight;

    /**
     *  技能考勤权重
     */
    private Double skillAttendanceWeight;

    /**
     *  体验作业权重
     */
    private Double experienceWorkWeight;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public String getAssignmentTitle() {
        return assignmentTitle;
    }

    public void setAssignmentTitle(String assignmentTitle) {
        this.assignmentTitle = assignmentTitle;
    }

    public String getTestTitle() {
        return testTitle;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getAttendenceTitle() {
        return attendenceTitle;
    }

    public void setAttendenceTitle(String attendenceTitle) {
        this.attendenceTitle = attendenceTitle;
    }

    public String getExperimentTitle() {
        return experimentTitle;
    }

    public void setExperimentTitle(String experimentTitle) {
        this.experimentTitle = experimentTitle;
    }

    public String getActionTitle() {
        return actionTitle;
    }

    public void setActionTitle(String actionTitle) {
        this.actionTitle = actionTitle;
    }

    public String getExperienceTitle() {
        return experienceTitle;
    }

    public void setExperienceTitle(String experienceTitle) {
        this.experienceTitle = experienceTitle;
    }

    public String getTeachTitle() {
        return teachTitle;
    }

    public void setTeachTitle(String teachTitle) {
        this.teachTitle = teachTitle;
    }

    public String getJudgesTitle() {
        return judgesTitle;
    }

    public void setJudgesTitle(String judgesTitle) {
        this.judgesTitle = judgesTitle;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Double getAssignmentWeight() {
        return assignmentWeight;
    }

    public void setAssignmentWeight(Double assignmentWeight) {
        this.assignmentWeight = assignmentWeight;
    }

    public Double getTestWeight() {
        return testWeight;
    }

    public void setTestWeight(Double testWeight) {
        this.testWeight = testWeight;
    }

    public Double getSkillTestWeight() {
        return skillTestWeight;
    }

    public void setSkillTestWeight(Double skillTestWeight) {
        this.skillTestWeight = skillTestWeight;
    }

    public Double getExamWeight() {
        return examWeight;
    }

    public void setExamWeight(Double examWeight) {
        this.examWeight = examWeight;
    }

    public Double getAttendenceWeight() {
        return attendenceWeight;
    }

    public void setAttendenceWeight(Double attendenceWeight) {
        this.attendenceWeight = attendenceWeight;
    }

    public Double getExperimentWeight() {
        return experimentWeight;
    }

    public void setExperimentWeight(Double experimentWeight) {
        this.experimentWeight = experimentWeight;
    }

    public List<Map<Integer, Double>> getGroupStageWeight() {
        return groupStageWeight;
    }

    public void setGroupStageWeight(List<Map<Integer, Double>> groupStageWeight) {
        this.groupStageWeight = groupStageWeight;
    }

    public Double getActionWeight() {
        return actionWeight;
    }

    public void setActionWeight(Double actionWeight) {
        this.actionWeight = actionWeight;
    }

    public Double getExperienceWeight() {
        return experienceWeight;
    }

    public void setExperienceWeight(Double experienceWeight) {
        this.experienceWeight = experienceWeight;
    }

    public Double getTeachWeight() {
        return teachWeight;
    }

    public void setTeachWeight(Double teachWeight) {
        this.teachWeight = teachWeight;
    }

    public Double getJudgesWeight() {
        return judgesWeight;
    }

    public void setJudgesWeight(Double judgesWeight) {
        this.judgesWeight = judgesWeight;
    }

    public String getSkillTestTitle() {
        return skillTestTitle;
    }

    public void setSkillTestTitle(String skillTestTitle) {
        this.skillTestTitle = skillTestTitle;
    }

    public Double getSkillAssignmentWeight() {
        return skillAssignmentWeight;
    }

    public void setSkillAssignmentWeight(Double skillAssignmentWeight) {
        this.skillAssignmentWeight = skillAssignmentWeight;
    }

    public Double getSkillReportWeight() {
        return skillReportWeight;
    }

    public void setSkillReportWeight(Double skillReportWeight) {
        this.skillReportWeight = skillReportWeight;
    }

    public Double getSkillDataWeight() {
        return skillDataWeight;
    }

    public void setSkillDataWeight(Double skillDataWeight) {
        this.skillDataWeight = skillDataWeight;
    }

    public Double getSkillAttendanceWeight() {
        return skillAttendanceWeight;
    }

    public void setSkillAttendanceWeight(Double skillAttendanceWeight) {
        this.skillAttendanceWeight = skillAttendanceWeight;
    }

    public Double getExperienceWorkWeight() {
        return experienceWorkWeight;
    }

    public void setExperienceWorkWeight(Double experienceWorkWeight) {
        this.experienceWorkWeight = experienceWorkWeight;
    }
}
