package net.config;

import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiOutputMessageDTO;
import net.factory.MessageFactoryAliyun;
import net.factory.MessageFactoryGvsun;
import net.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Component
public class TimedTask {
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageFactoryAliyun messageFactoryAliyun;
    @Autowired
    private MessageFactoryGvsun messageFactoryGvsun;
    //早上9：15执行
    @Scheduled(cron ="0 15 09 * * ?")
    public void sendMsg2() throws Exception{
        ApiOutputMessageDTO apiOutputMessageDTO=new ApiOutputMessageDTO();
        ApiInputMessageDTO apiInputMessageDTO=new ApiInputMessageDTO();
        apiInputMessageDTO.setProject("GvsunProject");
        apiInputMessageDTO.setTopic("SMS_186967418");
        System.out.println("----------进入消息方法---------");
       // apiOutputMessageDTO=messageService.sendMessage(apiInputMessageDTO);
        Calendar calendar = Calendar.getInstance();
        Integer weekday=calendar.get(Calendar.DAY_OF_WEEK)-1;
        Map<String,List> map=messageService.findListenInfo(weekday.toString());
        apiInputMessageDTO.setMessageContent("发送短信正常!哈哈哈");
        apiInputMessageDTO.setApiUserDTOList(map.get("sms"));
        String result=messageFactoryAliyun.createSmsService().sendSms(apiInputMessageDTO);
        apiInputMessageDTO.setMessageContent("发送邮件正常");
        apiInputMessageDTO.setApiUserDTOList(map.get("email"));
        apiInputMessageDTO.setTopic("email");
        messageFactoryGvsun.createEmailService().sendEmail(apiInputMessageDTO);
        System.out.println("======检测短信是否正常(结果)====="+result);
        //return apiOutputMessageDTO;
    }
    //下午13：20执行
    @Scheduled(cron ="0 15 13 * * ?")
    public void sendMsgTimer2() throws Exception {
        ApiOutputMessageDTO apiOutputMessageDTO=new ApiOutputMessageDTO();
        ApiInputMessageDTO apiInputMessageDTO=new ApiInputMessageDTO();
        apiInputMessageDTO.setProject("GvsunProject");
        apiInputMessageDTO.setTopic("SMS_186967418");
        System.out.println("----------进入阿里云消息方法---------");
        Calendar calendar = Calendar.getInstance();
        Integer weekday=calendar.get(Calendar.DAY_OF_WEEK)-1;
        Map<String,List> map=messageService.findListenInfo(weekday.toString());
        apiInputMessageDTO.setMessageContent("发送短信正常!哈哈哈");
        apiInputMessageDTO.setApiUserDTOList(map.get("sms"));
        String result=messageFactoryAliyun.createSmsService().sendSms(apiInputMessageDTO);
        apiInputMessageDTO.setMessageContent("发送邮件正常!!!");
        apiInputMessageDTO.setApiUserDTOList(map.get("email"));
        apiInputMessageDTO.setTopic("email");
        messageFactoryGvsun.createEmailService().sendEmail(apiInputMessageDTO);
        System.out.println("======检测短信是否正常(结果)====="+result);
       // apiOutputMessageDTO=messageService.sendMessage(apiInputMessageDTO);
      //  return apiOutputMessageDTO;
    }
}
