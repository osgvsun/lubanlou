package net.gvsun.gsexam.vo.test;

import net.gvsun.gsexam.dto.common.SchoolAcademyVo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description: 测试信息VO
 *
 * @author:lixueteng
 * @date:2018/1/18 0018
 **************************************************************************/
public class TestInfoVO implements Serializable{
    /**
     * 测试的id
     */
    private Integer id;
    /**
     * 名称
     */
    private String title;
    /**
     *  开始时间
     */
    private Date startDate;
    /**
     *  结束时间
     */
    private Date endTime;
    /**
     * 测试分值
     */
    private Double score;
    /**
     * 分类
     */
    private Integer categoryId;
    /**
     *  章节
     */
    private Integer chapterId;
    /**
     * 课时
     */
    private Integer classId;
    /**
     * 学院
     */
    private List<SchoolAcademyVo> schoolAcademy;
    /**
     * 学院
     */
    private String schoolAcademy1;//学院用这个
    /**
     * 班级
     */
    private String[] schoolClass;
    /**
     * 考试状态
     */
    private Integer status;
    /**
     * 提交次数
     */
    private Integer submitTime;
    /**
     * 是否将测试添加到成绩册
     */
    private String isToGradebook;
    /**
     * 是否将成绩公布给学生
     */
    private String isToStudent;
    /**
     * 是否将成绩计入总成绩
     */
    private String isToTotalScore;
    /**
     * 是否显示答题详情
     */
    private String isShowDetail;
    /**
     * 测试描述
     */
    private String description;
    /**
     * 测试创建人
     */
    private String username;
    /**
     *测试对应的类型
     */
    private String type;
    /**
     * 测试对应的大项
     */
    private List<TestSectionVO> testSectionVOS;
    /**
     * 所属站点id
     */
    private Integer siteId;
    /**
     * 测试创建人
     */
    private String createdBy;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getId() {
        return id;
    }

    public TestInfoVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TestInfoVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public Date getStartDate() {
        return startDate;
    }

    public TestInfoVO setStartDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getEndTime() {
        return endTime;
    }

    public TestInfoVO setEndTime(Date endTime) {
        this.endTime = endTime;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public TestInfoVO setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public Integer getChapterId() {
        return chapterId;
    }

    public TestInfoVO setChapterId(Integer chapterId) {
        this.chapterId = chapterId;
        return this;
    }

    public Integer getClassId() {
        return classId;
    }

    public TestInfoVO setClassId(Integer classId) {
        this.classId = classId;
        return this;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public TestInfoVO setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public TestInfoVO setDescription(String description) {
        this.description = description;
        return this;
    }

    public List<TestSectionVO> getTestSectionVOS() {
        return testSectionVOS;
    }

    public TestInfoVO setTestSectionVOS(List<TestSectionVO> testSectionVOS) {
        this.testSectionVOS = testSectionVOS;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public TestInfoVO setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getIsToGradebook() {
        return isToGradebook;
    }

    public TestInfoVO setIsToGradebook(String isToGradebook) {
        this.isToGradebook = isToGradebook;
        return this;
    }

    public String getIsToStudent() {
        return isToStudent;
    }

    public TestInfoVO setIsToStudent(String isToStudent) {
        this.isToStudent = isToStudent;
        return this;
    }

    public String getIsToTotalScore() {
        return isToTotalScore;
    }

    public TestInfoVO setIsToTotalScore(String isToTotalScore) {
        this.isToTotalScore = isToTotalScore;
        return this;
    }

    public String getIsShowDetail() {
        return isShowDetail;
    }

    public TestInfoVO setIsShowDetail(String isShowDetail) {
        this.isShowDetail = isShowDetail;
        return this;
    }

    public String getType() {
        return type;
    }

    public TestInfoVO setType(String type) {
        this.type = type;
        return this;
    }
    public List<SchoolAcademyVo> getSchoolAcademy() {
        return schoolAcademy;
    }

    public void setSchoolAcademy(List<SchoolAcademyVo> schoolAcademy) {
        this.schoolAcademy = schoolAcademy;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getSchoolAcademy1() {
        return schoolAcademy1;
    }

    public void setSchoolAcademy1(String schoolAcademy1) {
        this.schoolAcademy1 = schoolAcademy1;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public String[] getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(String[] schoolClass) {
        this.schoolClass = schoolClass;
    }
}
