package net.service.email;

import net.config.EmailDataSource;
import net.domain.EmailConfig;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.repository.EmailConfigJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;


@Service("EmailCommonServiceImpl")
public class EmailCommonServiceImpl implements EmailService {
    @Autowired
    private EmailDataSource mailSender;

    @Autowired
    private EmailConfigJPA emailRepository;

    /**
     * @Description: 发送简单邮件
     * @Author: 徐明杭
     * @CreateDate: 2019/4/26 13:59
     */
    @Override
    public void sendEmail(ApiInputMessageDTO apiInputMessageDTO)  {
//        System.out.println("-------------发送邮件-------------");
//        mailSender.setHost(host);
//        mailSender.setProtocol("smtp");
//        mailSender.setUsername(sender);
//        mailSender.setPassword(password);
//        mailSender.setPort(port);
//        mailSender.setDefaultEncoding("UTF-8");
        mailSender.changeDataSource("common");
        EmailConfig email = emailRepository.findByProjectName("common");
        if(!CollectionUtils.isEmpty(apiInputMessageDTO.getApiUserDTOList())) {
            for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(email.getUsername());
                message.setTo(apiUserDTO.getReceiver());
                message.setSubject(apiInputMessageDTO.getTitle());
                message.setText(apiInputMessageDTO.getMessageContent());
                try {
                    mailSender.send(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }




        System.out.println("-------------发送邮件成功-------------");
    }
}