package net.gvsun.examserver;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**************************************************************************
 * Description:考试结果的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/19
 **************************************************************************/
@ApiModel(value = "DTO-ExamResultDTO", description = "考试结果的DTO")
public class ExamResultDTO implements Serializable {
    @ApiModelProperty(value = "考试得分", name = "score")
    private double score;
    @ApiModelProperty(value = "剩余提交次数", name = "remainSubmitTime")
    private Integer remainSubmitTime;
    @ApiModelProperty(value = "考试的标题", name = "title")
    private String title;
    @ApiModelProperty(value = "考试ID", name = "examId")
    private Integer examId;
    @ApiModelProperty(value = "考试学生username", name = "username")
    private String username;
    @ApiModelProperty(value = "准入分数（用于准入等场景)", name = "accessScore")
    private double accessScore;

    public double getAccessScore() { return accessScore; }

    public void setAccessScore(double accessScore) { this.accessScore = accessScore; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public Integer getRemainSubmitTime() {
        return remainSubmitTime;
    }

    public void setRemainSubmitTime(Integer remainSubmitTime) {
        this.remainSubmitTime = remainSubmitTime;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
