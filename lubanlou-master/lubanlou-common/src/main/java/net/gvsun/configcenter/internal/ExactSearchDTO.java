package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/*************************************************************************************
 * Description:精确查询dto
 *
 * @author: 杨新蔚
 * @date： 2020/7/9
 *************************************************************************************/
@Data
@ApiModel(value="精确查询dto",description="精确查询dto")
public class ExactSearchDTO {
    @ApiModelProperty(value="配置指标id",name="configIndicatorId")
    private Integer configIndicatorId;
    @ApiModelProperty(value="配置指标精确匹配的查询值",name="searchValue")
    private String searchValue;
}
