package net.gvsun.message.external;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*************************************************************************************
 * Description:消息接口输出DTO
 *
 * @author: 杨新蔚
 * @date： 2019/7/31
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-ApiOutputMessageDTO",description = "消息接口输出DTO")
public class ApiOutputMessageDTO<E> {
    @ApiModelProperty(value = "消息发送返回状态码",name = "code",required = true)
    private Integer code;
    @ApiModelProperty(value = "消息发送返回状态码",name = "status",required = true)
    private Integer status;

    @ApiModelProperty(value = "消息发送返回结果信息",name = "msg",required = true)
    private String msg;

    @ApiModelProperty(value = "消息发送返回数据",name = "data",required = true)
    private List<ApiMessageDataDTO> apiMessageDataDTO;

    @ApiModelProperty(value = "消息总数",name = "count",required = true)
    private Integer count;
    @ApiModelProperty(value = "消息发送返回数据",name = "data",required = true)
    private List<ApiMessageDataDTO> data;

}


