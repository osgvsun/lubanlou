package net.gvsun.service;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.oauth2.internal.KafkaMessage;
import net.gvsun.entity.OauthClientDetail;
import net.gvsun.entity.User;
import net.gvsun.entity.UserForDataSource;
import net.gvsun.oauth2.dto.CustomGrantedAuthority;
import net.gvsun.repository.OauthClientDetailRepository;
import net.gvsun.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 用户注册服务
 *
 * @author 陈敬
 * @since 1.3.0-SNAPSHOT
 */
@Slf4j
@Service
public class RegisterService {
    private final PropertiesConfigure propertiesConfigure;
    private final KafkaTemplate kafkaTemplate;
    private final UserDetailService userDetailService;
    private final UserRepository userRepository;
    private final OauthClientDetailRepository oauthClientDetailRepository;
    private final JdbcOperations jdbcOperations;
    private final ClientDatabaseContext clientDatabaseContext;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public RegisterService(PropertiesConfigure propertiesConfigure,
                           KafkaTemplate kafkaTemplate,
                           UserDetailService userDetailService,
                           UserRepository userRepository,
                           OauthClientDetailRepository oauthClientDetailRepository,
                           JdbcOperations jdbcOperations, ClientDatabaseContext clientDatabaseContext) {
        this.propertiesConfigure = propertiesConfigure;
        this.kafkaTemplate = kafkaTemplate;
        this.userDetailService = userDetailService;
        this.userRepository = userRepository;
        this.oauthClientDetailRepository = oauthClientDetailRepository;
        this.jdbcOperations = jdbcOperations;
        this.clientDatabaseContext = clientDatabaseContext;
    }

    /**
     * 发送验证码到指定的手机号
     *
     * @param code     验证码
     * @param phoneNum 手机号
     */
    public static void sendSms(String code, String phoneNum) {
        sendMessage(String.format("{\"code\":\"%s\"}", code), "SMS_183845305", phoneNum);
    }

    /**
     * 发送短信
     *
     * @param TemplateParam 模板参数
     * @param TemplateCode  模板号
     * @param phoneNum      手机号
     */
    private static void sendMessage(String TemplateParam, String TemplateCode, String phoneNum) {
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "accessKeyId", "accessSecret");
        IAcsClient client = new DefaultAcsClient(profile);
        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("dysmsapi.aliyuncs.com");
        request.setSysVersion("2017-05-25");
        request.setSysAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("PhoneNumbers", phoneNum);
        request.putQueryParameter("SignName", "庚商鲁班楼");
        request.putQueryParameter("TemplateCode", TemplateCode);
        if (TemplateParam != null)
            request.putQueryParameter("TemplateParam", TemplateParam);
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response);
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }

    /**
     * 判断手机号类型
     */
    public static INPUT_TYPE isPhone(String phone) {
        String regex = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(16[2,6])|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8,9,5]))\\d{8}$";

        if (phone.startsWith("99")) {
            return INPUT_TYPE.VIRTUAL_PHONE;
        } else if (phone.length() != 11) {
            return INPUT_TYPE.USERNAME;
        } else {
            Pattern p = Pattern.compile(regex);
            Matcher m = p.matcher(phone);
            return m.matches() ? INPUT_TYPE.PHONE : INPUT_TYPE.USERNAME;
        }
    }

    /**
     * 提醒管理员审核注册信息
     *
     * @param username 被审核的用户
     */
    public void sendAudit(String username) {
        User user = userRepository.findByUsername(username);
        //查找管理员
        List<Map<String, String>> usernames = jdbcOperations.query("select username from user_client_authority where client_id = 'GvsunUserCenter' and client_authority_id = 1",
                new RowMapper<Map<String, String>>() {
                    @Override
                    public Map<String, String> mapRow(ResultSet resultSet, int i) throws SQLException {
                        Map<String, String> map = new HashMap<>();
                        map.put("username", resultSet.getString("username"));
                        return map;
                    }
                });
        for (Map<String, String> s : usernames) {
            User admin = userRepository.findByUsername(s.get("username"));
            if (!StringUtils.isEmpty(admin.getPhone())) {
                sendMessage(String.format("{\"username\":\"%s\", \"name\": \"%s\", \"type\": \"注册\", \"infos\":\"%s\"}",
                        admin.getCname(), user.getCname(), clientDatabaseContext.getCurrentDataSourceDto().getSchoolCname() + "新用户注册"), "SMS_196615873", admin.getPhone());
            }
        }
    }

    /**
     * 提醒用户审核已通过
     *
     * @param username 被审核的用户
     * @param pass     通过与否
     */
    public void sendVerified(String username, boolean pass) {
        User user = userRepository.findByUsername(username);
        if (!StringUtils.isEmpty(user.getPhone())) {
            sendMessage(String.format("{\"username\":\"%s\", \"platname\": \"用户中心\", \"type\": \"注册\", \"audit\":\"%s\"}", user.getCname(), pass ? "通过" : "不通过"), "SMS_202548184", user.getPhone());
        }
    }

    /**
     * 向Kafka主题写入消息
     *
     * @param message 向kafka写入的消息
     */
    public void sendDataToTopic(String topic, KafkaMessage message) {
        try {
            String json = objectMapper.writeValueAsString(message);
            System.out.println("kafka发送消息：" + topic + "------>" + json);
            log.info("kafka发送消息:topic={}, json={}", topic, json);
            kafkaTemplate.send(topic, json);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void sendUserInfoToTopic(String clientId, String username, KafkaMessage.MESSAGE_TYPE messageType) {
        sendUserInfoToTopic(clientId, username, messageType, null);
    }

    public void sendUserInfoToTopic(String clientId, String username, KafkaMessage.MESSAGE_TYPE messageType, String collegeId) {
        User user = userRepository.findByUsername(username);
        UserForDataSource userForDataSource = new UserForDataSource();
        System.out.println("sendUserInfoToTopic====>" + ClientDatabaseContextHolder.getClientDatabaseOri());
        userForDataSource.setSchoolName(ClientDatabaseContextHolder.getClientDatabaseOri());
        userForDataSource.setUsername(username);
        userForDataSource.setPassword(user.getPassword());
        userForDataSource.setCname(user.getCname());
        userForDataSource.setEnabled(true);
        userForDataSource.setPhone(user.getPhone());
        userForDataSource.setEmail(user.getEmail());
        List<CustomGrantedAuthority> as = userDetailService.getUserAuthorities(username, clientId);
        userForDataSource.setAuthorities(as);
        if (collegeId != null)
            userForDataSource.setCollegeId(collegeId);

        KafkaMessage kafkaMessage = new KafkaMessage();
        kafkaMessage.setMessageType(messageType);
        kafkaMessage.setData(userForDataSource);
        List<OauthClientDetail> all = null;
        try {
            switch (messageType) {
                case USER_REGISTER:
                    all = oauthClientDetailRepository.findAll();
                    for (OauthClientDetail d : all) {
                        sendDataToTopic(propertiesConfigure.getUserInfoTopic(d.getClientId()), kafkaMessage);
                    }
                    break;
                case AUTHORITY_CHANGED:
                    sendDataToTopic(propertiesConfigure.getUserInfoTopic(clientId), kafkaMessage);
                    break;
                case USER_FORBIDDEN:
                case USER_ENABLE:
                    all = oauthClientDetailRepository.findAll();
                    for (OauthClientDetail d : all) {
                        sendDataToTopic(propertiesConfigure.getUserInfoTopic(d.getClientId()), kafkaMessage);
                    }
                    break;
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }


    public enum INPUT_TYPE {
        PHONE, VIRTUAL_PHONE, USERNAME
    }
}
