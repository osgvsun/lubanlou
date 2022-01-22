package net.factory;


import net.service.email.EmailService;
import net.service.sms.SmsService;
import net.service.wechat.WechatService;

public interface MessageFactory {
    SmsService createSmsService();
    EmailService createEmailService();
    WechatService createWechatService();
}