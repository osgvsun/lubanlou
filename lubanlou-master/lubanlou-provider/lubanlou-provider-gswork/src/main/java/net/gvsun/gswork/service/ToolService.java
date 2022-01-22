package net.gvsun.gswork.service;

import net.gvsun.common.MessageTopic;
import net.gvsun.gswork.vo.common.UserInfoDTO;
import net.gvsun.gswork.vo.common.UserVo;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * @author 29437
 */
public interface ToolService {

    /**
     * 从用户中心获取用户信息
     * @param usernames 用户名列表
     * @return
     */
    List<UserInfoDTO> getUserListInfo(String usernames);

    /**
     * @param sender
     * @param receiver
     * @param content
     * @param topic
     * @param telephone
     * @param email
     */
    void sendMessage(@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam String sender, @RequestParam String receiver, @RequestParam String content,
                     @RequestParam String[] topic, String telephone, String email);
    /**************************************************************************
     * Description 发送短信
     * @param sender 发送方
     * @param username 接收方
     * @param data 消息替换模板数据
     * @param topic 消息主题
     * @param telephone 发送者输入的自定义手机号
     * @author fubowen
     * @date 2021-7-5
     **************************************************************************/
    void sendSms(UserVo sender, String username, String data, MessageTopic topic,String telephone);
    /**************************************************************************
     * Description 发送邮件
     * @param sender 发送方
     * @param username 接收方
     * @param data 消息替换模板数据
     * @param email 发送者输入的自定义邮箱
     * @author fubowen
     * @date 2021-7-5
     **************************************************************************/
    void sendEmail(UserVo sender, String username, String data,String email);
}
