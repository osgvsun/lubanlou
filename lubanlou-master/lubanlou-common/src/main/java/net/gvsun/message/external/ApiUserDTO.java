package net.gvsun.message.external;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
/*************************************************************************************
 * Description:消息接口输入DTO
 *
 * @author: 杨新蔚
 * @date： 2019/7/23
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-ApiUserDTO",description = "用户信息输入DTO")
public class ApiUserDTO {
    @ApiModelProperty(value = "接收人用户名",name = "receiverUsername",required = true)
    private String receiverUsername;

    @ApiModelProperty(value = "接收人姓名",name = "receiverCname")
    private String receiverCname;

    @ApiModelProperty(value = "消息发送目的地",name = "receiver",required = true)
    private String receiver;


    @ApiModelProperty(value = "消息接收人阅读状态",name = "readState",required = true)
    private Integer readState;

    @ApiModelProperty(value = "消息接收人处理状态",name = "handleState",required = true)
    private Integer handleState;
}
