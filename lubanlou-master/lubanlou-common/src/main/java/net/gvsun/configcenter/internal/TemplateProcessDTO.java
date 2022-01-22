package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*************************************************************************************
 * Description:模板流程dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/21
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="模板流程dto",description="模板流程dto")
public class TemplateProcessDTO {
    @ApiModelProperty(value="模板流程id",name="templateProcessId")
    private Integer templateProcessId;
    @ApiModelProperty(value="流程名称",name="processCname")
    private String processCname ;
    @ApiModelProperty(value="模板id（外键）",name="templateId")
    private Integer templateId ;
    @ApiModelProperty(value="模板流程步骤",name="processStep")
    private Integer processStep ;
    @ApiModelProperty(value="模板初始流程步骤",name="initialStep")
    private Integer initialStep ;
    @ApiModelProperty(value="平行任务序号",name="parallelTask")
    private Integer parallelTask ;
    @ApiModelProperty(value="是否需要审核0：否，1是",name="isAudit")
    private Integer isAudit ;
    @ApiModelProperty(value="是否显示该步骤标签",name="isShowLabel")
    private boolean showLabel ;
    @ApiModelProperty(value="步骤顺序（页面查看标签排序）",name="sort")
    private Integer sort;
    @ApiModelProperty(value="表头指标集合",name="configIndicators")
    private List<ConfigIndicatorDTO> configIndicators;
    @ApiModelProperty(value="指标结果集合",name="timetableResults")
    private List<TimetableResultDTO> timetableResults;
    @ApiModelProperty(value="编辑权限信息集合",name="authorityNamesEdit")
    private List<String> authorityNamesEdit;
    @ApiModelProperty(value="刪除权限信息集合",name="authorityNamesDelete")
    private List<String> authorityNamesDelete;
}
