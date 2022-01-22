package net.gvsun.message.external;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class MessageReceiverDTO implements Serializable {
    private Integer id;
    private String receiverUsername;
    /**
     * 消息接收人读取状态值
     */
    private Integer readState;
    /**
     * 消息接收人读取时间
     */
    private String readTime;

    /**
     * 消息接收人处理状态值
     */
    private Integer handleState;

    /**
     * 消息接收人处理时间
     */
    private String  handleTime;
}

