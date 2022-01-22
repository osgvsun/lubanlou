package net.factory;


import net.service.email.EmailHtmlServiceImpl;
import net.service.email.EmailService;
import net.service.email.EmailThmyleafServiceImpl;
import net.service.sms.SmsCommonServiceImpl;
import net.service.sms.SmsService;
import net.service.wechat.WechatCommonServiceImpl;
import net.service.wechat.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("MessageFactoryLubanlou")
public class MessageFactoryLubanlou implements MessageFactory{
    @Autowired
    EmailHtmlServiceImpl emailHtmlServiceImpl;

    @Override
    public SmsService createSmsService(){
        return new SmsCommonServiceImpl();
    }

    @Override
    public EmailService createEmailService(){
        return emailHtmlServiceImpl;
    }

    @Override
    public WechatService createWechatService(){
        return new WechatCommonServiceImpl();
    }
}