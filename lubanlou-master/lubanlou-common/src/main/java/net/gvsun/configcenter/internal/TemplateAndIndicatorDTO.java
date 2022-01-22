package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/*************************************************************************************
 * Description:模板-阶段-指标保存dto
 *
 * @author: 杨新蔚
 * @date： 2020/8/18
 *************************************************************************************/
@Data
@ApiModel(value="模板-阶段-指标保存dto",description="模板-阶段-指标保存dto")
public class TemplateAndIndicatorDTO {
    @ApiModelProperty(value="配置类型id",name="configTypeId")
    private Integer configTypeId;
    @ApiModelProperty(value="模板id",name="templateId")
    private Integer templateId;
    @ApiModelProperty(value="模板名称",name="templateCname")
    private String templateCname ;
    @ApiModelProperty(value="业务id（外键）",name="businessId")
    private String businessId ;
    @ApiModelProperty(value="来源项目（必填）",name="sourceProject")
    private String sourceProject ;
    @ApiModelProperty(value="模板流程id",name="processId")
    private Integer processId ;
    @ApiModelProperty(value="模板流程步骤",name="processStep")
    private Integer processStep ;
    @ApiModelProperty(value="模板流程名称",name="processCname")
    private String processCname ;
    @ApiModelProperty(value="平行任务序号",name="parallelTask")
    private Integer parallelTask ;
    @ApiModelProperty(value="是否需要审核0：否，1是",name="isAudit")
    private Integer isAudit ;
    @ApiModelProperty(value="表头指标集合",name="configIndicators")
    private List<ConfigIndicatorDTO> configIndicatorDTOS;
}
