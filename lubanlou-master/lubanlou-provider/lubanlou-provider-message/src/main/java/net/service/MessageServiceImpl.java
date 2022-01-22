package net.service;

import cn.com.pubinfo.service.SendMsgPortType;
import cn.com.pubinfo.service.SendMsg_Service;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.dbsource.mapper.MessageMapper;
import net.dbsource.mapper.MessageReceiverMapper;
import net.domain.Message;
import net.domain.MessageReceiver;
import net.domain.MessageTopic;
import net.domain.WeekUsername;
import net.gvsun.common.KafkaDTO;
import net.gvsun.common.LayTableVO;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.kafka.producer.KafkaSender;
import net.gvsun.message.external.*;
import net.gvsun.common.Result;
import net.gvsun.usercenter.internal.ResultDataDto;
import net.gvsun.usercenter.internal.UserDetailDto;
import net.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;


@Service("MessageService")
public class MessageServiceImpl implements MessageService {

    @Autowired
    private ProjectJPA siteJpa;
    @Autowired
    private MessageJPA messageJpa;
    @Autowired
    private WeekUsernameJPA weekUsernameJPA;
    @Autowired
    private MessageReceiverJPA messageUserJpa;
    @Autowired
    private MessageTopicJPA cMessageTypeJpa;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ShareService shareService;
    @Autowired
    private ProjectJPA projectJpa;
    @Autowired
    private MessageTopicJPA messageTopicJpa;
    @Autowired
    private MessageReceiverJPA messageReceiverJpa;
    @Autowired
    private MessageMapper messageMapper;
    @Autowired
    private UsercenterFeign usercenterFeign;
    @Autowired
    private MessageReceiverMapper messageReceiverMapper;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    KafkaSender kafkaSender;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public Result updateMessageHandleState(Integer messageId, Integer handleState) {
        Integer i = 0;
        List<MessageReceiver> list = messageReceiverMapper.getMessageReceiverByMessageId(messageId);
        for (MessageReceiver messageReceiver : list) {
            messageReceiver.setHandleState(handleState);
            messageReceiver.setHandleTime(LocalDateTime.now());
            i = messageReceiverMapper.updateById(messageReceiver);
        }
        if (null != i && i >= 1) {
            return Result.ok("修改成功!");
        } else {
            return Result.failed("修改失败!");
        }
    }

    @Override
    public Result<String> updateMessageReadState(Integer messageId, String username, Integer readState) {
        MessageReceiver messageReceiver = messageReceiverMapper.getMessageReceiverByMessageIdAndUsername(messageId, username);
        messageReceiver.setReadState(readState);
        messageReceiver.setReadTime(LocalDateTime.now());
        Integer i = messageReceiverMapper.updateById(messageReceiver);
        if (null != i && i >= 1) {
            return Result.ok("修改成功!");
        } else {
            return Result.failed("修改失败!");
        }
    }

    @Override
    public Result getMessageByMyAudit(MessageInfoDTO messageInfoDTO) throws Exception {
        List<MessageDTO> messageDTOS = messageMapper.getMessageByMyAudit(messageInfoDTO);
        return Result.ok(messageDTOS);
    }

    @Override
    public Result<List<MessageDTO>> getMessageByState(MessageInfoDTO messageInfoDTO) throws Exception {
        List<MessageDTO> messageDTOS = messageMapper.getMessageByState(messageInfoDTO);
        for (MessageDTO messageDTO : messageDTOS) {
            messageDTO.setMessageReceiverDTOList(messageReceiverMapper.getMessageReceiverInfoByMessageId(messageDTO.getId()));
            //添加当前信息人的dto
            messageDTO.setMessageReceiverDTO(messageReceiverMapper.getMessageReceiverDTOByMessageIdAndUsername(messageDTO.getId(), messageDTO.getCreateUsername()));
        }
        return Result.ok(messageDTOS);
    }

    @Override
    public LayTableVO getMessageInfo(Integer page, Integer limit) throws Exception {
        ApiOutputMessageDTO apiOutputMessageDTO = shareService.getMessageDTO(0, "success", null);
        List<ApiMessageDataDTO> lists = new ArrayList<>();
        Page<MessageDTO> pages = new Page(page,limit);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.groupBy("m.id");
        Page<MessageDTO>  messageDTOPage=messageMapper.getMessageInfo(pages,wrapper);
        return LayTableVO.ok(messageDTOPage.getRecords(),messageDTOPage.getTotal());
      /*  String sql = "select m.id,m.create_cname,m.create_username,m.message_content,mt.topic,GROUP_CONCAT(mr.receiver_username),DATE_FORMAT(m.created_time,'%Y-%m-%d %H:%I:%s'),p.project_name from message m inner join project p on p.id=m.project inner join message_topic mt on mt.id=m.message_topic inner join message_receiver mr on mr.message_id=m.id GROUP BY m.id";
        sql += " limit :page,:limit";
        List<Object[]> list = entityManager.createNativeQuery(sql).setParameter("page", (page - 1) * limit).setParameter("limit", limit).getResultList();
        for (Object[] object : list) {
            ApiMessageDataDTO apiMessageDataDTO = new ApiMessageDataDTO();
            apiMessageDataDTO.setId(object[0] != null ? Integer.parseInt(object[0].toString()) : null);
            apiMessageDataDTO.setCreateCname(object[1] != null ? object[1].toString() : null);
            apiMessageDataDTO.setCreateUsername(object[2] != null ? object[2].toString() : null);
            apiMessageDataDTO.setMessageContent(object[3] != null ? object[3].toString() : null);
            apiMessageDataDTO.setTopic(object[4] != null ? object[4].toString() : null);
            if (object[5] != null && !Objects.equals(object[5], "")) {
                apiMessageDataDTO.setReceiverUsername(Arrays.asList(object[5].toString().split(",")));
            }
            if (object[6] != null) {
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//注意月份是MM
                Date date = simpleDateFormat.parse(object[6].toString());
                String sd = simpleDateFormat.format(date);
                apiMessageDataDTO.setCreateTime(date);
            }
            apiMessageDataDTO.setProjectName(object[7] != null ? object[7].toString() : null);
            lists.add(apiMessageDataDTO);
        }
        sql = "select count(DISTINCT(m.id)) from message m inner join project p on p.id=m.project inner join message_topic mt on mt.id=m.message_topic inner join message_receiver mr on mr.message_id=m.id ";


        apiOutputMessageDTO.setCount(Integer.parseInt(entityManager.createNativeQuery(sql).getSingleResult().toString()));
        apiOutputMessageDTO.setData(lists);
        apiOutputMessageDTO.setCode(0);*/
       // return apiOutputMessageDTO;
    }

    /*************************************************************************************
     * Description:更新审核人消息阅读状态及操作状态
     *
     * @author: lay
     * @date: 2019/7/23
     *************************************************************************************/
    @Override
    public Result updateAuditMessageHandleStateAndReadState(MessageDTO messageDTO) {
        Result result = new Result();
        result.setMsg("success");
        //获取对应审核消息
        try {
            MessageDTO messageDTO1 = messageMapper.getMessageByBusiness(messageDTO.getBussinessType(), messageDTO.getBusinessUid(), messageDTO.getCreateUsername(),
                    messageDTO.getGeneralIdentification(), messageDTO.getProjectName());
            if (messageDTO1 != null && messageDTO1.getId() != null) {
                //获取对应消息所有审核对象
                List<MessageReceiver> messageReceiverList = messageReceiverMapper.getMessageReceiverByMessageId(messageDTO1.getId());
                for (MessageReceiver messageReceiver : messageReceiverList) {
                    //遍历对象更新本人处理及阅读状态
                    if (messageReceiver.getReceiverUsername().equals(messageDTO.getCreateUsername())) {
                        messageReceiver.setReadState(1);
                        messageReceiver.setReadTime(LocalDateTime.now());
                    }
                    //所有本条消息处理对象更新处理状态
                    messageReceiver.setHandleState(1);
                    messageReceiver.setHandleTime(LocalDateTime.now());
                    messageReceiverJpa.saveAndFlush(messageReceiver);
                }
                //改变消息内容审核为查看
                Message message = messageJpa.getOne(messageDTO1.getId());
                message.setMessageHtml(messageDTO.getMessageContent());
                message.setGeneralIdentification(messageDTO.getChangeIdentification());
                messageJpa.saveAndFlush(message);
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setMsg("error");
        }

        return result;
    }

    /***********************************************************************************************
     * Descrption:短信发送接口
     * @throws NoSuchAlgorithmException
     * @throws InterruptedException
     *
     * @author：周志辉
     * @date：2017-11-08
     ***********************************************************************************************/

    @Override
    public synchronized String sendMessage(String tel, String content) throws NoSuchAlgorithmException, InterruptedException {
        if (tel != null && !"".equals(tel)) {
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式
            int date = Integer.parseInt(df.format(new Date()));
            int result1 = 57100053 & date;
            String str1 = String.valueOf(result1);
            String str = str1.substring(str1.length() - 6, str1.length());
            MessageDigest md;
            md = MessageDigest.getInstance("MD5");
            byte[] str_byte = str.getBytes();
            byte[] md5_result_byte = md.digest(str_byte);
            String md5_result = bytesToHex(md5_result_byte).toLowerCase();
            SendMsgPortType sendMsg = new SendMsg_Service().getSendMsgHttpPort();
            String result = sendMsg.sendMsg("0571053", md5_result, tel, content);
            return result;
        }
        return "no phoneNumber";
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuffer md5str = new StringBuffer();
        //把数组每一字节换成16进制连成md5字符串
        int digital;
        for (int i = 0; i < bytes.length; i++) {
//             System.out.println("，   "+bytes[i]);
            digital = bytes[i];
            if (digital < 0) {  //16及以上的数转16进制是两位
                digital += 256;
            }
            if (digital < 16) {
                md5str.append("0");//如果是0~16之间的数的话则变成0X
            }
            md5str.append(Integer.toHexString(digital));
        }
        return md5str.toString().toUpperCase();
    }

    @Override
    public ApiOutputMessageDTO sendMessageZjcc(String topic, String jsonstr) {
        if (topic != null) {
            try {
                //System.out.println("发送到主题:" + apiSendMsgDTO.getTopic() + "消息:" + objectMapper.writeValueAsString(apiSendMsgDTO));
                kafkaTemplate.send(topic, jsonstr);
            } catch (Exception e) {
                e.printStackTrace();
                return shareService.getMessageDTO(500, "消息发送失败", null);
            }
            return shareService.getMessageDTO(200, "消息发送成功", null);
        } else {
            return shareService.getMessageDTO(400, "该主题不存在", null);
        }
    }


    /*************************************************************************************
     * Description:kafka生产者发送消息(短信、邮件、微信等)至消费者
     *
     * @author: 杨新蔚
     * @date: 2019/7/26
     *************************************************************************************/
    @Override
    public ApiOutputMessageDTO sendMessage(ApiInputMessageDTO apiSendMsgDTO) {
        Integer topicId = findMessageTopicByTopic(apiSendMsgDTO.getTopic());
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println("----------进入发送消息Service层---------");
        if (topicId != null) {
            try {
                System.out.println("发送到主题:" + apiSendMsgDTO.getTopic() + "消息:" + objectMapper.writeValueAsString(apiSendMsgDTO));
                kafkaTemplate.send(apiSendMsgDTO.getTopic(), objectMapper.writeValueAsString(apiSendMsgDTO));
            } catch (Exception e) {
                e.printStackTrace();
                return shareService.getMessageDTO(500, "消息发送失败", null);
            }
            return shareService.getMessageDTO(200, "消息发送成功", null);
        } else {
            return shareService.getMessageDTO(400, "该主题不存在", null);
        }

    }

    /*************************************************************************************
     * Description:根据星期查询相关用户信息
     *
     * @author: 曹焕
     * @date: 2020/2/28
     *************************************************************************************/
    @Override
    public Map<String, List> findListenInfo(String weekday) {
        Calendar n = Calendar.getInstance();
        Map<String, List> map = new HashMap<>();
        List<ApiUserDTO> apiUserEmailList = new ArrayList<>();
        List<ApiUserDTO> apiUserTelList = new ArrayList<>();
        int week = n.get(Calendar.DAY_OF_WEEK);
        List<WeekUsername> weekUsernameList = weekUsernameJPA.findInfoByWeekDay(Integer.parseInt(weekday));
        if (!CollectionUtils.isEmpty(weekUsernameList)) {
            for (WeekUsername weekUsername : weekUsernameList) {
                ApiUserDTO apiUserTel = new ApiUserDTO();
                apiUserTel.setReceiverUsername(weekUsername.getUsername());
                apiUserTel.setReceiver(weekUsername.getTelephone());
                ApiUserDTO apiUserEmail = new ApiUserDTO();
                apiUserEmail.setReceiverUsername(weekUsername.getUsername());
                apiUserEmail.setReceiver(weekUsername.getEmail());
                apiUserEmailList.add(apiUserEmail);
                apiUserTelList.add(apiUserTel);
                System.out.println("===输出定时发送信息===week==" + weekUsername.getWeekId());
                System.out.println("===输出定时发送信息===用户名==" + weekUsername.getUsername());
                System.out.println("===输出定时发送信息===名字==" + weekUsername.getCname());
                System.out.println("===输出定时发送信息===电话==" + weekUsername.getTelephone());
                System.out.println("===输出定时发送信息===邮件==" + weekUsername.getEmail());
            }
        }
        map.put("email", apiUserEmailList);
        map.put("sms", apiUserTelList);
        return map;
    }

    /*************************************************************************************
     * Description:查询消息的信息(带参数)
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @Override
    public LayTableVO<List<MessageDTO>> findMessage(ApiInputMessageDTO apiInputMessageDTO) {
        Page<MessageDTO> page = new Page(apiInputMessageDTO.getCurrPage(), apiInputMessageDTO.getPageSize());
        QueryWrapper wrapper = new QueryWrapper();
        if (!CollectionUtils.isEmpty(apiInputMessageDTO.getApiUserDTOList()) && apiInputMessageDTO.getApiUserDTOList().size() != 0) {
            wrapper.eq("mr.receiver_username", apiInputMessageDTO.getApiUserDTOList().get(0).getReceiverUsername());
        }
        if (!org.springframework.util.StringUtils.isEmpty(apiInputMessageDTO.getProject())) {
            wrapper.eq("m.project_name", apiInputMessageDTO.getProject());
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getCreateUsername())) {
            wrapper.eq("m.create_username", apiInputMessageDTO.getCreateUsername());
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getCreateCname())) {
            wrapper.like("m.create_cname", apiInputMessageDTO.getCreateCname());
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getTopic())) {
            wrapper.eq("m.message_topic", apiInputMessageDTO.getTopic());
        }
        if (apiInputMessageDTO.getStatus() != null) {
            wrapper.eq("mr.read_state", apiInputMessageDTO.getStatus());
        }
        wrapper.groupBy("m.id");
        // wrapper.orderByDesc("m.created_time");
        Page<MessageDTO> messageDTOPage = messageMapper.getMessageInfo(page, wrapper);
        for (MessageDTO messageDTO:messageDTOPage.getRecords()){
            List<MessageReceiverDTO> messageReceiverDTOList=new ArrayList<>();
                String[] receivers=messageDTO.getMessageReceivers().split(",");
            String[] reads=messageDTO.getMessageReadStatus().split(",");
           for (int i=0;i<receivers.length;i++) {
               MessageReceiverDTO messageReceiverDTO = new MessageReceiverDTO();
               messageReceiverDTO.setReceiverUsername(receivers[i]);
                   if(StringUtils.equals(reads[i],"no")){
                   }else {
                       messageReceiverDTO.setReadState(Integer.parseInt(reads[i]));
                   }

               messageReceiverDTOList.add(messageReceiverDTO);
           }
           messageDTO.setMessageReceiverDTOList(messageReceiverDTOList);

        }
            return LayTableVO.ok(messageDTOPage.getRecords(), messageDTOPage.getTotal());
    }

    /*************************************************************************************
     * Description:根据消息主题查询该分区是否存在
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @Override
    public Integer findMessageTopicByTopic(String topic) {
        List<MessageTopic> messageTopics = messageTopicJpa.findAll();
        Integer id = messageTopicJpa.findMeassageTopicIdByTopicName(topic);
        return id;
    }

    /*************************************************************************************
     * Description:修改消息状态位
     *
     * @author: 曹焕
     * @date: 2019/8/01
     *************************************************************************************/
    @Override
    public ApiOutputMessageDTO updateMessageStatus(Integer id, Integer readStatus) {
        if (readStatus != null) {
            Message message = messageJpa.findMessageUpdateStatus(id, readStatus);
            if (readStatus == 1) {
                message.setReadStatus(0);
            } else {
                message.setReadStatus(1);
            }
            messageJpa.save(message);
        } else {
            //默认修改为已读
            Message message = messageJpa.getOne(id);
            message.setReadStatus(1);
            messageJpa.save(message);
        }

        return shareService.getMessageDTO(200, "修改状态位成功", null);
    }

    /*************************************************************************************
     * Description:查询消息总数
     *
     * @author: 曹焕
     * @date: 2019/8/05
     *************************************************************************************/
    public Integer findMessageTotalCount(ApiInputMessageDTO apiInputMessageDTO) {
        String sql1 = "select count(*) from message m ";
        if (apiInputMessageDTO.getApiUserDTOList() != null && apiInputMessageDTO.getApiUserDTOList().size() != 0) {
            sql1 += " inner join message_receiver mr on mr.message_id=m.id and mr.receiver_username='" + apiInputMessageDTO.getApiUserDTOList().get(0).getReceiverUsername() + "'";
        } else {
            sql1 += " where 1=1";
        }
        // String sql1="select count(*) from message m where 1=1";
        if (!StringUtils.isEmpty(apiInputMessageDTO.getProject())) {
            Integer projectId = projectJpa.getProjectIdByProject(apiInputMessageDTO.getProject());
            sql1 += " and m.project=" + projectId;
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getCreateUsername())) {
            sql1 += " and m.create_username='" + apiInputMessageDTO.getCreateUsername() + "'";
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getCreateCname())) {
            sql1 += " and m.create_cname like '%" + apiInputMessageDTO.getCreateCname() + "%'";
        }
        if (!StringUtils.isEmpty(apiInputMessageDTO.getTopic())) {
            Integer topicId = messageTopicJpa.findMeassageTopicIdByTopicName(apiInputMessageDTO.getTopic());
            sql1 += " and m.message_topic=" + topicId;
        }
        if (apiInputMessageDTO.getStatus() != null && !StringUtils.isEmpty(apiInputMessageDTO.getStatus().toString())) {
            sql1 += " and m.read_status=" + apiInputMessageDTO.getStatus();
        }
        return Integer.parseInt(entityManager.createNativeQuery(sql1).getSingleResult().toString());

    }

    /*************************************************************************************
     * Description:获取审核结果通知
     *
     * @author: lay
     * @date: 2019/8/01
     *************************************************************************************/
    @Override
    public Result<List<MessageDTO>> getMessageByAuditResult(MessageInfoDTO messageInfoDTO) throws Exception {
        List<MessageDTO> messageDTOS = messageMapper.getMessageByAuditResult(messageInfoDTO);
        return Result.ok(messageDTOS);
    }
    public ReceiverInfoDTO getReceiverInfo(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
        ReceiverInfoDTO receiverInfoDTO=new ReceiverInfoDTO();
        List<ApiUserDTO> receiverEmailInfos=new ArrayList<>();
        List<ApiUserDTO> receiverSmsInfos=new ArrayList<>();
        String usernames="";
        for (ApiUserDTO apiUserDTO:apiSendMsgDTO.getApiUserDTOList()){
            usernames+=apiUserDTO.getReceiverUsername();
        }
        ResultDataDto<List<UserDetailDto>> listResultDataDto= usercenterFeign.getBasicInfo(usernames);
        for (UserDetailDto userDetailDto:listResultDataDto.getData()){
            ApiUserDTO apiEmailUserDTO=new ApiUserDTO();
            apiEmailUserDTO.setReceiverUsername(userDetailDto.getUsername());
            apiEmailUserDTO.setReceiver(userDetailDto.getEmail());
            apiEmailUserDTO.setReceiverCname(userDetailDto.getCname());
            ApiUserDTO apiSmsUserDTO=new ApiUserDTO();
            apiSmsUserDTO.setReceiverUsername(userDetailDto.getUsername());
            apiSmsUserDTO.setReceiver(userDetailDto.getPhone());
            apiSmsUserDTO.setReceiverCname(userDetailDto.getCname());
            receiverEmailInfos.add(apiEmailUserDTO);
            receiverSmsInfos.add(apiSmsUserDTO);
        }
       receiverInfoDTO.setSmsUserDTO(receiverSmsInfos);
        receiverInfoDTO.setEmailUserDTO(receiverEmailInfos);
        return receiverInfoDTO;
    }

    /*************************************************************************************
     * Description:获取审核结果通知
     *
     * @author: lay
     * @date: 2019/8/01
     *************************************************************************************/
    @Override
    public Result<List<MessageDTO>> getMessageByAuditNotice(MessageInfoDTO messageInfoDTO) throws Exception {
        List<MessageDTO> messageDTOS = messageMapper.getMessageByAuditNotice(messageInfoDTO);
        return Result.ok(messageDTOS);
    }
    public KafkaDTO handleSmsMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
        ObjectMapper objectMapper=new ObjectMapper();
        String content=objectMapper.writeValueAsString(apiSendMsgDTO);
        KafkaDTO kafkaDTO=new KafkaDTO();
        kafkaDTO.setData(content);
        kafkaDTO.setDataSource(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        switch (apiSendMsgDTO.getTopic()) {
            case "audit_notice":
               kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_AUDIT_NOTICE);
                break;
            case "audit_result":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_AUDIT_RESULT);
                break;
            case "configcenter_assess":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_CONFIGCENTER_ASSESS);
                break;
            case "configcenter_fill":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_CONFIGCENTER_Fill);
                break;
            case "teacher_evaluation":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_TEACHER_EVALUATION);
                break;
            case "platform_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_PLATFORM_NOTICE);
                break;
            case "audit_template":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_AUDIT_TEMPLATE);
                break;
            case "audit_complete_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_AUDIT_COMPLETE_NOTICE);
                break;
            case "email_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_NOTICE);
                break;
            case "email_html":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_HTML);
                break;
            case "new_student_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_NEW_STUDENT_NOTICE);
                break;
            case "deselection_tutor_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_DESELECTION_TUTOR_NOTICE);
                break;
            case "tutor_change_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_TUTOR_CHANGE_NOTICE);
                break;
            case "student_change_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_SMS_STUDENT_CHANGE_NOTICE);
                break;
        }
        return kafkaDTO;
    }
    public Result<String> handleMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
       ReceiverInfoDTO receiverInfo= this.getReceiverInfo(apiSendMsgDTO);
       if(apiSendMsgDTO.getSendFlag().equals("email")){
           apiSendMsgDTO.setApiUserDTOList(receiverInfo.getEmailUserDTO());
           KafkaDTO kafkaDTO=this.handleEmailMessage(apiSendMsgDTO);
           return kafkaSender.sendMessage(kafkaDTO);
       } else if(apiSendMsgDTO.getSendFlag().equals("sms")){
           apiSendMsgDTO.setApiUserDTOList(receiverInfo.getSmsUserDTO());
           KafkaDTO kafkaDTO=this.handleSmsMessage(apiSendMsgDTO);
           return kafkaSender.sendMessage(kafkaDTO);
       }else if(apiSendMsgDTO.getSendFlag().equals("all")){
           apiSendMsgDTO.setApiUserDTOList(receiverInfo.getSmsUserDTO());
           KafkaDTO kafkaDTO=this.handleSmsMessage(apiSendMsgDTO);
           kafkaSender.sendMessage(kafkaDTO);
           apiSendMsgDTO.setApiUserDTOList(receiverInfo.getEmailUserDTO());
           kafkaDTO=this.handleEmailMessage(apiSendMsgDTO);
           return kafkaSender.sendMessage(kafkaDTO);
       }else{
           return Result.failed("请指定发送类型");
       }

    }
    public KafkaDTO handleEmailMessage(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
        ObjectMapper objectMapper=new ObjectMapper();
        String content=objectMapper.writeValueAsString(apiSendMsgDTO);
        KafkaDTO kafkaDTO=new KafkaDTO();
        kafkaDTO.setData(content);
        kafkaDTO.setDataSource(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        switch (apiSendMsgDTO.getTopic()) {
            case "email_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_NOTICE);
                break;
            case "email_html":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_HTML);
                break;
            case "new_student_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_NEW_STUDENT_NOTICE);
                break;
            case "deselection_tutor_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_DESELECTION_TUTOR_NOTICE);
                break;
            case "tutor_change_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_TUTOR_CHANGE_NOTICE);
                break;
            case "student_change_notice":
                kafkaDTO.setMessageTopic(net.gvsun.common.MessageTopic.SEND_COMMON_EMAIL_STUDENT_CHANGE_NOTICE);
                break;
        }
        return kafkaDTO;
    }
}
