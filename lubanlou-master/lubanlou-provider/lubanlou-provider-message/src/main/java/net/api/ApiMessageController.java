package net.api;

import com.alibaba.fastjson.JSON;
import io.swagger.annotations.ApiParam;
import net.dbsource.mapper.MessageMapper;
import net.gvsun.common.KafkaDTO;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.MessageTopic;
import net.gvsun.kafka.producer.KafkaSender;
import net.gvsun.message.external.*;
import net.gvsun.common.Result;
import net.service.MessageService;
import net.service.sms.AliYunSmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/message")
public class ApiMessageController {
    @Autowired
    MessageService messageService;
    @Autowired
    MessageMapper messageMapper;
    @Autowired
    KafkaSender kafkaSender;
    @Autowired
    AliYunSmsService aliYunSmsService;

    /*************************************************************************************
     * Description:查询消息
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @PostMapping("/getMessageInfo")
    public LayTableVO findMessage(Integer page, Integer limit) throws Exception {
        return messageService.getMessageInfo(page, limit);
    }

    /*************************************************************************************
     * Description:查询消息信息(state代表状态（0：未读-未处理，1：已读-未处理，2：未读-已处理，3：已读-已处理）)
     *
     * @author: 曹焕
     * @date: 2021/8/01
     *************************************************************************************/
    @PostMapping("/getMessageByState")
    public Result<List<MessageDTO>> getMessageByState(@RequestBody  MessageInfoDTO messageInfoDTO) throws Exception {
        return messageService.getMessageByState(messageInfoDTO);
    }

    @PostMapping("/getMessageByMyAudit")
    public Result<List<MessageDTO>> getMessageByMyAudit(@RequestBody MessageInfoDTO messageInfoDTO) throws Exception {
        return messageService.getMessageByMyAudit(messageInfoDTO);
    }

    @PostMapping("/updateMessageHandleState")
    public Result updateMessageHandleState(Integer messageId, Integer handleState) throws Exception {
        return messageService.updateMessageHandleState(messageId, handleState);
    }

    @PostMapping("/updateMessageReadState")
    public Result<String> updateMessageReadState(Integer messageId, String username, Integer readState) throws Exception {
        return messageService.updateMessageReadState(messageId, username, readState);
    }

    /*************************************************************************************
     * Description:更新审核人消息阅读状态及操作状态
     *
     * @author: lay
     * @date: 2019/7/23
     *************************************************************************************/
    @PostMapping("/updateAuditMessageHandleStateAndReadState")
    public Result updateAuditMessageHandleStateAndReadState(@RequestBody MessageDTO messageDTO) {
        return messageService.updateAuditMessageHandleStateAndReadState(messageDTO);
    }

    /*************************************************************************************
     * Description:发送消息接口(短信、邮件、微信等)
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    @PostMapping("/sendMsg")
    public Result<String> sendMsg(@ApiParam(value = "传入topic、内容发送消息", required = true)
                                       @RequestBody ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        System.out.println("----------进入消息方法---------");
        if(Objects.nonNull(apiInputMessageDTO.getSendFlag())&&!Objects.equals(apiInputMessageDTO.getSendFlag(),"")){
          return  messageService.handleMessage(apiInputMessageDTO);
        }else{
           return Result.failed("请完善参数信息");
        }

    }

    /*************************************************************************************
     * Description:查询消息
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @PostMapping("/findMessage")
    public LayTableVO<List<MessageDTO>> findMessage(@ApiParam(value = "根据参数查询消息", required = true)
                                           @RequestBody ApiInputMessageDTO apiInputMessageDTO) {

        return messageService.findMessage(apiInputMessageDTO);
    }

    /*************************************************************************************
     * Description:修改消息状态位
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @PostMapping("/UpdateMessageStatus")
    public ApiOutputMessageDTO updateMessageStatus(@ApiParam(value = "修改消息状态位", required = true)
                                                   @RequestParam Integer messageId, Integer readStatus) {
        return messageService.updateMessageStatus(messageId, readStatus);
    }

    /**
     * @Description: 接收json字符串, 调用实验室短信接口发送短信
     * @Author: 徐明杭
     * @CreateDate: 2019/4/19 9:04
     */
    @RequestMapping("/sendMessageByZjcc")
    public @ResponseBody
    String sendMessage(@RequestParam String project, @RequestParam String mobile, @RequestParam String mess) {
        try {
            String jsonStr = "{\"project\":\"" + project + "\",\"mobile\":\"" + mobile + "\",\"mess\":\"" + mess + "\"}";
            messageService.sendMessageZjcc("smsZjcc", jsonStr);
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
        return "success";
    }

    /*************************************************************************************
     * Description:查询消息信息(我的审核通过通知)
     *
     * @author: 曹焕
     * @date: 2021/8/01
     *************************************************************************************/
    @PostMapping("/getMessageByAuditResult")
    public Result<List<MessageDTO>> getMessageByAuditResult(@RequestBody  MessageInfoDTO messageInfoDTO) throws Exception {
        return messageService.getMessageByAuditResult(messageInfoDTO);
    }

    /*************************************************************************************
     * Description:查询消息信息总记录数(我的审核通过通知)
     *
     * @author: 曹焕
     * @date: 2021/8/01
     *
     *************************************************************************************/
    @PostMapping("/countMessageByAuditResult")
    public Integer countMessageByAuditResult(@RequestBody  MessageInfoDTO messageInfoDTO){
        return messageMapper.countMessageByAuditResult(messageInfoDTO);
    }

    /*************************************************************************************
     * Description:查询消息信息(我的审核消息)
     *
     * @author: 曹焕
     * @date: 2021/8/01
     *************************************************************************************/
    @PostMapping("/getMessageByAuditNotice")
    public Result<List<MessageDTO>> getMessageByAuditNotice(@RequestBody  MessageInfoDTO messageInfoDTO) throws Exception {
        return messageService.getMessageByAuditNotice(messageInfoDTO);
    }

    /*************************************************************************************
     * Description:查询消息信息总记录数(我的审核消息)
     *
     * @author: 曹焕
     * @date: 2021/8/01
     *************************************************************************************/
    @PostMapping("/countMessageByAuditNotice")
    public Integer countMessageByAuditNotice(@RequestBody  MessageInfoDTO messageInfoDTO){
        return messageMapper.countMessageByAuditNotice(messageInfoDTO);
    }
    @PostMapping("/testSms")
    public String testSms(@RequestBody  TestDTO messageInfoDTO) throws  Exception{
        return aliYunSmsService.sendSmsAboutHuazhongkeji(messageInfoDTO);
    }
}
