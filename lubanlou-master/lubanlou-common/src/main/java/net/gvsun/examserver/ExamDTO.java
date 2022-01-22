package net.gvsun.examserver;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;


/**************************************************************************
 * Description:考试信息的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@ApiModel(value = "DTO-ExamDTO", description = "考试信息的DTO")
public class ExamDTO implements Serializable {
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "考试题目", name = "testTitle")
    private String testTitle;
    @ApiModelProperty(value = "考试总分", name = "testScoreTest")
    private String testScoreTest;
    @ApiModelProperty(value = "考试时长", name = "timeLimit")
    private String timeLimit;
    @ApiModelProperty(value = "考试开始时间", name = "startDateTest")
    private String startDateTest;
    @ApiModelProperty(value = "考试结束时间", name = "dueDateTest")
    private String dueDateTest;
    @ApiModelProperty(value = "考试允许次数", name = "timeLimitOneTest")
    private Integer timeLimitOneTest;
    @ApiModelProperty(value = "是否计入成绩册（教学用）", name = "toGradeBook")
    private String toGradeBook;
    @ApiModelProperty(value = "是否公布给学生（教学用）", name = "toStudent")
    private String toStudent;
    @ApiModelProperty(value = "是否计入总成绩（教学用）", name = "toTotalGrade")
    private String toTotalGrade;
    @ApiModelProperty(value = "是否显示给学生（教学用）", name = "answerToStudent")
    private String answerToStudent;
    @ApiModelProperty(value = "是否作答（教学用）", name = "needSubmit")
    private Integer needSubmit;
    @ApiModelProperty(value = "简介", name = "content")
    private String content;
    @ApiModelProperty(value = "类型（教学用：exam,assignment,test)", name = "type")
    private String type;
    @ApiModelProperty(value = "来源（题库question，试卷库examQuestionPool)", name = "testFrom")
    private String testFrom;
    @ApiModelProperty(value = "考试大项ID", name = "questionIds")
    private String[] questionIds;
    @ApiModelProperty(value = "试题分值，用于此次考试", name = "itemScores")
    private String[] itemScores;
    @ApiModelProperty(value = "所属题库", name = "sectionNames")
    private String[] sectionNames;
    @ApiModelProperty(value = "试题类型", name = "itemTypes")
    private String[] itemTypes;
    @ApiModelProperty(value = "试题数量", name = "itemQuantities")
    private String[] itemQuantities;
    @ApiModelProperty(value = "试卷库ID", name = "examQuestionpoolId")
    private Integer examQuestionpoolId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTestTitle() {
        return testTitle;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    public String getTestScoreTest() {
        return testScoreTest;
    }

    public void setTestScoreTest(String testScoreTest) {
        this.testScoreTest = testScoreTest;
    }

    public String getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(String timeLimit) {
        this.timeLimit = timeLimit;
    }

    public String getStartDateTest() {
        return startDateTest;
    }

    public void setStartDateTest(String startDateTest) {
        this.startDateTest = startDateTest;
    }

    public String getDueDateTest() {
        return dueDateTest;
    }

    public void setDueDateTest(String dueDateTest) {
        this.dueDateTest = dueDateTest;
    }

    public Integer getTimeLimitOneTest() {
        return timeLimitOneTest;
    }

    public void setTimeLimitOneTest(Integer timeLimitOneTest) {
        this.timeLimitOneTest = timeLimitOneTest;
    }

    public String getToGradeBook() {
        return toGradeBook;
    }

    public void setToGradeBook(String toGradeBook) {
        this.toGradeBook = toGradeBook;
    }

    public String getToStudent() {
        return toStudent;
    }

    public void setToStudent(String toStudent) {
        this.toStudent = toStudent;
    }

    public String getToTotalGrade() {
        return toTotalGrade;
    }

    public void setToTotalGrade(String toTotalGrade) {
        this.toTotalGrade = toTotalGrade;
    }

    public String getAnswerToStudent() {
        return answerToStudent;
    }

    public void setAnswerToStudent(String answerToStudent) {
        this.answerToStudent = answerToStudent;
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

    public String getTestFrom() {
        return testFrom;
    }

    public void setTestFrom(String testFrom) {
        this.testFrom = testFrom;
    }

    public String[] getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(String[] questionIds) {
        this.questionIds = questionIds;
    }

    public String[] getItemScores() {
        return itemScores;
    }

    public void setItemScores(String[] itemScores) {
        this.itemScores = itemScores;
    }

    public String[] getSectionNames() {
        return sectionNames;
    }

    public void setSectionNames(String[] sectionNames) {
        this.sectionNames = sectionNames;
    }

    public String[] getItemTypes() {
        return itemTypes;
    }

    public void setItemTypes(String[] itemTypes) {
        this.itemTypes = itemTypes;
    }

    public String[] getItemQuantities() {
        return itemQuantities;
    }

    public void setItemQuantities(String[] itemQuantities) {
        this.itemQuantities = itemQuantities;
    }

    public Integer getExamQuestionpoolId() {
        return examQuestionpoolId;
    }

    public void setExamQuestionpoolId(Integer examQuestionpoolId) {
        this.examQuestionpoolId = examQuestionpoolId;
    }
}
