package net.gvsun.message.external;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

/*************************************************************************************
 * Description:企业微信推送DTO
 *
 * @author: 杨新蔚
 * @date： 2019/12/11
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-WechatDTO",description = "企业微信推送DTO")
public class WechatDTO {
    //	指定接收消息的成员，成员ID列表（多个接收者用|分隔，最多支持1000个）。
    //特殊情况：指定为”@all”，则向该企业应用的全部成员发送
    @ApiModelProperty(value = "成员ID列表",name = "touser")
    private String touser;

    //指定接收消息的部门，部门ID列表，多个接收者用‘|’分隔，最多支持100个。
    //当touser为”@all”时忽略本参数
    @ApiModelProperty(value = "部门ID列表",name = "toparty")
    private String toparty;

    //指定接收消息的标签，标签ID列表，多个接收者用‘|’分隔，最多支持100个。
    //当touser为”@all”时忽略本参数
    @ApiModelProperty(value = "标签ID列表",name = "totag")
    private String totag;

    //消息类型,文本为text
    @ApiModelProperty(value = "消息类型",name = "msgtype",required = true)
    private String msgtype;

    //企业应用的id，整型
    @ApiModelProperty(value = "企业应用的id",name = "agentid",required = true)
    private Integer agentid;

    @ApiModelProperty(value = "文本消息",name = "text")
    private WechatTextDTO text;

    //表示是否是保密消息，0表示否，1表示是，默认0
    @ApiModelProperty(value = "保密消息",name = "safe")
    private Integer safe;

    //表示是否开启id转译，0表示否，1表示是，默认0
    @ApiModelProperty(value = "id转译",name = "enable_id_trans")
    private Integer enable_id_trans;

    //表示是否开启重复消息检查，0表示否，1表示是，默认0
    @ApiModelProperty(value = "重复消息检查",name = "enable_duplicate_check")
    private Integer enable_duplicate_check;
}
