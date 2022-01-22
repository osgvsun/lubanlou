package net.gvsun.gswork.vo;



import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:作业成绩的VO
 *
 * @author:lixueteng
 * @date:2018/2/27 0027
 **************************************************************************/
public class TAssignmentGradingVO implements Serializable{
    /**
     * 成绩对应的作业的id
     */
    private Integer assignmentId;
    /**
     * 成绩对应的作业的标题
     */
    private String title;
    /**
     * 对应的成绩的id
     */
    private Integer gradingId;
    /**
     * 学生提交的内容
     */
    private String commitContent;
    /**
     * 获得的成绩
     */
    private Double grading;
    /**
     * 总分
     */
    private Double score;
    /**
     * 教师评语
     */
    private String comment;
    /**
     * 提交时间
     */
    private Date commitDate;
    /**
     * 教师批改时间
     */
    private Date checkDate;
    /**
     * 最终成绩
     */
    private Double finalGrading;
    /**
     * 提交状态
     */
    private Integer  commitStatus;
    /**
     * 文件的url
     */
    private String fileUrl;
    /**
     * 上传文件id
     */
//    private Integer wkUploadId;
    /**
     * 作业的描述
     */
    private String description;

    /**
     * 作业成绩对应的小组
     * @return
     */
    private Integer groupId;

    /**
     * 作业提交标志，0表示仅保存未提交，教师在提交作业列表中不能看1表示已提交
     * @return
     */
    private Integer submitTime;

    /**
     * 学生用户名
     */
    private String username;
    /**
     * 学生姓名
     */
    private String cname;
    /**
     * 提交时间
     */
    private String commitDateStr;
    /**
     * 批阅pdf路径
     */
    private String markingUrl;
    /**
     * 查重率
     */
    private String similarity;
    /**
     *  成绩排名
     */
    private Integer rank;
    /**
     *  成绩占比
     */
    private String rankPercent;

    /**
     * 小组分工
     */
    private List<DistributionDTO> distributionDTOList;


    public Integer getAssignmentId() {
        return assignmentId;
    }

    public TAssignmentGradingVO setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TAssignmentGradingVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCommitContent() {
        return commitContent;
    }

    public TAssignmentGradingVO setCommitContent(String commitContent) {
        this.commitContent = commitContent;
        return this;
    }

    public Integer getGradingId() {
        return gradingId;
    }

    public TAssignmentGradingVO setGradingId(Integer gradingId) {
        this.gradingId = gradingId;
        return this;
    }

    public Double getGrading() {
        return grading;
    }

    public TAssignmentGradingVO setGrading(Double grading) {
        this.grading = grading;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public TAssignmentGradingVO setScore(Double score) {
        this.score = score;
        return this;
    }
//
//    public Integer getWkUploadId() {
//        return wkUploadId;
//    }
//
//    public void setWkUploadId(Integer wkUploadId) {
//        this.wkUploadId = wkUploadId;
//    }

    public String getComment() {
        return comment;
    }

    public TAssignmentGradingVO setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public Date getCommitDate() {
        return commitDate;
    }

    public TAssignmentGradingVO setCommitDate(Date commitDate) {
        this.commitDate = commitDate;
        return this;
    }

    public Date getCheckDate() {
        return checkDate;
    }

    public TAssignmentGradingVO setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
        return this;
    }

    public Double getFinalGrading() {
        return finalGrading;
    }

    public TAssignmentGradingVO setFinalGrading(Double finalGrading) {
        this.finalGrading = finalGrading;
        return this;
    }

    public Integer getCommitStatus() {
        return commitStatus;
    }

    public TAssignmentGradingVO setCommitStatus(Integer commitStatus) {
        this.commitStatus = commitStatus;
        return this;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public TAssignmentGradingVO setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public TAssignmentGradingVO setDescription(String description) {
        this.description = description;
        return this;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getCommitDateStr() {
        return commitDateStr;
    }

    public void setMarkingUrl(String markingUrl) {
        this.markingUrl = markingUrl;
    }

    public String getMarkingUrl() { return markingUrl; }

    public void setCommitDateStr(String commitDateStr) {
        this.commitDateStr = commitDateStr;
    }

    public String getSimilarity() {
        return similarity;
    }

    public void setSimilarity(String similarity) {
        this.similarity = similarity;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getRankPercent() {
        return rankPercent;
    }

    public void setRankPercent(String rankPercent) {
        this.rankPercent = rankPercent;
    }

    public List<DistributionDTO> getDistributionDTOList() {
        return distributionDTOList;
    }

    public void setDistributionDTOList(List<DistributionDTO> distributionDTOList) {
        this.distributionDTOList = distributionDTOList;
    }
}
