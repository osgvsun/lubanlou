package net.service.email;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.config.EmailDataSource;
import net.domain.EmailConfig;
import net.factory.MessageFactoryGvsun;
import net.factory.MessageFactoryInstruments;
import net.factory.MessageFactoryLubanlou;
import net.gvsun.message.external.*;
import net.repository.EmailConfigJPA;
import net.service.MessageService;
import org.apache.commons.codec.binary.Base64;
import org.codehaus.xfire.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import javax.activation.DataHandler;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service("SendEmailService")
public class SendEmailServiceImpl implements SendEmailService {
    @Autowired
    private EmailDataSource mailSender;

    @Qualifier("templateEngine")
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private EmailConfigJPA emailRepository;
    @Autowired
    private MessageFactoryInstruments messageFactoryInstruments;
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageFactoryGvsun messageFactoryGvsun;
    @Autowired
    private MessageFactoryLubanlou messageFactoryLubanlou;
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
    private static String getSHA(String password) throws Exception{
        MessageDigest sha = MessageDigest.getInstance("SHA");
        sha.update(password.getBytes());
        byte[] hash = sha.digest();
        return new String(Base64.encodeBase64(hash));

    }
    public  void sendTestEmail(TestDTO testDTO) throws Exception{
        Map<String,Object> map = new HashMap<>();
            ApplicationContext appContext = new ClassPathXmlApplicationContext(new String[] {});
            //webservice地址由正式环境决定
            org.springframework.core.io.Resource resource = appContext.getResource("url:http:// ucs.hust.edu.cn/service/EmailService?wsdl");
            //获取时间
            Date date = new Date();
            ObjectMapper objectMapper=new ObjectMapper();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            //授权处理，需要在平台端，系统管理-权限项管理中设置
            //秘钥，必须
            map.put("secret_key", getSHA(testDTO.getSecretKey()));
            //对应的第三方系统名称（协议值），必须
            map.put("tp_name", testDTO.getTpName());
            //对应的模块名称（协议值），必须
            map.put("module_id", testDTO.getModuleId());
            //对应的平台系统名称（协议值），必须
            map.put("sys_id", testDTO.getSysId());
            //对应的接口方法名称（协议值），必须
            map.put("interface_method", testDTO.getInterfaceMethod());

            //参数列表
            //接收人信息,每个人员信息格式为： 名字|学工号|部门ID|部门名称|邮箱号，人与人之间用“^@^”隔开（如果数据无法提供，可以写空，但是“|”不可省略），必须
            map.put("recieve_person_info",testDTO.getPersonInfo());
            //抄送人信息,每个人员信息格式为： 名字|学工号|部门ID|部门名称|邮箱号，人与人之间用“^@^”隔开（如果数据无法提供，可以写空），必须
            map.put("cc_person_info",testDTO.getCcPersonInfo());
            //邮件标题，非必须
            map.put("emial_title", testDTO.getEmialTitle());
            //邮件内容，必须
            map.put("email_info", testDTO.getEmailInfo());
            //发送优先级（1：紧急通知；2：验证码；3：立即发送；4：发送），必须
            map.put("send_priority",testDTO.getSendPriority());
            //发送时间，String型，可为空，参数不可省略
            map.put("send_time", testDTO.getSendTime());
            //发送人UID，发送模板的时候不可为空，参数不可省略
            map.put("operator_id", testDTO.getOperatorId());
            //发送人ID_NUMBER，需要发送回执的时候不可为空，参数不可省略
            map.put("operator_id_number", testDTO.getOperatorIdNumber());
            //发送人姓名，可为空，参数不可省略
            map.put("operator_name", testDTO.getOperatorName());
            //发送人部门ID，可为空，参数不可省略
            map.put("operator_unit_id", testDTO.getOperatorUnitId());
            //发送人部门姓名，可为空，参数不可省略
            map.put("operator_unit_name",testDTO.getOperatorUnitName());
            //发送模板选择，不发送模板值为”0”，参数不可省略
            map.put("templet_id",testDTO.getTempletId());
            //发送回执选择，不发送模板值为”0”，参数不可省略
            map.put("receipt_id",testDTO.getReceiptId());
            //发送人签名，根据模板而定，选择的模板有“发送人签名”标签的需要写值，其他为空，参数不可省略
            map.put("person_send", testDTO.getPersonSend());
            //发送平台码，必须
            map.put("send_sys_id", testDTO.getSendSysId());
            //发送平台名称，必须
            map.put("send_sys_name",testDTO.getSendSysName());
            //发送使用的浏览器，可为空，参数不可省略
            map.put("user_browser", testDTO.getUserBrowser());
            //转化
            String json = objectMapper.writeValueAsString(map);

            System.out.println("=====邮件数据==json====:"+json);
            //调用
            Client client = new Client(resource.getInputStream(), null);
            //输出结果 boolean型，true代表推送成功，false为失败
            Object[] result = client.invoke("saveEmailInfo", new Object[]{json});

            System.out.println("邮件结果=========="+result[0]);

            client.close();

    }

    /************************************************************************
     *@Description:结合thmyleaf发送模板邮件
     *@Author:w吴奇臻
     *@Date:2018/04/19
     ************************************************************************/
    @Override
    public void sendEmail(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        switch (apiInputMessageDTO.getProject()) {
            case "insproduct":
                messageFactoryInstruments.createEmailService().sendEmail(apiInputMessageDTO);
                break;
            case "sjtuinstruments":
                messageFactoryInstruments.createEmailService().sendEmail(apiInputMessageDTO);
                break;
            case "dhuinstruments":
                messageFactoryInstruments.createEmailService().sendEmail(apiInputMessageDTO);
                break;
            case "lubanlou":
                messageFactoryLubanlou.createEmailService().sendEmail(apiInputMessageDTO);
                break;
            default:
                messageFactoryGvsun.createEmailService().sendEmail(apiInputMessageDTO);
        }
    }
    public void sendEmailAboutNewStudentNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception {

        NewStudentNoticeDTO newStudentNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), NewStudentNoticeDTO.class);
        for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
            context.setVariable("cname", newStudentNoticeDTO.getCname());
            context.setVariable("studentName", newStudentNoticeDTO.getStudentName());
            context.setVariable("url", newStudentNoticeDTO.getUrl());
            String emailContent = templateEngine.process("emailAboutNewStudentNotice", context);
            sendHtmlEmail(apiInputMessageDTO.getProject(), apiUserDTO.getReceiver(), "通知提醒", emailContent);
        }
    }
    public void sendEmailAboutDeselectionTutorNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        DeselectionTutorNoticeDTO newStudentNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), DeselectionTutorNoticeDTO.class);
        for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
            context.setVariable("type", newStudentNoticeDTO.getType());
            context.setVariable("username", newStudentNoticeDTO.getUsername());
            context.setVariable("url", newStudentNoticeDTO.getUrl());
            String emailContent = templateEngine.process("deselectionTutorNotice", context);
            sendHtmlEmail(apiInputMessageDTO.getProject(), apiUserDTO.getReceiver(), "通知提醒", emailContent);
        }
    }
    public void sendEmailAboutTutorChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        DeselectionTutorNoticeDTO newStudentNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), DeselectionTutorNoticeDTO.class);
        for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
            context.setVariable("type", newStudentNoticeDTO.getType());
            context.setVariable("username", newStudentNoticeDTO.getUsername());
            context.setVariable("url", newStudentNoticeDTO.getUrl());
            String emailContent = templateEngine.process("tutorChangeNotice", context);
            sendHtmlEmail(apiInputMessageDTO.getProject(), apiUserDTO.getReceiver(), "通知提醒", emailContent);
        }
    }
    public void sendEmailAboutStudentChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        StudentChangeNoticeDTO newStudentNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), StudentChangeNoticeDTO.class);
        for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
            org.thymeleaf.context.Context context = new org.thymeleaf.context.Context();
            context.setVariable("type", newStudentNoticeDTO.getType());
            context.setVariable("studentName", newStudentNoticeDTO.getStudentName());
            context.setVariable("url", newStudentNoticeDTO.getUrl());
            String emailContent = templateEngine.process("studetnChangeNotice", context);
            sendHtmlEmail(apiInputMessageDTO.getProject(), apiUserDTO.getReceiver(), "通知提醒", emailContent);
        }
    }

}
