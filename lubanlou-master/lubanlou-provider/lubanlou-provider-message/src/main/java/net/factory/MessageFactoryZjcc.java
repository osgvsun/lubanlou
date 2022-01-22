package net.factory;


import net.service.email.EmailService;
import net.service.email.EmailCommonServiceImpl;
import net.service.sms.SmsService;
import net.service.sms.SmsTemplateByAliyunServiceImpl;
import net.service.sms.SmsZjccServiceImpl;
import net.service.wechat.WechatCommonServiceImpl;
import net.service.wechat.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("MessageFactoryZjcc")
public class MessageFactoryZjcc implements MessageFactory{
    @Autowired
    EmailCommonServiceImpl emailServiceImpCommon;
    @Autowired
    private SmsZjccServiceImpl smsZjccService;
    @Override
    public SmsService createSmsService(){
        return smsZjccService;
    }
    @Override
    public EmailService createEmailService(){
        return emailServiceImpCommon;
    }

    @Override
    public WechatService createWechatService(){
        return new WechatCommonServiceImpl();
    }
}