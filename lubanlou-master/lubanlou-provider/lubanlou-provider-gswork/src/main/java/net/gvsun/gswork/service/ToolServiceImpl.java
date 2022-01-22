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
        //发邮件
        TCourseSite one = tCourseSiteJPA.getOne(siteId);
        String title = one.getTitle();
        TAssignment assignment = tAssignmentJPA.getOne(assignmentId);
        String assignmentTitle = assignment.getTitle();
        //当前用户（发送消息方）
        UserVo currUser = shareService.getUserByUsername(sender);
        //接收消息方用户
        User user = userJPA.getOne(receiver);
        //发短信
        if(Arrays.asList(topic).contains("sms")){
            TeacherEvaluationDTO teacherEvaluationDTO = new TeacherEvaluationDTO();
            teacherEvaluationDTO.setName(currUser.getCname());
            teacherEvaluationDTO.setContent(content);
            String smsData = JSON.toJSONString(teacherEvaluationDTO);
            sendSms(currUser,receiver,smsData,MessageTopic.SEND_COMMON_SMS_TEACHER_EVALUATION,telephone);
        }
        //发送邮件
        if(Arrays.asList(topic).contains("email")){
            String emailData = "【鲁班楼】"+user.getCname()+"您好，来自"+currUser.getCname()+"教师的信息："+title+"课程"+assignmentTitle+"作业评价信息为"+content+"，请及时登录平台查看！";
            sendEmail(currUser,receiver,emailData,email);
        }
    }

    @Override
    public void sendSms(UserVo sender, String username, String data, MessageTopic topic,String telephone) {
        //接收消息方用户
        String[] split = username.split(",");
        //设置短信消息接收用户dto
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
        //接收消息方用户
        String[] split = username.split(",");
        //设置短信消息接收用户dto
        List<ApiUserDTO> apiUserDTOS = new ArrayList();
        for (String s : split) {
            ApiUserDTO apiUserDTO = new ApiUserDTO();
            User one = userJPA.getOne(s);
            apiUserDTO.setReceiverUsername(one.getUsername());
            apiUserDTO.setReceiverCname(one.getCname());
            apiUserDTO.setReceiver(EmptyUtil.isEmpty(email)?one.getEmail():email);
            apiUserDTOS.add(apiUserDTO);
        }
        // 封装消息
        ApiInputMessageDTO apiInputMessageDTO = new ApiInputMessageDTO();
        apiInputMessageDTO.setProject("教学公告栏");
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
