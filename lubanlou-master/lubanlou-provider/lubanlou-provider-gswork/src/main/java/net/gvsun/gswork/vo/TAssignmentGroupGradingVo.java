package net.gvsun.gswork.vo;

import java.io.Serializable;

/**************************************************************************
 * Description:小组成员的作业成绩
 *
 * @author:lixueteng
 * @date:2018/3/6 0006
 **************************************************************************/
public class TAssignmentGroupGradingVo implements Serializable {
    /**
     * 对应的作业的id
     */
    private Integer assignmentId;
    /**
     * 成绩的id
     */
    private Integer gradingId;
    /**
     * 小组的作业对应的用户
     */
    private String username;
    /**
     * 作业的用户中文名
     */
    private String cname;
    /**
     * 作业的成绩
     */
    private Double score;
    /**
     * 作业的评语
     */
    private String comment;

    /**
     * 当前用户是否是组长 1组长 0成员
     * @return
     */
    private Integer isGroupLeader;

    /**
     * 提交的文字
     */
    private String content;

    /**
     * 提交的附件
     */
    private String fileIds;
    public Integer getAssignmentId() {
        return assignmentId;
    }

    public TAssignmentGroupGradingVo setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
        return this;
    }

    public Integer getGradingId() {
        return gradingId;
    }

    public TAssignmentGroupGradingVo setGradingId(Integer gradingId) {
        this.gradingId = gradingId;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public TAssignmentGroupGradingVo setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getCname() {
        return cname;
    }

    public TAssignmentGroupGradingVo setCname(String cname) {
        this.cname = cname;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public TAssignmentGroupGradingVo setScore(Double score) {
        this.score = score;
        return this;
    }

    public Integer getIsGroupLeader() {
        return isGroupLeader;
    }

    public void setIsGroupLeader(Integer isGroupLeader) {
        this.isGroupLeader = isGroupLeader;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFileIds() {
        return fileIds;
    }

    public void setFileIds(String fileIds) {
        this.fileIds = fileIds;
    }
}
