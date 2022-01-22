package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**************************************************************************
 * Description:作业VO
 *
 * @author:lixueteng
 * @date:2018/2/5 0005
 **************************************************************************/
public class TAssignmentsVO implements Serializable {
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
     * 作业的章节的id
     */
    private Integer chapterId;
    /**
     * 作业的课时的id
     */
    private Integer lessonId;
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
     * 当前人的成绩
     */
    private Double stuScore;
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
    //考试时长
    private Integer mins;
    private String student;
    private String evaluation;
    private String keyword;
    private String conclusion;
    private String commitDate;
    public Integer getMins() {
        return mins;
    }

    public TAssignmentsVO setMins(Integer id) {
        this.mins = id;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public TAssignmentsVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TAssignmentsVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public Integer getCategory() {
        return category;
    }

    public TAssignmentsVO setCategory(Integer category) {
        this.category = category;
        return this;
    }

    public Integer getType() {
        return type;
    }

    public TAssignmentsVO setType(Integer type) {
        this.type = type;
        return this;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public TAssignmentsVO setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
        return this;
    }

    public Integer getLessonId() {
        return lessonId;
    }

    public TAssignmentsVO setLessonId(Integer lessonId) {
        this.lessonId = lessonId;
        return this;
    }

    public String getStartDate() {
        return startDate;
    }

    public TAssignmentsVO setStartDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public Double getStuScore() {
        return stuScore;
    }

    public void setStuScore(Double stuScore) {
        this.stuScore = stuScore;
    }


    public String getEndDate() {
        return endDate;
    }

    public TAssignmentsVO setEndDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public TAssignmentsVO setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public Integer getIsToGradebook() {
        return isToGradebook;
    }

    public TAssignmentsVO setIsToGradebook(Integer isToGradebook) {
        this.isToGradebook = isToGradebook;
        return this;
    }

    public Integer getIsGradeToStudent() {
        return isGradeToStudent;
    }

    public TAssignmentsVO setIsGradeToStudent(Integer isGradeToStudent) {
        this.isGradeToStudent = isGradeToStudent;
        return this;
    }

    public Integer getIsGradeToTotalGrade() {
        return isGradeToTotalGrade;
    }

    public TAssignmentsVO setIsGradeToTotalGrade(Integer isGradeToTotalGrade) {
        this.isGradeToTotalGrade = isGradeToTotalGrade;
        return this;
    }

    public Integer getIsAllModeify() {
        return isAllModeify;
    }

    public TAssignmentsVO setIsAllModeify(Integer isAllModeify) {
        this.isAllModeify = isAllModeify;
        return this;
    }

    public Integer getIsNeedCommit() {
        return isNeedCommit;
    }

    public TAssignmentsVO setIsNeedCommit(Integer isNeedCommit) {
        this.isNeedCommit = isNeedCommit;
        return this;
    }

    public Integer getRemarkStyle() {
        return remarkStyle;
    }

    public TAssignmentsVO setRemarkStyle(Integer remarkStyle) {
        this.remarkStyle = remarkStyle;
        return this;
    }

    public Integer getCommitTime() {
        return commitTime;
    }

    public TAssignmentsVO setCommitTime(Integer commitTime) {
        this.commitTime = commitTime;
        return this;
    }

    public Integer getCommitType() {
        return commitType;
    }

    public TAssignmentsVO setCommitType(Integer commitType) {
        this.commitType = commitType;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public TAssignmentsVO setScore(Double score) {
        this.score = score;
        return this;
    }

    public String getRequirement() {
        return requirement;
    }

    public TAssignmentsVO setRequirement(String requirement) {
        this.requirement = requirement;
        return this;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public TAssignmentsVO setFileUrl(String fileUrl) {
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

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(String evaluation) {
        this.evaluation = evaluation;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public String getCommitDate() {
        return commitDate;
    }

    public void setCommitDate(String commitDate) {
        this.commitDate = commitDate;
    }
}
