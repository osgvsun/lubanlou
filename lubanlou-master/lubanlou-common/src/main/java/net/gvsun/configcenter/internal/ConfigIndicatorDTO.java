package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/*************************************************************************************
 * Description:配置指标dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/21
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="配置指标dto",description="配置指标dto")
public class ConfigIndicatorDTO {
    @ApiModelProperty(value="指标id",name="id")
    Integer id ;
    @ApiModelProperty(value="指标名称(用于页面区分)",name="indicatorName")
    String indicatorName ;
    @ApiModelProperty(value="指标名称(报表)",name="indicatorReportName")
    String indicatorReportName ;
    @ApiModelProperty(value="指标名称",name="indicatorCname")
    String indicatorCname ;
    @ApiModelProperty(value="指标名称(英)，用于特定字段查询",name="indicatorEname")
    String indicatorEname ;
    @ApiModelProperty(value="是否为必填指标",name="isRequired")
    Integer isRequired;
    @ApiModelProperty(value="指标默认选择项",name="indicatorOptions")
    String indicatorOptions ;
    @ApiModelProperty(value="标准分",name="standardScore")
    String standardScore ;
    @ApiModelProperty(value="备注说明",name="comment")
    String comment ;
    @ApiModelProperty(value="父级配置指标id",name="parentId")
    Integer parentId ;
    @ApiModelProperty(value="配置类型（外键）",name="configType")
    Integer configType;
    @ApiModelProperty(value="前端指标文本类别",name="contentType")
    String contentType;
    @ApiModelProperty(value="配置链接",name="url")
    String url;
    @ApiModelProperty(value="消息主題",name="messageTopic")
    String messageTopic;
    @ApiModelProperty(value="是否页面显示0：否，1是（已失效）",name="isShow")
    Integer isShow;
    @ApiModelProperty(value="配置指标当前业务排序",name="sort")
    Integer sort;
    @ApiModelProperty(value="指标所在流程步骤",name="processStep")
    Integer processStep;
    @ApiModelProperty(value="业务步骤id",name="timetableProcessId")
    Integer timetableProcessId;
    @ApiModelProperty(value="配置步骤id",name="templateProcessId")
    Integer templateProcessId;
    @ApiModelProperty(value="创建时间",name="createdTime")
    Date createdTime;
    @ApiModelProperty(value="创建人",name="createdBy")
    String createdBy;
    @ApiModelProperty(value="子级配置指标集合",name="configIndicatorDTOS")
    List<ConfigIndicatorDTO> configIndicatorDTOS;
}
