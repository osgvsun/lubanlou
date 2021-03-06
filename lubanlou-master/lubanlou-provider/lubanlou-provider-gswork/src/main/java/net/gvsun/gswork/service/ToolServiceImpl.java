package net.gvsun.gswork.service;

import com.alibaba.fastjson.JSON;
import net.gvsun.common.KafkaDTO;
import net.gvsun.common.MessageTopic;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.gswork.domain.TAssignment;
import net.gvsun.gswork.domain.TCourseSite;
import net.gvsun.gswork.domain.User;
import net.gvsun.gswork.jpa.TAssignmentJPA;
import net.gvsun.gswork.jpa.TCourseSiteJPA;
import net.gvsun.gswork.jpa.UserJPA;
import net.gvsun.gswork.service.common.ShareService;
import net.gvsun.gswork.util.EmptyUtil;
import net.gvsun.gswork.vo.common.UserInfoDTO;
import net.gvsun.gswork.vo.common.UserVo;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.gvsun.message.external.TeacherEvaluationDTO;
import net.gvsun.usercenter.internal.UserDetailDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ToolServiceImpl implements ToolService {
    @Autowired
    private UsercenterFeign usercenterFeign;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private ShareService shareService;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TAssignmentJPA tAssignmentJPA;

    @Override
    public List<UserInfoDTO> getUserListInfo(String usernames) {
        List<UserDetailDto> list = usercenterFeign.getBasicInfo(usernames).getData();
        List<UserInfoDTO> userList = new ArrayList<>();
        list.forEach(userDetailDto -> {
            UserInfoDTO dto = new UserInfoDTO();
            BeanUtils.copyProperties(userDetailDto,dto);
            userList.add(dto);
        });
        return userList;
    }

    @Override
    public void sendMessage(Integer siteId,Integer assignmentId,String sender, String receiver, String content, String[] topic, String telephone, String email) {
        //?????????
        TCourseSite one = tCourseSiteJPA.getOne(siteId);
        String title = one.getTitle();
        TAssignment assignment = tAssignmentJPA.getOne(assignmentId);
        String assignmentTitle = assignment.getTitle();
        //?????????????????????????????????
        UserVo currUser = shareService.getUserByUsername(sender);
        //?????????????????????
        User user = userJPA.getOne(receiver);
        //?????????
        if(Arrays.asList(topic).contains("sms")){
            TeacherEvaluationDTO teacherEvaluationDTO = new TeacherEvaluationDTO();
            teacherEvaluationDTO.setName(currUser.getCname());
            teacherEvaluationDTO.setContent(content);
            String smsData = JSON.toJSONString(teacherEvaluationDTO);
            sendSms(currUser,receiver,smsData,MessageTopic.SEND_COMMON_SMS_TEACHER_EVALUATION,telephone);
        }
        //????????????
        if(Arrays.asList(topic).contains("email")){
            String emailData = "???????????????"+user.getCname()+"???????????????"+currUser.getCname()+"??????????????????"+title+"??????"+assignmentTitle+"?????????????????????"+content+"?????????????????????????????????";
            sendEmail(currUser,receiver,emailData,email);
        }
    }

    @Override
    public void sendSms(UserVo sender, String username, String data, MessageTopic topic,String telephone) {
        //?????????????????????
        String[] split = username.split(",");
        //??????????????????????????????dto
        List<ApiUserDTO> apiUserDTOS = new ArrayList();
        for (String s : split) {
            ApiUserDTO apiUserDTO = new ApiUserDTO();
            User one = userJPA.getOne(s);
            apiUserDTO.setReceiverUsername(one.getUsername());
            apiUserDTO.setReceiverCname(one.getCname());
            apiUserDTO.setReceiver(EmptyUtil.isEmpty(telephone)?one.getTelephone():telephone);
            apiUserDTOS.add(apiUserDTO);
        }
        ApiInputMessageDTO apiInputMessageDTO = new ApiInputMessageDTO();
        apiInputMessageDTO.setMessageContent(data);
        apiInputMessageDTO.setCreateUsername(sender.getUsername());
        apiInputMessageDTO.setCreateCname(sender.getCname());
        apiInputMessageDTO.setApiUserDTOList(apiUserDTOS);
        KafkaDTO kafkaDTO = new KafkaDTO();
        String s = JSON.toJSONString(apiInputMessageDTO);
        kafkaDTO.setData(s);
        kafkaDTO.setMessageTopic(topic);
        kafkaDTO.setDataSource(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        shareService.sendMessageNew(kafkaDTO);
    }

    @Override
    public void sendEmail(UserVo sender, String username, String data,String email) {
        //?????????????????????
        String[] split = username.split(",");
        //??????????????????????????????dto
        List<ApiUserDTO> apiUserDTOS = new ArrayList();
        for (String s : split) {
            ApiUserDTO apiUserDTO = new ApiUserDTO();
            User one = userJPA.getOne(s);
            apiUserDTO.setReceiverUsername(one.getUsername());
            apiUserDTO.setReceiverCname(one.getCname());
            apiUserDTO.setReceiver(EmptyUtil.isEmpty(email)?one.getEmail():email);
            apiUserDTOS.add(apiUserDTO);
        }
        // ????????????
        ApiInputMessageDTO apiInputMessageDTO = new ApiInputMessageDTO();
        apiInputMessageDTO.setProject("???????????????");
        apiInputMessageDTO.setMessageContent(data);
        apiInputMessageDTO.setCreateUsername(sender.getUsername());
        apiInputMessageDTO.setCreateCname(sender.getCname());
        apiInputMessageDTO.setApiUserDTOList(apiUserDTOS);

        KafkaDTO kafkaDTO = new KafkaDTO();
        String s = JSON.toJSONString(apiInputMessageDTO);
        kafkaDTO.setData(s);
        kafkaDTO.setMessageTopic(MessageTopic.SEND_COMMON_EMAIL_NOTICE);
        kafkaDTO.setDataSource(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        shareService.sendMessageNew(kafkaDTO);
    }
}
