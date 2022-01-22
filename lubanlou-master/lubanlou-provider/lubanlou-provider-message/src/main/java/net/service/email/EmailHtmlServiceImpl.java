package net.service.email;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.config.EmailDataSource;
import net.domain.EmailConfig;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.repository.EmailConfigJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import javax.activation.DataHandler;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service("EmailHtmlServiceImpl")
public class EmailHtmlServiceImpl implements EmailService {
    @Autowired
    private EmailDataSource mailSender;

    @Qualifier("templateEngine")
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private EmailConfigJPA emailRepository;
    /***********************************************************************
     *@Description:发送html格式的邮件
     *@param to 收件人
     *@param subject 邮件主题
     *@param content 邮件内容
     *@Author:徐明杭
     *@Date:2018/12/4
     ***********************************************************************/
    public void sendHtmlEmail(String project,String to, String subject, String content){
        //修改邮件发送端配置
        mailSender.changeDataSource(project);
        EmailConfig email = emailRepository.findByProjectName(project);
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(email.getUsername());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content,"text/html;charset=UTF-8");
            System.out.println(helper.getEncoding());
            message.setDataHandler(new DataHandler(content, "text/html;charset=UTF-8"));
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    /************************************************************************
     *@Description:结合thmyleaf发送模板邮件
     *@Author:w吴奇臻
     *@Date:2018/04/19
     ************************************************************************/
    @Override
    public void sendEmail(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(apiInputMessageDTO.getMessageContent());

       // EmailConfig email = emailRepository.findByProjectName(jsonNode.get("projectName").asText());
        for (ApiUserDTO apiUserDTO:apiInputMessageDTO.getApiUserDTOList()) {
            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
            context.setVariable("senderCname", apiInputMessageDTO.getCreateCname());
            context.setVariable("senderUsername",apiInputMessageDTO.getCreateUsername());
            context.setVariable("senderEmail", jsonNode.get("email").asText());
            context.setVariable("senderTelphone", jsonNode.get("telphone").asText());
            context.setVariable("reportProblem", jsonNode.get("content").asText());
            String emailContent = templateEngine.process("feedback", context);
            sendHtmlEmail(apiInputMessageDTO.getProject(),apiUserDTO.getReceiver(), "问题反馈通知", emailContent);
        }
    }
}