package net.service;

import com.alibaba.fastjson.JSON;
import net.dbsource.mapper.MessageMapper;
import net.domain.Message;
import net.domain.MessageReceiver;
import net.domain.Project;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiMessageDataDTO;
import net.gvsun.message.external.ApiOutputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.gvsun.common.KafkaDTO;
import net.repository.MessageJPA;
import net.repository.MessageReceiverJPA;
import net.repository.MessageTopicJPA;
import net.repository.ProjectJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service("ShareService")
public class ShareServiceImpl implements ShareService {

    @Autowired
    ProjectJPA projectJpa;
    @Autowired
    MessageReceiverJPA messageReceiverJpa;
    @Autowired
    MessageJPA messageJpa;
    @Autowired
    MessageTopicJPA messageTopicJpa;
    @Autowired
    MessageService messageService;
    @Autowired
    MessageMapper messageMapper;
    /*************************************************************************************
     * Description:封装消息返回值
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    @Override
    public ApiOutputMessageDTO getMessageDTO(Integer status, String msg, Map<String,Object> map) {

        ApiOutputMessageDTO apiOutputMessageDTO = new ApiOutputMessageDTO();
        //状态码后续按需添加
        switch (status) {
            case 400:
                apiOutputMessageDTO.setStatus(status);
                apiOutputMessageDTO.setMsg(msg);
                break;
            case 200:
                apiOutputMessageDTO.setStatus(status);
                apiOutputMessageDTO.setMsg(msg);
                break;
            case 500:
                apiOutputMessageDTO.setStatus(status);
                apiOutputMessageDTO.setMsg(msg);
                break;
            default:
                apiOutputMessageDTO.setStatus(status);
                apiOutputMessageDTO.setMsg("");
        }
        List<ApiMessageDataDTO> apiMessageDataDTOList=new ArrayList<>();
        if(map!=null) {
                List<Message> messageList = (List<Message>) map.get("messageList");
                for (Message message : messageList) {
                    ApiMessageDataDTO apiMessageDataDTO = new ApiMessageDataDTO();
                    apiMessageDataDTO.setId(message.getId());
                    if (message.getMessageTopic() != null) {
                        apiMessageDataDTO.setTopic(message.getMessageTopic());
                    }
                    apiMessageDataDTO.setCreateCname(message.getCreateCname());
                    apiMessageDataDTO.setCreateUsername(message.getCreateUsername());
                    apiMessageDataDTO.setMessageContent(message.getMessageContent());
                    apiMessageDataDTO.setMessageHtml(message.getMessageHtml());
                    apiMessageDataDTO.setReadStatus(message.getReadStatus());
                    apiMessageDataDTO.setCreateTime(message.getCreatedTime());
                    List<String> receiverUsernameList = messageReceiverJpa.findMessageUserByMessageId(message.getId());
                    apiMessageDataDTO.setReceiverUsername(receiverUsernameList);
                    apiMessageDataDTOList.add(apiMessageDataDTO);
                }
            apiOutputMessageDTO.setCount(Integer.parseInt(map.get("count").toString()));
            apiOutputMessageDTO.setApiMessageDataDTO(apiMessageDataDTOList);
        }
        return apiOutputMessageDTO;
    }
    public void saveMessage(ApiInputMessageDTO apiSendMsgDTO, KafkaDTO kafkaDTO){
        Message message=new Message();
        if(Objects.nonNull(kafkaDTO.getMessageTopic().getTopic())&&Objects.equals(kafkaDTO.getMessageTopic().getTopic(),"email")){
        }else if(Objects.nonNull(kafkaDTO.getMessageTopic().getTopic())&&Objects.equals(kafkaDTO.getMessageTopic().getTopic(),"notice")){

        }else{
            message.setDataProcess(apiSendMsgDTO.getMessageContent());
        }
        message.setTitle(apiSendMsgDTO.getTitle());
        message.setReadStatus(0);
        message.setProjectName(apiSendMsgDTO.getProject());
        if(Objects.nonNull(apiSendMsgDTO.getMessageContent())) {
            message.setMessageContent(apiSendMsgDTO.getMessageContent());
        }else{
            message.setMessageContent("");
        }
        message.setMessageHtml(apiSendMsgDTO.getMessageHtml());
        message.setMessageTopic(kafkaDTO.getMessageTopic().getTopic());
        message.setSubTopic(kafkaDTO.getMessageTopic().getSubTopic());
        message.setCreateUsername(apiSendMsgDTO.getCreateUsername());
        message.setCreateCname(apiSendMsgDTO.getCreateCname());
        message.setCreatedTime(new Date());
        message.setBusinessUid(apiSendMsgDTO.getBusinessUid());
        message.setBusinessType(apiSendMsgDTO.getBusinessType());
        message.setGeneralIdentification(apiSendMsgDTO.getGeneralIdentification());
        messageMapper.insert(message);
        if (apiSendMsgDTO.getApiUserDTOList() != null && apiSendMsgDTO.getApiUserDTOList().size() != 0) {
            for (ApiUserDTO apiUserDTOS : apiSendMsgDTO.getApiUserDTOList()) {
                MessageReceiver messageReceiver = new MessageReceiver();
                messageReceiver.setMessageId(message.getId());
                messageReceiver.setReceiverUsername(apiUserDTOS.getReceiverUsername());
                messageReceiver.setHandleState(apiUserDTOS.getHandleState());
                messageReceiver.setReadState(apiUserDTOS.getReadState());
                messageReceiver.setReadTime(LocalDateTime.now());
                messageReceiver.setHandleTime(LocalDateTime.now());
                messageReceiverJpa.save(messageReceiver);
            }
        }
    }

    /*************************************************************************************
     * Description:封装消息传入dto至project、messageReceiver、message对象类
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    @Override
    @Transactional
    public void convertApiSendMsgDTO(ApiInputMessageDTO apiSendMsgDTO){
        Message message = new Message();
            Project project = new Project();
            Integer projectIdByProject = projectJpa.getProjectIdByProject(apiSendMsgDTO.getProject());
            if (projectIdByProject == null) {
                project.setProject(apiSendMsgDTO.getProject());
                Project project1 = projectJpa.save(project);
                projectIdByProject = project1.getId();
            }
            Integer id = null;
            if (id == null) {
                message.setProject(projectIdByProject);
                message.setMessageContent(apiSendMsgDTO.getMessageContent());
                message.setMessageHtml(apiSendMsgDTO.getMessageHtml());
                message.setMessageTopic(apiSendMsgDTO.getTopic());
                message.setCreateUsername(apiSendMsgDTO.getCreateUsername());
                message.setCreateCname(apiSendMsgDTO.getCreateCname());
                message.setReadStatus(0);
                message.setCreatedTime(apiSendMsgDTO.getDate());
                messageJpa.save(message);
                if (apiSendMsgDTO.getApiUserDTOList() != null && apiSendMsgDTO.getApiUserDTOList().size() != 0) {
                    for (ApiUserDTO apiUserDTOS : apiSendMsgDTO.getApiUserDTOList()) {
                        MessageReceiver messageReceiver = new MessageReceiver();
                        messageReceiver.setMessageId(message.getId());
                        messageReceiver.setReceiverUsername(apiUserDTOS.getReceiverUsername());
                        messageReceiverJpa.save(messageReceiver);
                    }
                }
            } else {
                if (apiSendMsgDTO.getApiUserDTOList() != null && apiSendMsgDTO.getApiUserDTOList().size() != 0) {
                    for (ApiUserDTO apiUserDTOS : apiSendMsgDTO.getApiUserDTOList()) {
                        MessageReceiver messageReceiver = new MessageReceiver();
                        messageReceiver.setMessageId(id);
                        messageReceiver.setReceiverUsername(apiUserDTOS.getReceiverUsername());
                        messageReceiverJpa.save(messageReceiver);
                    }
                }
            }
//        }

        //messageReceiverJPA.save(messageReceiver);
        System.out.println("-------------保存消息结束-------------");
    }
}
