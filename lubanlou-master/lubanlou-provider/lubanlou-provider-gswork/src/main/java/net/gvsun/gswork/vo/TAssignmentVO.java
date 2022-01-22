package net.gvsun.gswork.vo;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:作业VO
 *
 * @author:lixueteng
 * @date:2018/2/5 0005
 **************************************************************************/
public class TAssignmentVO implements Serializable {
    /**
     * 作业的id
     */
    private Integer id;
    /**
     * 作业的标题
     */
    private String title;
    /**
     * 作业的分类 1知识 2技能 3体验
     */
    private Integer category;
    /**
     * 作业的类型 0普通作业 1小组作业
     */
    private Integer type;
    /**
     * 作业的章的id
     */
    private Integer chapterId;
    /**
     * 作业的章的名称
     */
    private String chapterName;
    /**
     * 作业的小节的id
     */
    private Integer lessonId;
    /**
     * 作业的小节的名称
     */
    private String lessonName;
    /**
     * 作业的实验项目的id
     */
    private Integer expProjectId;
    /**
     * 作业的实验项目的名称
     */
    private String expProjectName;
    /**
     * 作业的开始时间
     */
    private String startDate;
    /**
     * 作业的结束时间
     */
    private String endDate;
    /**
     * 作业的文件名 可能是list
     */
    private String fileName;
    /**
     * 是否添加到成绩册
     */
    private Integer isToGradebook;
    /**
     * 是否将成绩公布给学生
     */
    private Integer isGradeToStudent;
    /**
     * 是否将成绩计入总成绩
     */
    private Integer isGradeToTotalGrade;
    /**
     * 是否全部批改 1全部修改 0 部分修改
     */
    private Integer isAllModeify;
    /**
     * 是否需要提交
     */
    private Integer isNeedCommit;
    /**
     * 批阅形式 0 离线批阅 1 在线批阅
     */
    private Integer remarkStyle;
    /**
     * 提交次数 0不限制
     */
    private Integer commitTime;
    /**
     * 提交的形式 1文字或者附件 2直接输入文字 3只有附件
     */
    private Integer commitType;
    /**
     * 作业的分值
     */
    private Double score;
    /**
     * 作业附件的url
     */
    private String fileUrl;
    /**
     * 考试二维码的url
     */
    private String qrcodeUrl;
    /**
     * 作业的要求
     */
    private String requirement;

    /**
     * 对应的folderID
     */
    private Integer folderId;

    /**
     * 是否发布
     */
    private Integer status;

    /**
     * 简介
     */
    private String description;

    /**
     * 简介
     */
    private String content;

    /**
     * 已经提交的次数
     * @return
     */
    private Integer commitTimeAlready;

    /**
     * 创建人
     */
    private String teacher;

    /**
     * 类型
     */
    private String assignmentType;
    /**
     *
     */
    private String teacherFilePath;
    /**
     * 是否允许迟交，1：允许，0：不允许
     */
    private Integer submitLate;
    /**
     * 学生支持提交附件类型
     */
    private String appendixType;

    //考试时长
    private Integer mins;
    //该学生剩余次数
    private Integer timeLimit;
    //是否开启查重
    private Integer isDuplicateChecking;
    //提交状态
    private Integer islate;
    //待分组成员
    private List<String> groupUsernames;
    //小组标题
    private List<String> groupTitle;
    //随机分组数
    private Integer groupNum;
    //小组来源
    private Integer groupSource;
    /**
     * 是否为小组作业
     */
    private Integer isGroup;
    /**
     * 学生提交标志，0：仅保存未提交，1：已提交
     */
    private Integer submitTime;
    //重复作业4个字段(一次添加一条情况)
    private String repeatTitles[];
    private String repeatStarts[] ;
    private String repeatEnds[];
    private String repeatRequirements[];

    //重复作业批量添加数量
    private Integer repeatNum;
    /**
     * 小组作业关联的小组类别id
     */
    private Integer categoryId;
    /**
     * 小组作业绑定的小组id列表
     */
    private Integer[] groupIds;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer[] getGroupIds() {
        return groupIds;
    }

    public void setGroupIds(Integer[] groupIds) {
        this.groupIds = groupIds;
    }

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public Integer getExpProjectId() {
        return expProjectId;
    }

    public void setExpProjectId(Integer expProjectId) {
        this.expProjectId = expProjectId;
    }

    public String getExpProjectName() {
        return expProjectName;
    }

    public void setExpProjectName(String expProjectName) {
        this.expProjectName = expProjectName;
    }

    public Integer getMins() {
        return mins;
    }

    public TAssignmentVO setMins(Integer id) {
        this.mins = id;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public TAssignmentVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TAssignmentVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    public void setQrcodeUrl(String qrcodeUrl) { this.qrcodeUrl = qrcodeUrl; }

    public Integer getCategory() {
        return category;
    }

    public TAssignmentVO setCategory(Integer category) {
        this.category = category;
        return this;
    }

    public Integer getType() {
        return type;
    }

    public TAssignmentVO setType(Integer type) {
        this.type = type;
        return this;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public TAssignmentVO setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
        return this;
    }

    public Integer getLessonId() {
        return lessonId;
    }

    public TAssignmentVO setLessonId(Integer lessonId) {
        this.lessonId = lessonId;
        return this;
    }

    public String getStartDate() {
        return startDate;
    }

    public TAssignmentVO setStartDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public String getEndDate() {
        return endDate;
    }

    public TAssignmentVO setEndDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public TAssignmentVO setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public Integer getIsToGradebook() {
        return isToGradebook;
    }

    public TAssignmentVO setIsToGradebook(Integer isToGradebook) {
        this.isToGradebook = isToGradebook;
        return this;
    }

    public Integer getIsGradeToStudent() {
        return isGradeToStudent;
    }

    public TAssignmentVO setIsGradeToStudent(Integer isGradeToStudent) {
        this.isGradeToStudent = isGradeToStudent;
        return this;
    }

    public Integer getIsGradeToTotalGrade() {
        return isGradeToTotalGrade;
    }

    public TAssignmentVO setIsGradeToTotalGrade(Integer isGradeToTotalGrade) {
        this.isGradeToTotalGrade = isGradeToTotalGrade;
        return this;
    }

    public Integer getIsAllModeify() {
        return isAllModeify;
    }

    public TAssignmentVO setIsAllModeify(Integer isAllModeify) {
        this.isAllModeify = isAllModeify;
        return this;
    }

    public Integer getIsNeedCommit() {
        return isNeedCommit;
    }

    public TAssignmentVO setIsNeedCommit(Integer isNeedCommit) {
        this.isNeedCommit = isNeedCommit;
        return this;
    }

    public Integer getRemarkStyle() {
        return remarkStyle;
    }

    public TAssignmentVO setRemarkStyle(Integer remarkStyle) {
        this.remarkStyle = remarkStyle;
        return this;
    }

    public Integer getCommitTime() {
        return commitTime;
    }

    public TAssignmentVO setCommitTime(Integer commitTime) {
        this.commitTime = commitTime;
        return this;
    }

    public Integer getCommitType() {
        return commitType;
    }

    public TAssignmentVO setCommitType(Integer commitType) {
        this.commitType = commitType;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public TAssignmentVO setScore(Double score) {
        this.score = score;
        return this;
    }

    public String getRequirement() {
        return requirement;
    }

    public TAssignmentVO setRequirement(String requirement) {
        this.requirement = requirement;
        return this;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public TAssignmentVO setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public Integer getCommitTimeAlready() {
        return commitTimeAlready;
    }

    public void setCommitTimeAlready(Integer commitTimeAlready) {
        this.commitTimeAlready = commitTimeAlready;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAssignmentType() {
        return assignmentType;
    }

    public void setAssignmentType(String assignmentType) {
        this.assignmentType = assignmentType;
    }

    public String getTeacherFilePath() {
        return teacherFilePath;
    }

    public void setTeacherFilePath(String teacherFilePath) {
        this.teacherFilePath = teacherFilePath;
    }

    public Integer getSubmitLate() {
        return submitLate;
    }

    public void setSubmitLate(Integer submitLate) {
        this.submitLate = submitLate;
    }

    public String getAppendixType() {
        return appendixType;
    }

    public void setAppendixType(String appendixType) {
        this.appendixType = appendixType;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }

    public Integer getIsDuplicateChecking() {
        return isDuplicateChecking;
    }

    public void setIsDuplicateChecking(Integer isDuplicateChecking) {
        this.isDuplicateChecking = isDuplicateChecking;
    }

    public Integer getIslate() {
        return islate;
    }

    public void setIslate(Integer islate) {
        this.islate = islate;
    }

    public List<String> getGroupUsernames() {
        return groupUsernames;
    }

    public void setGroupUsernames(List<String> groupUsernames) {
        this.groupUsernames = groupUsernames;
    }

    public Integer getGroupNum() {
        return groupNum;
    }

    public void setGroupNum(Integer groupNum) {
        this.groupNum = groupNum;
    }

    public Integer getGroupSource() {
        return groupSource;
    }

    public void setGroupSource(Integer groupSource) {
        this.groupSource = groupSource;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
    }

    public String[] getRepeatTitles() {
        return repeatTitles;
    }

    public void setRepeatTitles(String[] repeatTitles) {
        this.repeatTitles = repeatTitles;
    }

    public String[] getRepeatStarts() {
        return repeatStarts;
    }

    public void setRepeatStarts(String[] repeatStarts) {
        this.repeatStarts = repeatStarts;
    }

    public String[] getRepeatEnds() {
        return repeatEnds;
    }

    public void setRepeatEnds(String[] repeatEnds) {
        this.repeatEnds = repeatEnds;
    }

    public String[] getRepeatRequirements() {
        return repeatRequirements;
    }

    public void setRepeatRequirements(String[] repeatRequirements) {
        this.repeatRequirements = repeatRequirements;
    }

    public Integer getRepeatNum() {
        return repeatNum;
    }

    public void setRepeatNum(Integer repeatNum) {
        this.repeatNum = repeatNum;
    }

    public List<String> getGroupTitle() {
        return groupTitle;
    }

    public void setGroupTitle(List<String> groupTitle) {
        this.groupTitle = groupTitle;
    }

    public Integer getIsGroup() {
        return isGroup;
    }

    public void setIsGroup(Integer isGroup) {
        this.isGroup = isGroup;
    }
}
