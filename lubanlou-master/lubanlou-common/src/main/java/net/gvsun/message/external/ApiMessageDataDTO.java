package net.gvsun.message.external;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/*************************************************************************************
 * Description:消息输出接口DataDTO
 *
 * @author: 杨新蔚
 * @date： 2019/7/31
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-ApiMessageDataDTO",description = "消息输出接口DataDTO")
public class ApiMessageDataDTO {
    @ApiModelProperty(value = "消息id",name = "id")
    private Integer id;

    @ApiModelProperty(value = "是否已读：0未读，1已读",name = "readStatus")
    private Integer readStatus;

    @ApiModelProperty(value = "消息发送主题topic(sms、email、wechat)",name = "topic")
    private String topic;

    @ApiModelProperty(value = "消息发送目的地",name = "receiver")
    private String receiver;

    @ApiModelProperty(value = "消息接收者",name = "receiverUsername")
    private List<String> receiverUsername;

    @ApiModelProperty(value = "消息发送内容",name = "messageContent")
    private String messageContent;

    @ApiModelProperty(value = "消息发送附带点击链接",name = "messageHtml")
    private String messageHtml;

    @ApiModelProperty(value = "消息发送来源人(username)",name = "createUsername")
    private String createUsername;

    @ApiModelProperty(value = "消息发送来源人(cname)",name = "createCname")
    private String createCname;

    @ApiModelProperty(value = "消息创建时间(createTime)",name = "createCname")
    private Date createTime;
    @ApiModelProperty(value = "消息创建时间(projectName)",name = "projectName")
    private String  projectName;

}
