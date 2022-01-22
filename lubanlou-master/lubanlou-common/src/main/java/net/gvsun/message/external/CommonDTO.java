package net.gvsun.message.external;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@ApiModel(value = "DTO-ApiInputMessageDTO",description = "消息传入DTO")
public class CommonDTO {
    @ApiModelProperty(value = "发送内容)",name = "content",required = true)
    private String content;

    @ApiModelProperty(value = "手机号",name = "number",required =true)
    private String number;
}
