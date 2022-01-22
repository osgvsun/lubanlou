package net.gvsun.message.external;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

/*************************************************************************************
 * Description:企业微信文本DTO
 *
 * @author: 杨新蔚
 * @date： 2019/12/11
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value = "DTO-WechatTextDTO",description = "企业微信文本DTO")
public class WechatTextDTO {
    //消息内容，最长不超过2048个字节，超过将截断（支持id转译）
    @ApiModelProperty(value = "企业微信文本内容",name = "content",required = true)
    private String content;
}
