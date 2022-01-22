package net.service.email;

import net.gvsun.message.external.ApiInputMessageDTO;
import org.springframework.stereotype.Component;

@Component
public interface EmailService {
    /**
    * @Description: 发送简单邮件
    * @Author: 徐明杭
    * @CreateDate: 2019/4/26 13:59
    */
    void sendEmail(ApiInputMessageDTO apiSendMsgDTO) throws Exception;

}