package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

/*************************************************************************************
 * Description:精确查询接口输入DTO
 *
 * @author: 杨新蔚
 * @date： 2020/7/9
 *************************************************************************************/
@Data
@ToString
@ApiModel(value="精确查询接口输入DTO",description="精确查询接口输入DTO")
public class InfoByExactSearchDTO implements Serializable {
    @ApiModelProperty(value="查询dto",name="exactSearchDTOList")
    private List<ExactSearchDTO> exactSearchDTOList;
    @ApiModelProperty(value="模板类型id",name="configTypeId")
    private Integer configTypeId;
    @ApiModelProperty(value="模板id",name="templateId")
    private Integer templateId;
    @ApiModelProperty(value="扩展业务id",name="businessId")
    private String businessId;
    @ApiModelProperty(value="当前用户，用作筛选",name="currentUser")
    private String currentUser;
    @ApiModelProperty(value="目标用户，用作筛选，也用作定制接口的输入参数用来获取信息",name="targetUser")
    private String targetUser;
    @ApiModelProperty(value="表头字段查询",name="search")
    private String search;
    @ApiModelProperty(value="时间标志位，用于页面显示，已结束 0 ；进行中 1；未开始 2",name="timeFlag")
    private Integer timeFlag;
    @ApiModelProperty(value="当前阶段",name="processStep")
    private Integer processStep;
    @ApiModelProperty(value="当前页码",name="page")
    private Integer page;
    @ApiModelProperty(value="每页条数",name="limit")
    private Integer limit;
}
