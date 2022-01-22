package net.gvsun.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2019/2/26.
 */
@ApiModel(value = "成绩册返回对象",description = "成绩册返回对象")
public class TranscriptVo implements Serializable{
    @ApiModelProperty(value = "题目",name = "title")
    private String title;
    @ApiModelProperty(value = "所属课程",name = "siteName")
    private String siteName;
    @ApiModelProperty(value = "成绩",name = "transcriptInfos")
    private List<TranscriptInfoVo> transcriptInfoVos;

    private List<SjtudcTranscriptVo> sjtudcTranscriptVos;

    private Integer siteId;

    private String assignmentId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public List<TranscriptInfoVo> getTranscriptInfoVos() {
        return transcriptInfoVos;
    }

    public void setTranscriptInfoVos(List<TranscriptInfoVo> transcriptInfoVos) {
        this.transcriptInfoVos = transcriptInfoVos;
    }

    public List<SjtudcTranscriptVo> getSjtudcTranscriptVos() {
        return sjtudcTranscriptVos;
    }

    public void setSjtudcTranscriptVos(List<SjtudcTranscriptVo> sjtudcTranscriptVos) {
        this.sjtudcTranscriptVos = sjtudcTranscriptVos;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }
}
