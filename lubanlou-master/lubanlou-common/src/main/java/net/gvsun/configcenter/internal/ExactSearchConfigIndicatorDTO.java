package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/*************************************************************************************
 * Description:精确查询所用配置指标dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/21
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="配置指标dto",description="配置指标dto")
public class ExactSearchConfigIndicatorDTO {
    @ApiModelProperty(value="配置指标id",name="configIndicatorId")
    private Integer configIndicatorId;
    @ApiModelProperty(value="配置指标名称",name="configIndicatorName")
    private String configIndicatorName;
    @ApiModelProperty(value="配置指标名称(报表)",name="configIndicatorReportName")
    private String configIndicatorReportName;
    @ApiModelProperty(value="配置指标中文名称",name="configIndicatorCname")
    private String configIndicatorCname;
    @ApiModelProperty(value="前端指标文本类别",name="configContentType")
    private String configContentType;
    @ApiModelProperty(value="属性名",name="fieldName")
    private String fieldName;
    @ApiModelProperty(value="配置指标精确匹配列名",name="searchColumn")
    private String searchColumn;
    @ApiModelProperty(value="配置指标精确匹配的查询值",name="searchValue")
    private String searchValue;
    @ApiModelProperty(value="配置指标当前业务排序",name="sort")
    Integer sort;
    @ApiModelProperty(value="指标所在流程步骤",name="processStep")
    Integer processStep;
}
