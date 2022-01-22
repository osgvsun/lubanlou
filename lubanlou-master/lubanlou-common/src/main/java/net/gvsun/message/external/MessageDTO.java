package net.gvsun.message.external;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class MessageDTO implements Serializable {
    private Integer id;
    private String createCname;
    private String createUsername;
    private String createdTime;
    private String messageContent;
    private String messageHtml;
    private String handleTime;
    private Integer handleState;
    private String readTime;
    private Integer readState;
    private List<MessageReceiverDTO> messageReceiverDTOList;

    /**
     * 当前消息接收人
     */
    private MessageReceiverDTO messageReceiverDTO;

    /**
     * 消息标题
     */
    private String title;


    /**
     * 通用业务类型
     */
    private String bussinessType;

    /**
     * 通用业务主键
     */
    private String businessUid;

    /**
     * 通用业务识别字段
     */
    private String generalIdentification;

    /**
     * 通用业务识别字段(变更)
     */
    private String changeIdentification;


    /**
     * 项目名称
     */
    private String projectName;

    /**
     * 消费主题
     */
    private String messageTopic;
    /**
     * 消息接收人(String字符串)
     */
    private String messageReceivers;
    /**
     * 消息读取状态(String字符串)
     */
    private String messageReadStatus;
}

