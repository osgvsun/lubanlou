package net.factory;


import net.repository.ProjectJPA;
import net.service.email.EmailCommonServiceImpl;
import net.service.email.EmailService;
import net.service.sms.SmsService;
import net.service.sms.SmsTemplateByAliyunServiceImpl;
import net.service.wechat.WechatCommonServiceImpl;
import net.service.wechat.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("MessageFactoryAliyun")
public class MessageFactoryAliyun implements MessageFactory {
    @Autowired
    EmailCommonServiceImpl emailCommonServiceImpl;

    @Autowired
    private SmsTemplateByAliyunServiceImpl smsTemplateByAliyunService;


    @Override
    public SmsService createSmsService() {
        return smsTemplateByAliyunService;
    }

    @Override
    public EmailService createEmailService() {
        return emailCommonServiceImpl;
    }

    @Override
    public WechatService createWechatService() {
        return new WechatCommonServiceImpl();
    }
}