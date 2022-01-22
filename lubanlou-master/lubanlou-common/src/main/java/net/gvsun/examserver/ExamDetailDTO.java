package net.gvsun.examserver;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


/**************************************************************************
 * Description:考试信息详情的DTO
 *
 * @author:吴奇臻
 * @date:2019/07/16
 **************************************************************************/
@Data
@ApiModel(value = "DTO-ExamDetailDTO", description = "考试信息详情的DTO")
public class ExamDetailDTO implements Serializable{
    @ApiModelProperty(value = "唯一标识ID", name = "id")
    private Integer id;
    @ApiModelProperty(value = "考试人", name = "username")
    private String username;
    @ApiModelProperty(value = "考试总分", name = "score")
    private Double score;
    /**
     * 本次测试得分
     */
    private Double resultScore;
    @ApiModelProperty(value = "提交次数", name = "submitTime")
    private long submitTime;
    @ApiModelProperty(value = "考试总时间", name = "totalTime")
    private long totalTime;
    @ApiModelProperty(value = "考试名称", name = "title")
    private String title;
    @ApiModelProperty(value = "分页信息", name = "pageModel")
    private Map<String,Integer> pageModel;
    @ApiModelProperty(value = "考试题目信息", name = "examItemDTOList")
    private List<List<ExamItemDTO>> examItemDTOList;
    @ApiModelProperty(value = "考试状态", name = "status")
    private Integer status;
    @ApiModelProperty(value = "考试题目编号", name = "itemIds")
    private List<Integer> itemIds;
    @ApiModelProperty(value = "考试说明", name = "content")
    private String content;
}
