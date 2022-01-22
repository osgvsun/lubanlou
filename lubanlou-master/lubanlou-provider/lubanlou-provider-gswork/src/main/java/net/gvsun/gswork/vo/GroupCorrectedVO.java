package net.gvsun.gswork.vo;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2021/3/31.
 */
public class GroupCorrectedVO implements Serializable{
    private Integer groupId;//小组id
    private String groupTitle;//小组名称
    private List<DistributionDTO> distributionDTOList;//小组分工
    private String content;//小组代替文字
    private String fileIds;//小组上传文件id拼接
    private Double score;//小组得分
    private String comment;//评语
    private Integer gradingId;//目前可打分的数据id

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupTitle() {
        return groupTitle;
    }

    public void setGroupTitle(String groupTitle) {
        this.groupTitle = groupTitle;
    }

    public List<DistributionDTO> getDistributionDTOList() {
        return distributionDTOList;
    }

    public void setDistributionDTOList(List<DistributionDTO> distributionDTOList) {
        this.distributionDTOList = distributionDTOList;
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

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getGradingId() {
        return gradingId;
    }

    public void setGradingId(Integer gradingId) {
        this.gradingId = gradingId;
    }
}
