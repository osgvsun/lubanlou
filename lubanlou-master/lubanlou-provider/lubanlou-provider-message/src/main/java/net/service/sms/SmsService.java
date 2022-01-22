package net.service.sms;


import net.gvsun.message.external.ApiInputMessageDTO;

public interface SmsService {
    public String sendSms(ApiInputMessageDTO apiSendMsgDTO) throws Exception;
}