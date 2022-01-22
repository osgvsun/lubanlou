package net.kafka;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.factory.*;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.common.KafkaDTO;
import net.service.MessageService;
import net.service.ShareService;
import net.service.email.SendEmailService;
import net.service.sms.AliYunSmsService;
import net.service.sms.SmsService;
import net.service.sms.SmsZjccServiceImpl;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.*;

/*************************************************************************************
 * Description:a模块-b功能{c方法描述}
 *
 * @author: 杨新蔚
 * @date： 2019/7/22
 *************************************************************************************/
@Component
@Slf4j
public class KafkaReceiver {
    @Autowired
    private MessageFactoryAliyun messageFactoryAliyun;
    @Autowired
    private AliYunSmsService aliYunSmsService;
    @Autowired
    private ShareService shareService;
    @Autowired
    private MessageFactoryGvsun messageFactoryGvsun;
    @Autowired
    private SendEmailService sendEmailService;
    @Autowired
    private MessageFactoryZjcc messageFactoryZjcc;
    @Autowired
    private MessageFactoryInstruments messageFactoryInstruments;
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageFactoryLubanlou messageFactoryLubanlou;


    @KafkaListener(topics = {"email"})
    public void listenEmail(String json) throws Exception{
        KafkaDTO kafkaDTO = JSON.parseObject(json, KafkaDTO.class);
        ApiInputMessageDTO apiInputMessageDTO = JSON.parseObject(kafkaDTO.getData(),ApiInputMessageDTO.class);
        ClientDatabaseContextHolder.set(kafkaDTO.getDataSource());
        if(!CollectionUtils.isEmpty(apiInputMessageDTO.getApiUserDTOList())) {
            shareService.saveMessage(apiInputMessageDTO, kafkaDTO);
            switch (kafkaDTO.getMessageTopic().getSubTopic()) {
                case "email_notice":
                    messageFactoryGvsun.createEmailService().sendEmail(apiInputMessageDTO);
                    break;
                case "email_html":
                    sendEmailService.sendEmail(apiInputMessageDTO);
                    break;
                case "tutor_change_notice":
                    sendEmailService.sendEmailAboutTutorChangeNotice(apiInputMessageDTO);
                    break;
                case "deselection_tutor_notice":
                    sendEmailService.sendEmailAboutDeselectionTutorNotice(apiInputMessageDTO);
                    break;
                case "new_student_notice":
                    sendEmailService.sendEmailAboutNewStudentNotice(apiInputMessageDTO);
                    break;
                case "student_change_notice":
                    sendEmailService.sendEmailAboutStudentChangeNotice(apiInputMessageDTO);
                    break;
            }
        }

    }

    @KafkaListener(topics = {"notice"})
    public void listenNotice(String json) {
        KafkaDTO kafkaDTO = JSON.parseObject(json, KafkaDTO.class);
        ApiInputMessageDTO apiInputMessageDTO = JSON.parseObject(kafkaDTO.getData(),ApiInputMessageDTO.class);
        ClientDatabaseContextHolder.set(kafkaDTO.getDataSource());
        shareService.saveMessage(apiInputMessageDTO,kafkaDTO);
    }

    @KafkaListener(topics = {"daily_notice"})
    public void listenDailyNotice(ConsumerRecord<?, ?> record) {
        System.out.println("-------------进入kafka监听日报-------------");
        Optional<?> jsonMessage = Optional.ofNullable(record.value());
        if (jsonMessage.isPresent()) {
            ObjectMapper objectMapper=new ObjectMapper();
            Object message = jsonMessage.get();
            try {
                ApiInputMessageDTO apiInputMessageDTO=objectMapper.readValue(message.toString(),ApiInputMessageDTO.class);
                System.out.println("------->" + apiInputMessageDTO.getApiUserDTOList().get(0).getReceiver());
                ClientDatabaseContextHolder.set(apiInputMessageDTO.getApiUserDTOList().get(0).getReceiver());
                /*if(apiInputMessageDTO.getApiUserDTOList().size()!=0){
                for (ApiUserDTO apiUserDTO:apiInputMedssageDTO.getApiUserDTOList()) {
                    apiInputMessageDTO.setReceiverUsername(apiUserDTO.getReceiverUsername());
                    apiInputMessageDTO.setReceiver(apiUserDTO.getReceiver());
                    apiInputMessageDTO.setReceiverCname(apiUserDTO.getReceiverCname());
                    shareService.convertApiSendMsgDTO(apiInputMessageDTO);
                }
                }else{*/
                shareService.convertApiSendMsgDTO(apiInputMessageDTO);
                switch (apiInputMessageDTO.getProject()){
                    //目前通知公告无操作，后续代加
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
    @KafkaListener(topics = {"service_status"})
    public void listenServiceStatus(ConsumerRecord<?, ?> record) {
        System.out.println("-------------进入kafka监听服务状态-------------");
        Optional<?> jsonMessage = Optional.ofNullable(record.value());
        if (jsonMessage.isPresent()) {
            ObjectMapper objectMapper=new ObjectMapper();
            Object message = jsonMessage.get();
            try {
                ApiInputMessageDTO apiInputMessageDTO=objectMapper.readValue(message.toString(),ApiInputMessageDTO.class);
                shareService.convertApiSendMsgDTO(apiInputMessageDTO);
                System.out.println("-------------输出所属项目名-------------"+apiInputMessageDTO.getProject());
                switch (apiInputMessageDTO.getProject()) {
                    default:
                        messageFactoryGvsun.createWechatService().sendWechat(apiInputMessageDTO);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
    @KafkaListener(topics = "#{'${topicName}'.split(',')}")
    public void listen(ConsumerRecord<?, ?> record) {
        System.out.println("-------------进入kafka监听短信层面-------------");
        Optional<?> jsonMessage = Optional.ofNullable(record.value());
        if (jsonMessage.isPresent()) {
            ObjectMapper objectMapper=new ObjectMapper();
            Object message = jsonMessage.get();
            try {
                System.out.println("-------------输出kafka所监听到的消息字符串-------------"+message.toString());
                ApiInputMessageDTO apiInputMessageDTO=objectMapper.readValue(message.toString(),ApiInputMessageDTO.class);
                shareService.convertApiSendMsgDTO(apiInputMessageDTO);
                System.out.println("-------------输出所属项目名-------------"+apiInputMessageDTO.getProject());
                switch (apiInputMessageDTO.getProject()) {
                    case "zjcclims":
                        messageFactoryZjcc.createSmsService().sendSms(apiInputMessageDTO);
                        break;
                    default:
                        // apiInputMessageDTO.setCommonDTOList(commonDTOList);
                        messageFactoryAliyun.createSmsService().sendSms(apiInputMessageDTO);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
        }

    }
    @KafkaListener(topics = "sms")
    public void sms(String json) throws Exception{
        KafkaDTO kafkaDTO = JSON.parseObject(json, KafkaDTO.class);
        ApiInputMessageDTO apiInputMessageDTO = JSON.parseObject(kafkaDTO.getData(),ApiInputMessageDTO.class);
        ClientDatabaseContextHolder.set(kafkaDTO.getDataSource());
        if(!CollectionUtils.isEmpty(apiInputMessageDTO.getApiUserDTOList())) {
            shareService.saveMessage(apiInputMessageDTO, kafkaDTO);
            if (Objects.nonNull(apiInputMessageDTO.getProject()) && Objects.equals(apiInputMessageDTO.getProject(), "zjcclims")) {
                aliYunSmsService.sendSmsAboutZjcclims(kafkaDTO);
            } else {
                switch (kafkaDTO.getMessageTopic().getSubTopic()) {
                    case "audit_notice":
                        aliYunSmsService.sendSmsAboutAuditNotice(apiInputMessageDTO);
                        //messageFactoryAliyun.createSmsService().sendSms(apiInputMessageDTO);
                        break;
                    case "audit_result":
                        aliYunSmsService.sendSmsAboutAuditResult(apiInputMessageDTO);
                        // messageFactoryAliyun.createSmsService().sendSms(apiInputMessageDTO);
                        break;
                    case "configcenter_assess":
                        aliYunSmsService.sendSmsAboutReviewNotice(apiInputMessageDTO);
                        break;
                    case "configcenter_fill":
                        aliYunSmsService.sendSmsAboutConfigCenterFill(apiInputMessageDTO);
                        break;
                    case "teacher_evaluation":
                        aliYunSmsService.sendSmsAboutTeacherEvaluation(apiInputMessageDTO);
                        break;
                    case "platform_notice":
                        aliYunSmsService.sendSmsAboutPlatFormNotice(apiInputMessageDTO);
                        break;
                    case "audit_template":
                        aliYunSmsService.sendSmsAboutPlatFormNotice(apiInputMessageDTO);
                        break;
                    case "audit_complete_notice":
                        aliYunSmsService.sendSmsAboutPlatFormNotice(apiInputMessageDTO);
                        break;
                    case "tutor_change_notice":
                        aliYunSmsService.sendSmsAboutTutorChangeNotice(apiInputMessageDTO);
                        break;
                    case "deselection_tutor_notice":
                        aliYunSmsService.sendSmsAboutDeselectionTutorNotice(apiInputMessageDTO);
                        break;
                    case "new_student_notice":
                        aliYunSmsService.sendSmsAboutNewStudentNotice(apiInputMessageDTO);
                        break;
                    case "student_change_notice":
                        aliYunSmsService.sendSmsAboutStudentChangeNotice(apiInputMessageDTO);
                        break;
                }
            }
        }

    }
/*
    @KafkaListener(topics = {"datashare_userRegister"})
    public void listenDatashare(ConsumerRecord<?, ?> record) {
        System.out.println("-------------进入kafka监听层面-------------");
        Optional<?> jsonMessage = Optional.ofNullable(record.value());
        if (jsonMessage.isPresent()) {
            ObjectMapper objectMapper=new ObjectMapper();
            Object message = jsonMessage.get();
            try {
                Map<String, Object> valueMap = new HashMap<>();
                *//*System.out.println("-------------输出kafka所监听到的消息字符串-------------"+message.toString());
                maxwellService.updateData(objectMapper.readValue(message.toString(),valueMap.getClass()));
            *//*}catch (Exception e){
                e.printStackTrace();
            }
        }

    }*/
}