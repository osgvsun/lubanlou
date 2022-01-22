package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/*************************************************************************************
 * Description:全局变量dto
 *
 * @author: 杨新蔚
 * @date: 2021/1/7
 *************************************************************************************/
@Data
@ApiModel(value = "DTO-GlobalVariableDTO", description = "全局变量dto")
public class GlobalVariableDTO implements Serializable {
    @ApiModelProperty(value="配置指标英文名",name="configIndicatorName")
    private String configIndicatorName;

    @ApiModelProperty(value="配置指标中文名",name="configIndicatorCname")
    private String configIndicatorCname;

    @ApiModelProperty(value="结果值",name="result")
    private String result;
}
