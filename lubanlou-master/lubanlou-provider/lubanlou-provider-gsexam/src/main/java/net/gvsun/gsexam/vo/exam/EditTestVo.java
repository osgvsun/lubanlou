package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.Date;

public class EditTestVo implements Serializable{
    //考试ID
    private Integer tAssignmentId;
    //考试名称
    private String tAssignmentTitle;
    //分类
    private Integer testChapterType;
    //章节ID
    private Integer testWkChapterId;
    //课时ID
    private Integer testWkLessonId;
    //开始时间
    private Date startdateTest;
    //结束时间
    private Date duedateTest;
    //考试布置人
    private String username;
    //考试分值
    private Double testScoreTest;
    //合格分值
    private Double passingScore;
    //考试时间
    private Integer mins;
    //提交次数
    private Integer timelimitOneTest;
    //将考试添加到成绩簿
    private String toGradebook;
    //将成绩公布给学生
    private String gradeToStudent;
    //将成绩计入总成绩
    private String gradeToTotalGrade;
    //是否显示答题详情
    private String answerToStudent;
    //题目来源
    private String testFrom;
    //是否做答
    private Integer needSubmit;
    //考试描述
    private String content;
    //考试类型
    private String type;
    //学院
    private String schoolAcademy;
    //学院名称
    private String schoolAcademyName;
    //班级
    private String[] schoolClass;
    //班级名
    private String classes;
    //是否为补考
    private String isMakeUpExam;
    //补考考试名称
    private String oldAssignmentName;
    //补考考试ID
    private Integer oldAssignmentId;
    //所属站点id
    private Integer siteId;
    //考试状态
    private Integer status;
    //考试创建时间
    private Date createdTime;
    //考试创建人
    private String createdBy;
    //folderId
    private Integer folderId;
    //TAssignmentControlId
    private Integer tAssignmentControlId;
    //TAssignmentAnswerAssignId
    private Integer tAssignmentAnswerAssignId;
    //sectionName
    private String[] sectionNames;
    //questionIdTest
    private String[] questionIds;
    //itemTypeTest
    private String[] itemTypes;
    //itemQuantityTest
    private String[] itemQuantitys;
    //itemScoreTest
    private String[] itemScores;
    //itemScoreTest
    private Integer[] itemIds;
    //gapsNumbers
    private String[] gapsNumbers;
    //考试对应的预约考试
    private Integer subScribeExamId;
    //考试对应的试卷库类型
    private Integer examCategory;
    //考试对应的试卷库类型名字
    private String examCategoryName;
    //考试对应的试卷库id
    private Integer examQuestionpoolId;
    //考试对应的试卷库名字
    private String examQuestionpoolName;
    //考试合格有效天数
    private Integer effectiveDays;
    private String evaluation;
    private String keyword;
    private String conclusion;

    public Integer getSubScribeExamId() {
        return subScribeExamId;
    }

    public void setSubScribeExamId(Integer subScribeExamId) {
        this.subScribeExamId = subScribeExamId;
    }

    public Integer gettAssignmentId() {
        return tAssignmentId;
    }

    public void settAssignmentId(Integer tAssignmentId) {
        this.tAssignmentId = tAssignmentId;
    }

    public String gettAssignmentTitle() {
        return tAssignmentTitle;
    }

    public void settAssignmentTitle(String tAssignmentTitle) {
        this.tAssignmentTitle = tAssignmentTitle;
    }

    public Integer getTestChapterType() {
        return testChapterType;
    }

    public void setTestChapterType(Integer testChapterType) {
        this.testChapterType = testChapterType;
    }

    public Integer getTestWkChapterId() {
        return testWkChapterId;
    }

    public void setTestWkChapterId(Integer testWkChapterId) {
        this.testWkChapterId = testWkChapterId;
    }

    public Integer getTestWkLessonId() {
        return testWkLessonId;
    }

    public void setTestWkLessonId(Integer testWkLessonId) {
        this.testWkLessonId = testWkLessonId;
    }

    public Date getStartdateTest() {
        return startdateTest;
    }

    public void setStartdateTest(Date startdateTest) {
        this.startdateTest = startdateTest;
    }

    public Date getDuedateTest() {
        return duedateTest;
    }

    public void setDuedateTest(Date duedateTest) {
        this.duedateTest = duedateTest;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getTestScoreTest() {
        return testScoreTest;
    }

    public void setTestScoreTest(Double testScoreTest) {
        this.testScoreTest = testScoreTest;
    }

    public Double getPassingScore() {
        return passingScore;
    }

    public void setPassingScore(Double passingScore) {
        this.passingScore = passingScore;
    }

    public Integer getMins() {
        return mins;
    }

    public void setMins(Integer mins) {
        this.mins = mins;
    }

    public Integer getTimelimitOneTest() {
        return timelimitOneTest;
    }

    public void setTimelimitOneTest(Integer timelimitOneTest) {
        this.timelimitOneTest = timelimitOneTest;
    }

    public String getToGradebook() {
        return toGradebook;
    }

    public void setToGradebook(String toGradebook) {
        this.toGradebook = toGradebook;
    }

    public String getGradeToStudent() {
        return gradeToStudent;
    }

    public void setGradeToStudent(String gradeToStudent) {
        this.gradeToStudent = gradeToStudent;
    }

    public String getGradeToTotalGrade() {
        return gradeToTotalGrade;
    }

    public void setGradeToTotalGrade(String gradeToTotalGrade) {
        this.gradeToTotalGrade = gradeToTotalGrade;
    }

    public String getAnswerToStudent() {
        return answerToStudent;
    }

    public void setAnswerToStudent(String answerToStudent) {
        this.answerToStudent = answerToStudent;
    }

    public String getTestFrom() {
        return testFrom;
    }

    public void setTestFrom(String testFrom) {
        this.testFrom = testFrom;
    }

    public Integer getNeedSubmit() {
        return needSubmit;
    }

    public void setNeedSubmit(Integer needSubmit) {
        this.needSubmit = needSubmit;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSchoolAcademy() {
        return schoolAcademy;
    }

    public void setSchoolAcademy(String schoolAcademy) {
        this.schoolAcademy = schoolAcademy;
    }

    public Integer getOldAssignmentId() {
        return oldAssignmentId;
    }

    public void setOldAssignmentId(Integer oldAssignmentId) {
        this.oldAssignmentId = oldAssignmentId;
    }

    public String[] getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(String[] schoolClass) {
        this.schoolClass = schoolClass;
    }

    public String getIsMakeUpExam() {
        return isMakeUpExam;
    }

    public void setIsMakeUpExam(String isMakeUpExam) {
        this.isMakeUpExam = isMakeUpExam;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public Integer gettAssignmentControlId() {
        return tAssignmentControlId;
    }

    public void settAssignmentControlId(Integer tAssignmentControlId) {
        this.tAssignmentControlId = tAssignmentControlId;
    }

    public Integer gettAssignmentAnswerAssignId() {
        return tAssignmentAnswerAssignId;
    }

    public void settAssignmentAnswerAssignId(Integer tAssignmentAnswerAssignId) {
        this.tAssignmentAnswerAssignId = tAssignmentAnswerAssignId;
    }

    public String[] getSectionNames() {
        return sectionNames;
    }

    public void setSectionNames(String[] sectionNames) {
        this.sectionNames = sectionNames;
    }

    public String[] getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(String[] questionIds) {
        this.questionIds = questionIds;
    }

    public String[] getItemTypes() {
        return itemTypes;
    }

    public void setItemTypes(String[] itemTypes) {
        this.itemTypes = itemTypes;
    }

    public String[] getItemQuantitys() {
        return itemQuantitys;
    }

    public void setItemQuantitys(String[] itemQuantitys) {
        this.itemQuantitys = itemQuantitys;
    }

    public String[] getItemScores() {
        return itemScores;
    }

    public void setItemScores(String[] itemScores) {
        this.itemScores = itemScores;
    }

    public String[] getGapsNumbers() {
        return gapsNumbers;
    }

    public void setGapsNumbers(String[] gapsNumbers) {
        this.gapsNumbers = gapsNumbers;
    }

    public Integer getExamCategory() {
        return examCategory;
    }

    public void setExamCategory(Integer examCategory) {
        this.examCategory = examCategory;
    }

    public Integer getExamQuestionpoolId() {
        return examQuestionpoolId;
    }

    public void setExamQuestionpoolId(Integer examQuestionpoolId) {
        this.examQuestionpoolId = examQuestionpoolId;
    }

    public String getSchoolAcademyName() {
        return schoolAcademyName;
    }

    public void setSchoolAcademyName(String schoolAcademyName) {
        this.schoolAcademyName = schoolAcademyName;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String getOldAssignmentName() {
        return oldAssignmentName;
    }

    public void setOldAssignmentName(String oldAssignmentName) {
        this.oldAssignmentName = oldAssignmentName;
    }

    public String getExamCategoryName() {
        return examCategoryName;
    }

    public void setExamCategoryName(String examCategoryName) {
        this.examCategoryName = examCategoryName;
    }

    public String getExamQuestionpoolName() {
        return examQuestionpoolName;
    }

    public void setExamQuestionpoolName(String examQuestionpoolName) {
        this.examQuestionpoolName = examQuestionpoolName;
    }

    public Integer[] getItemIds() {
        return itemIds;
    }

    public void setItemIds(Integer[] itemIds) {
        this.itemIds = itemIds;
    }

    public Integer getEffectiveDays() {
        return effectiveDays;
    }

    public void setEffectiveDays(Integer effectiveDays) {
        this.effectiveDays = effectiveDays;
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
}
