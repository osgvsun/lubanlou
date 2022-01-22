package net.factory;


import net.service.email.EmailService;
import net.service.email.EmailCommonServiceImpl;
import net.service.sms.SmsCommonServiceImpl;
import net.service.sms.SmsService;
import net.service.wechat.WechatCommonServiceImpl;
import net.service.wechat.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("MessageFactoryGvsun")
public class MessageFactoryGvsun implements MessageFactory{
    @Autowired
    EmailCommonServiceImpl emailCommonServiceImpl;

    @Override
    public SmsService createSmsService(){
        return new SmsCommonServiceImpl();
    }

    @Override
    public EmailService createEmailService(){
        return emailCommonServiceImpl;
    }

    @Override
    public WechatService createWechatService(){
        return new WechatCommonServiceImpl();
    }
}