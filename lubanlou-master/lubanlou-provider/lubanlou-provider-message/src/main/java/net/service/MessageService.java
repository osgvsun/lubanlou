package net.service;


import net.gvsun.common.KafkaDTO;
import net.gvsun.common.LayTableVO;
import net.gvsun.message.external.*;
import net.gvsun.common.Result;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

public interface MessageService {
    /***********************************************************************************************
     * Descrption:短信发送接口
     * @throws NoSuchAlgorithmException
     *
     * @author：周志辉
     * @date：2017-11-08
     ***********************************************************************************************/
    String sendMessage(String tel,String content) throws NoSuchAlgorithmException, InterruptedException ;
    public LayTableVO getMessageInfo(Integer page, Integer limit)  throws Exception;
    public Result updateMessageHandleState(Integer messageId,Integer handleState);
    public Result<String> updateMessageReadState(Integer messageId,String username,Integer readState);
    public Result getMessageByMyAudit(MessageInfoDTO messageInfoDTO) throws Exception;

    public Result getMessageByState(MessageInfoDTO messageInfoDTO) throws Exception;

    /*************************************************************************************
     * Description:更新审核人消息阅读状态及操作状态
     *
     * @author: lay
     * @date: 2019/7/23
     *************************************************************************************/
    public Result updateAuditMessageHandleStateAndReadState(MessageDTO messageDTO);
    /*************************************************************************************
     * Description:kafka发送邮件
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    public ApiOutputMessageDTO sendMessage(ApiInputMessageDTO apiSendMsgDTO);
    public ApiOutputMessageDTO sendMessageZjcc(String topic,String jsonstr);
    /*************************************************************************************
     * Description:查询消息的信息(带参数)
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    public LayTableVO<List<MessageDTO>> findMessage(ApiInputMessageDTO apiInputMessageDTO);
    /*************************************************************************************
     * Description:根据星期查询相关用户信息
     *
     * @author: 曹焕
     * @date: 2020/2/28
     *************************************************************************************/
    public Map<String,List> findListenInfo(String weekday);
    /*************************************************************************************
     * Description:根据消息主题查询该分区是否存在
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    public Integer findMessageTopicByTopic(String topic);
    /*************************************************************************************
     * Description:修改消息状态位
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    public ApiOutputMessageDTO updateMessageStatus(Integer id,Integer readStatus);


    /*************************************************************************************
     * Description:获取审核结果通知
     *
     * @author: lay
     * @date: 2019/8/01
     *************************************************************************************/
    public Result getMessageByAuditResult(MessageInfoDTO messageInfoDTO) throws Exception;

    /*************************************************************************************
     * Description:获取我的审核
     *
     * @author: lay
     * @date: 2019/8/01
     *************************************************************************************/
    public Result getMessageByAuditNotice(MessageInfoDTO messageInfoDTO) throws Exception;
    public ReceiverInfoDTO getReceiverInfo(ApiInputMessageDTO apiSendMsgDTO) throws Exception;
    public KafkaDTO handleSmsMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception;
    public KafkaDTO handleEmailMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception;
    public Result handleMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception;
}
