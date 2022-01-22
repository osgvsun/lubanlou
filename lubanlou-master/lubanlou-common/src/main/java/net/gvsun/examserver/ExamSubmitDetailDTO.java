package net.gvsun.examserver;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**************************************************************************
 * Description:考试提交结果的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/19
 **************************************************************************/
@ApiModel(value = "DTO-ExamSubmitDetailDTO", description = "考试提交结果的DTO")
public class ExamSubmitDetailDTO implements Serializable{
    @ApiModelProperty(value = "考试编号", name = "assignmentId")
    private Integer assignmentId;
    @ApiModelProperty(value = "考生username", name = "username")
    private String username;
    @ApiModelProperty(value = "提交次数", name = "submitTime")
    private Integer submitTime;
    @ApiModelProperty(value = "所有勾选的考试答案（除填空题）", name = "answers")
    private String[] answers;
    @ApiModelProperty(value = "所有填空题所填考试答案", name = "answerTexts")
    private String[] answerTexts;

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
    }

    public String[] getAnswers() {
        return answers;
    }

    public void setAnswers(String[] answers) {
        this.answers = answers;
    }

    public String[] getAnswerTexts() {
        return answerTexts;
    }

    public void setAnswerTexts(String[] answerTexts) {
        this.answerTexts = answerTexts;
    }
}
