package net.gvsun.message.external;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


/*************************************************************************************
 * Description:消息接口输入DTO
 *
 * @author: 杨新蔚
 * @date： 2019/7/23
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-ApiInputMessageDTO",description = "消息接口输入DTO")
public class ApiInputMessageDTO {
    @ApiModelProperty(value = "消息发送主题topic(sms、email、wechat)",name = "topic",required = true)
    private String topic;

    @ApiModelProperty(value = "消息来源项目",name = "project",required =true)
    private String project;

    @ApiModelProperty(value = "消息发送标题",name = "title")
    private String title;

    @ApiModelProperty(value = "消息发送内容",name = "messageContent",required = true)
    private String messageContent;

    @ApiModelProperty(value = "消息发送附带点击链接",name = "messageHtml")
    private String messageHtml;

    @ApiModelProperty(value = "消息发送来源人(username)",name = "createUsername",required = true)
    private String createUsername;

    @ApiModelProperty(value = "消息发送来源人(cname)",name = "createCname")
    private String createCname;

    @ApiModelProperty(value = "当前页(currPage)",name = "currPage")
    private Integer currPage;

    @ApiModelProperty(value = "每页显示数量(pageSize)",name = "pageSize")
    private Integer pageSize;

    @ApiModelProperty(value = "状态(status)",name = "status")
    private Integer status;

    @ApiModelProperty(value = "时间戳(timeStamp)",name = "timeStamp")
    private Long  timeStamp;

    @ApiModelProperty(value = "接收人信息(apiUserDTOList)",name = "apiUserDTOList")
    private List<ApiUserDTO> apiUserDTOList;

    @ApiModelProperty(value = "时间",name = "date")
    private Date date;


    @ApiModelProperty(value = "通用业务类型",name = "businessType")
    private String businessType;

    @ApiModelProperty(value = "通用业务主键",name = "bussinessUid")
    private String businessUid;

    @ApiModelProperty(value = "通用识别字段",name = "bussinessUid")
    private String generalIdentification;
    @ApiModelProperty(value = "识别是否发送短信或者邮件(all,代表2者都发,email,只发邮件，sms，只发短信)",name = "sendFlag")
    private String sendFlag;


}
