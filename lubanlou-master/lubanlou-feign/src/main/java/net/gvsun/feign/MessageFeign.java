package net.gvsun.feign;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiOutputMessageDTO;
import net.gvsun.message.external.MessageDTO;
import net.gvsun.message.external.MessageInfoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


/**
 *
 * @Description 消息服务对应feign接口
 * @author 李涵
 * @Date 2021/1/20 10:22
 * @return
 **/
@FeignClient(value = "message")
public interface MessageFeign {
    /*************************************************************************************
     * Description:查询消息
     * @param apiInputMessageDTO    根据参数查询消息
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @PostMapping("/api/message/findMessage")
    LayTableVO<List<MessageDTO>> findMessage(@RequestBody ApiInputMessageDTO apiInputMessageDTO);

    /*************************************************************************************
     * Description:修改消息状态位
     * @param messageId
     * @param readStatus
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @PostMapping("/api/message/UpdateMessageStatus")
    @ApiOperation("修改消息状态位")
    ApiOutputMessageDTO updateMessageStatus(@RequestParam("messageId") Integer messageId,@RequestParam("readStatus") Integer readStatus);

    /**
     *  Description获取我的消息
     *  @param messageInfoDTO
     *  @return Result<List<MessageDTO>>
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/getMessageByState")
    Result<List<MessageDTO>> getMessageByState(@RequestBody MessageInfoDTO messageInfoDTO);
    /**
     *  Description获取我的审核消息
     *  @param messageInfoDTO
     *  @return Result<List<MessageDTO>>
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/getMessageByMyAudit")
    Result<List<MessageDTO>> getMessageByMyAudit(@RequestBody MessageInfoDTO messageInfoDTO);

    /**
     *  Description修改收件人消息读取状态
     *  @param messageId,username,readState
     *  @return Result
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/updateMessageReadState")
    Result<String> updateMessageReadState(@RequestParam("messageId")Integer messageId, @RequestParam("username")String username,@RequestParam("readState")Integer readState);

    /**
     *  Description修改处理对象消息读取状态
     *
     *  @return void
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/updateAuditMessageHandleStateAndReadState")
    Result updateAuditMessageHandleStateAndReadState(@RequestBody MessageDTO messageDTO);

    /**
     *  Description获取我的审核通过消息
     *  @param messageInfoDTO
     *  @return Result<List<MessageDTO>>
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/getMessageByAuditResult")
    Result<List<MessageDTO>> getMessageByAuditResult(@RequestBody MessageInfoDTO messageInfoDTO);

    /**
     *  Description获取我的审核消息
     *  @param messageInfoDTO
     *  @return Result<List<MessageDTO>>
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/getMessageByAuditNotice")
    Result<List<MessageDTO>> getMessageByAuditNotice(@RequestBody MessageInfoDTO messageInfoDTO);

    /**
     *  Description获取我的审核通过消息总记录数
     *  @param messageInfoDTO
     *  @return Integer
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/countMessageByAuditResult")
    Integer countMessageByAuditResult(@RequestBody MessageInfoDTO messageInfoDTO);

    /**
     *  Description获取我的审核消息总记录数
     *  @param messageInfoDTO
     *  @return Integer
     *  @author lay
     *  @date 2021/2/2 18:19
     */
    @PostMapping(value = "/api/message/countMessageByAuditNotice")
    Integer countMessageByAuditNotice(@RequestBody MessageInfoDTO messageInfoDTO);
}
