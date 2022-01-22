package net.service.wechat;


import net.gvsun.message.external.ApiInputMessageDTO;

public interface WechatService {
    public String sendWechat(ApiInputMessageDTO apiSendMsgDTO);
}