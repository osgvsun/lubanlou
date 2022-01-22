package net.gvsun.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by REM on 2019/2/26.
 */
@ApiModel(value = "成绩册具体成绩对象",description = "成绩册具体成绩对象")
public class TranscriptInfoVo implements Serializable {
    @ApiModelProperty(value = "姓名",name = "came")
    private String cname;
    @ApiModelProperty(value = "用户名",name = "username")
    private String username;
    @ApiModelProperty(value = "各项成绩字符串，以逗号分割",name = "results")
    private String results;
    @ApiModelProperty(value = "权重成绩",name = "weightResult")
    private Double weightResult;
    @ApiModelProperty(value = "额外成绩",name = "additionScore")
    private Double additionScore;
    @ApiModelProperty(value = "所属小组id",name = "groupId")
    private Integer groupId;
    @ApiModelProperty(value = "所属小组名称",name = "groupTitle")
    private String groupTitle;
    @ApiModelProperty(value = "组内排名",name = "groupRanking")
    private String groupRanking;
    @ApiModelProperty(value = "组内成绩",name = "groupMarking")
    private String groupMarking;

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
    }

    public Double getWeightResult() {
        return weightResult;
    }

    public void setWeightResult(Double weightResult) {
        this.weightResult = weightResult;
    }

    public Double getAdditionScore() {
        return additionScore;
    }

    public void setAdditionScore(Double additionScore) {
        this.additionScore = additionScore;
    }

    public String getGroupTitle() {
        return groupTitle;
    }

    public void setGroupTitle(String groupTitle) {
        this.groupTitle = groupTitle;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupRanking() {
        return groupRanking;
    }

    public void setGroupRanking(String groupRanking) {
        this.groupRanking = groupRanking;
    }

    public String getGroupMarking() {
        return groupMarking;
    }

    public void setGroupMarking(String groupMarking) {
        this.groupMarking = groupMarking;
    }
}
