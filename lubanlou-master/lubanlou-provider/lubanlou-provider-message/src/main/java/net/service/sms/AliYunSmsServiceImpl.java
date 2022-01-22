package net.service.sms;

import com.alibaba.fastjson.JSON;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.domain.Project;
import net.gvsun.common.KafkaDTO;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.message.external.*;
import net.gvsun.usercenter.internal.ResultDataDto;
import net.gvsun.usercenter.internal.UserDetailDto;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.codehaus.xfire.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service("AliYunSmsService")
public class AliYunSmsServiceImpl implements AliYunSmsService {
    @Autowired
    private UsercenterFeign usercenterFeign;
    public  String sendSmsAboutConfigCenterFill(ApiInputMessageDTO apiInputMessageDTO) throws Exception {
        ReviewNoticeDTO reviewNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), ReviewNoticeDTO.class);
        ObjectMapper objectMapper = new ObjectMapper();
        Integer size = apiInputMessageDTO.getApiUserDTOList().size();
        Integer count = size / 100;
        Integer remian = size % 100;
        if (remian != 0) {
            count++;
        }
        // String[] phones=new String[size];
        List<String> phones = new ArrayList<>();
        List<Map> list = new ArrayList<>();
        List<Map> temp = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            phones.add(apiInputMessageDTO.getApiUserDTOList().get(i).getReceiver());
            Map map = new HashMap();
            map.put("Name", apiInputMessageDTO.getApiUserDTOList().get(i).getReceiverCname());
            map.put("datetime", reviewNoticeDTO.getDatetime());
            map.put("type", reviewNoticeDTO.getType());
            list.add(map);
        }
        for (int k = 0; k < count; k++) {
            String str1 = "";
            Integer str = 0;
            if (k == count - 1) {
                // String[] as= Arrays.copyOfRange(phones,k*100 ,phones.length);
                phoneList = phones.subList(k * 100, list.size());
                temp = list.subList(k * 100, list.size());
                str = phoneList.size();
                // str1 = StringUtils.join(as, ",");
            } else {
                phoneList = phones.subList(k * 100, (k + 1) * 100);
                //String[] strings = Arrays.copyOfRange(phones, k * 100, (k + 1) * 100);
                temp = list.subList(k * 100, (k + 1) * 100);

                str = phoneList.size();
                //  str1 = StringUtils.join(strings, ",");
            }
            //String[] signNameJson=new String[str];
            List<String> signNameJson = new ArrayList<>();
            String name = "鲁班楼";
            for (int i = 0; i < str; i++) {
                signNameJson.add(name);
            }
            //Arrays.fill(signNameJson,"庚商鲁班楼");
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);

            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendBatchSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumberJson", objectMapper.writeValueAsString(phoneList));
            request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
            request.putQueryParameter("TemplateCode", "SMS_217416159");
            request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "success";
    }
    public  String sendSmsAboutTeacherEvaluation(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        TeacherEvaluationDTO teacherEvaluationDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), TeacherEvaluationDTO.class);
        ObjectMapper objectMapper = new ObjectMapper();
        String phones = "";
        for (ApiUserDTO apiUserDTO : apiInputMessageDTO.getApiUserDTOList()) {
            phones += apiUserDTO.getReceiver() + ",";
        }
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("dysmsapi.aliyuncs.com");
        request.setSysVersion("2017-05-25");
        request.setSysAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("PhoneNumbers", phones);
        request.putQueryParameter("SignName", "鲁班楼");
        request.putQueryParameter("TemplateCode","SMS_186947491");
        request.putQueryParameter("TemplateParam", String.format("{\"name\":\"%s\",\"content\":\"%s\"}", teacherEvaluationDTO.getName(), teacherEvaluationDTO.getContent()));
        CommonResponse response = client.getCommonResponse(request);
        int status = response.getHttpStatus();
        System.out.println("====短信结果==" + status);
        return "success";
    }
    public  String sendSmsAboutPlatFormNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        PlatFormNoticeDTO platFormNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), PlatFormNoticeDTO.class);
        ObjectMapper objectMapper = new ObjectMapper();
        Integer size = apiInputMessageDTO.getApiUserDTOList().size();
        Integer count = size / 100;
        Integer remian = size % 100;
        if (remian != 0) {
            count++;
        }
        // String[] phones=new String[size];
        List<String> phones = new ArrayList<>();
        List<Map> list = new ArrayList<>();
        List<Map> temp = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            phones.add(apiInputMessageDTO.getApiUserDTOList().get(i).getReceiver());
            Map map = new HashMap();
            map.put("name", apiInputMessageDTO.getApiUserDTOList().get(i).getReceiverCname());
            map.put("siteName", platFormNoticeDTO.getSiteName());
            map.put("title", platFormNoticeDTO.getTitle());
            list.add(map);
        }
        for (int k = 0; k < count; k++) {
            String str1 = "";
            Integer str = 0;
            if (k == count - 1) {
                // String[] as= Arrays.copyOfRange(phones,k*100 ,phones.length);
                phoneList = phones.subList(k * 100, list.size());
                temp = list.subList(k * 100, list.size());
                str = phoneList.size();
                // str1 = StringUtils.join(as, ",");
            } else {
                phoneList = phones.subList(k * 100, (k + 1) * 100);
                //String[] strings = Arrays.copyOfRange(phones, k * 100, (k + 1) * 100);
                temp = list.subList(k * 100, (k + 1) * 100);

                str = phoneList.size();
                //  str1 = StringUtils.join(strings, ",");
            }
            //String[] signNameJson=new String[str];
            List<String> signNameJson = new ArrayList<>();
            String name = "鲁班楼";
            for (int i = 0; i < str; i++) {
                signNameJson.add(name);
            }
            //Arrays.fill(signNameJson,"庚商鲁班楼");
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);

            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendBatchSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumberJson", objectMapper.writeValueAsString(phoneList));
            request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
            request.putQueryParameter("TemplateCode", "SMS_190793933");
            request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "success";
    }
    public  String sendSmsAboutReviewNotice(ApiInputMessageDTO apiInputMessageDTO)  throws Exception{
        ReviewNoticeDTO reviewNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), ReviewNoticeDTO.class);
        ObjectMapper objectMapper = new ObjectMapper();
        Integer size = apiInputMessageDTO.getApiUserDTOList().size();
        Integer count = size / 100;
        Integer remian = size % 100;
        if (remian != 0) {
            count++;
        }
        // String[] phones=new String[size];
        List<String> phones = new ArrayList<>();
        List<Map> list = new ArrayList<>();
        List<Map> temp = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            phones.add(apiInputMessageDTO.getApiUserDTOList().get(i).getReceiver());
            Map map = new HashMap();
            map.put("Name", apiInputMessageDTO.getApiUserDTOList().get(i).getReceiverCname());
            map.put("datetime", reviewNoticeDTO.getDatetime());
            map.put("type", reviewNoticeDTO.getType());
            list.add(map);
        }
        for (int k = 0; k < count; k++) {
            String str1 = "";
            Integer str = 0;
            if (k == count - 1) {
                // String[] as= Arrays.copyOfRange(phones,k*100 ,phones.length);
                phoneList = phones.subList(k * 100, list.size());
                temp = list.subList(k * 100, list.size());
                str = phoneList.size();
                // str1 = StringUtils.join(as, ",");
            } else {
                phoneList = phones.subList(k * 100, (k + 1) * 100);
                //String[] strings = Arrays.copyOfRange(phones, k * 100, (k + 1) * 100);
                temp = list.subList(k * 100, (k + 1) * 100);

                str = phoneList.size();
                //  str1 = StringUtils.join(strings, ",");
            }
            //String[] signNameJson=new String[str];
            List<String> signNameJson = new ArrayList<>();
            String name = "鲁班楼";
            for (int i = 0; i < str; i++) {
                signNameJson.add(name);
            }
            //Arrays.fill(signNameJson,"庚商鲁班楼");
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);

            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendBatchSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumberJson", objectMapper.writeValueAsString(phoneList));
            request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
            request.putQueryParameter("TemplateCode","SMS_217436199");
            request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);

        }
        return "success";

    }
    public  String sendSmsAboutAuditResult(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
        AuditResultDTO auditNoticeDTO = JSON.parseObject(apiSendMsgDTO.getMessageContent(), AuditResultDTO.class);

        Integer size = apiSendMsgDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 100;
        Integer remian = size % 100;
        if (remian != 0) {
            count++;
        }
        // String[] phones=new String[size];
        List<String> phones = new ArrayList<>();
        List<Map> list = new ArrayList<>();
        List<Map> temp = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            phones.add(apiSendMsgDTO.getApiUserDTOList().get(i).getReceiver());
            Map map = new HashMap();
            map.put("username", apiSendMsgDTO.getApiUserDTOList().get(i).getReceiverCname());
            map.put("platname",auditNoticeDTO.getPlatname());
            map.put("type", auditNoticeDTO.getType());
            map.put("audit", auditNoticeDTO.getAudit() + "(" + apiSendMsgDTO.getCreateCname() + ")");
            list.add(map);
        }
        for (int k = 0; k < count; k++) {
            String str1 = "";
            Integer str = 0;
            if (k == count - 1) {
                // String[] as= Arrays.copyOfRange(phones,k*100 ,phones.length);
                phoneList = phones.subList(k * 100, list.size());
                temp = list.subList(k * 100, list.size());
                str = phoneList.size();
                // str1 = StringUtils.join(as, ",");
            } else {
                phoneList = phones.subList(k * 100, (k + 1) * 100);
                //String[] strings = Arrays.copyOfRange(phones, k * 100, (k + 1) * 100);
                temp = list.subList(k * 100, (k + 1) * 100);

                str = phoneList.size();
                //  str1 = StringUtils.join(strings, ",");
            }
            //String[] signNameJson=new String[str];
            List<String> signNameJson = new ArrayList<>();
            String name = "鲁班楼";
            for (int i = 0; i < str; i++) {
                signNameJson.add(name);
            }
            //Arrays.fill(signNameJson,"庚商鲁班楼");
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);

            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendBatchSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumberJson", objectMapper.writeValueAsString(phoneList));
            request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
            request.putQueryParameter("TemplateCode", "SMS_202548184");
            request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    private static String getSHA(String password) throws Exception{
        MessageDigest sha = MessageDigest.getInstance("SHA");
        sha.update(password.getBytes());
        byte[] hash = sha.digest();
        return new String(Base64.encodeBase64(hash));

    }

    public  String sendSmsAboutHuazhongkeji(TestDTO kafkaDTO) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,Object> map = new HashMap<String,Object>();


        ApplicationContext appContext = new ClassPathXmlApplicationContext(new String[] {});
        //webservice地址由正式环境决定
        org.springframework.core.io.Resource resource = appContext.getResource("url:http://ucs.hust.edu.cn/service/SmsService?wsdl");
        //获取时间
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //授权处理，需要在平台端，系统管理-权限项管理中设置
        //秘钥，必须
        map.put("secret_key", getSHA(kafkaDTO.getSecretKey()));
        //对应的第三方系统名称（协议值），必须
        map.put("tp_name", kafkaDTO.getTpName());
        //对应的模块名称（协议值），必须
        map.put("module_id", kafkaDTO.getModuleId());
        //对应的平台系统名称（协议值），必须
        map.put("sys_id", kafkaDTO.getSysId());
        //对应的接口方法名称（协议值），必须
        map.put("interface_method", kafkaDTO.getInterfaceMethod());

        //参数列表
        //接收人信息,每个人员信息格式为： 名字|学工号|部门ID|部门名称|电话号码，人与人之间用“^@^”隔开（如果数据无法提供，可以写空，但是“|”不可省略），必须
        map.put("person_info", kafkaDTO.getPersonInfo());
        //短信内容，必须
        map.put("sms_info", kafkaDTO.getSmsInfo());
        //发送优先级（1：紧急通知；2：验证码；3：立即发送；4：发送），必须
        map.put("send_priority",kafkaDTO.getSendPriority());
        //发送时间，String型，可为空，参数不可省略
        map.put("send_time", kafkaDTO.getSendTime());
        //发送人UID，发送模板的时候不可为空，参数不可省略
        map.put("operator_id", kafkaDTO.getOperatorId());
        //发送人ID_NUMBER，需要发送回执的时候不可为空，其他可为空，参数不可省略
        map.put("operator_id_number", kafkaDTO.getOperatorIdNumber());
        //发送人姓名，可为空，参数不可省略
        map.put("operator_name", kafkaDTO.getOperatorName());
        //发送人部门ID，不可为空，参数不可省略，有关于短信的配额问题
        map.put("operator_unit_id", kafkaDTO.getOperatorUnitId());
        //发送人部门姓名，可为空，参数不可省略
        map.put("operator_unit_name", kafkaDTO.getOperatorUnitName());
        //发送模板选择，不发送模板值为”0”，参数不可省略
        map.put("templet_id", kafkaDTO.getTempletId());
        //发送回执选择，不发送模板值为”0”，参数不可省略
        map.put("receipt_id", kafkaDTO.getReceiptId());
        //发送人签名，根据模板而定，选择的模板有“发送人签名”标签的需要写值，其他为空，参数不可省略
        map.put("person_send", kafkaDTO.getPersonSend());
        //发送平台码，必须
        map.put("send_sys_id", kafkaDTO.getSendSysId());
        //发送平台名称，必须
        map.put("send_sys_name", kafkaDTO.getSendSysName());
        //发送使用的浏览器，可为空，参数不可省略
        map.put("user_browser", kafkaDTO.getUserBrowser());
        //转化
        String json = objectMapper.writeValueAsString(map);

        System.out.println("json:=============输出"+json);
        //调用
        org.codehaus.xfire.client.Client client = new Client(resource.getInputStream(), null);
        //输出结果 boolean型，true代表推送成功，false为失败
        Object[] result = client.invoke("saveSmsInfo", new Object[]{json});
        System.out.println(result[0]);

        client.close();

        return "";
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
    public  String sendSmsAboutZjcclims(KafkaDTO kafkaDTO) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        ApiInputMessageDTO apiInputMessageDTO = JSON.parseObject(kafkaDTO.getData(),ApiInputMessageDTO.class);
        String content="";
        if(Objects.equals(kafkaDTO.getMessageTopic().getSubTopic(),"audit_notice")){
            AuditNoticeDTO auditNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), AuditNoticeDTO.class);

            content="您好,请审核"+auditNoticeDTO.getName()+"的"+auditNoticeDTO.getType()+"申请";
        }else {
            AuditResultDTO auditNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), AuditResultDTO.class);

            content = "您好,您在" + auditNoticeDTO.getPlatname() + "系统的" + auditNoticeDTO.getType() + "申请，审核结果为"+auditNoticeDTO.getAudit() + "(" + apiInputMessageDTO.getCreateCname() + ")。详情请进系统查看。";
        }
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");//设置日期格式
        int date=Integer.parseInt(df.format(new Date()));
        int result1=41684644&date;
        String str1=String.valueOf(result1);
        String str=str1.substring(str1.length()-6,str1.length());
        MessageDigest md;
        md=MessageDigest.getInstance("MD5");
        byte[] str_byte = str.getBytes();
        byte[] md5_result_byte = md.digest(str_byte);
        String md5_result = bytesToHex(md5_result_byte).toLowerCase();
        String time=Long.toString(System.currentTimeMillis());
        String tel="";
        String sendMobiles="";

        for (int i=0;i<apiInputMessageDTO.getApiUserDTOList().size();i++) {
            sendMobiles+="057785435709"+"|";
            tel+=apiInputMessageDTO.getApiUserDTOList().get(i).getReceiver()+"|";
        }
        // http://{阿里云SMS}:8888/MsgService/SiServer
        HttpPost httpPost = new HttpPost("http://localhost:8888/MsgService/SiServer");
        httpPost.setHeader("Accept-Charset","GBK");
        httpPost.setHeader("Content-Type","application/x-www-form-urlencoded");
        List<NameValuePair> paramList = new ArrayList<>();
        paramList.add(new BasicNameValuePair("loginName", "JSZY"));
        paramList.add(new BasicNameValuePair("loginPWD", md5_result));
        paramList.add(new BasicNameValuePair("siID", "1221212"));
        paramList.add(new BasicNameValuePair("area", "0913"));
        paramList.add(new BasicNameValuePair("mobiles", tel));
        paramList.add(new BasicNameValuePair("content",  content));
        paramList.add(new BasicNameValuePair("sendMobiles", sendMobiles));
        paramList.add(new BasicNameValuePair("postTime", time));
        // 模拟表单
        UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList, "GBK");
        httpPost.setEntity(entity);

        // 执行http请求
        response = httpClient.execute(httpPost);
        String resultString = EntityUtils.toString(response.getEntity(), "utf-8");
        System.out.println("短信结果======="+resultString);
        return "";
    }
    public  String sendSmsAboutAuditCompleteNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        Integer size = apiInputMessageDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 1000;
        Integer remian = size % 1000;
        if (remian != 0) {
            count++;
        }
        List<String> phones = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int k = 0; k < count; k++) {
            if (k == count - 1) {
                phoneList = phones.subList(k * 1000, size);
            } else {
                phoneList = phones.subList(k * 1000, (k + 1) * 1000);
            }
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumbers",phoneList.stream().collect(Collectors.joining(",")));
            request.putQueryParameter("SignName","鲁班楼");
            request.putQueryParameter("TemplateCode","SMS_204125381");
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    public  String sendSmsAboutAuditNotice(ApiInputMessageDTO apiSendMsgDTO) throws Exception{
        AuditNoticeDTO auditNoticeDTO = JSON.parseObject(apiSendMsgDTO.getMessageContent(), AuditNoticeDTO.class);

        Integer size = apiSendMsgDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 100;
        Integer remian = size % 100;
        if (remian != 0) {
            count++;
        }
        // String[] phones=new String[size];
        List<String> phones = new ArrayList<>();
        List<Map> list = new ArrayList<>();
        List<Map> temp = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            phones.add(apiSendMsgDTO.getApiUserDTOList().get(i).getReceiver());
            Map map = new HashMap();
            map.put("username", apiSendMsgDTO.getApiUserDTOList().get(i).getReceiverCname());
            map.put("name",auditNoticeDTO.getName());
            map.put("type", auditNoticeDTO.getType());
            map.put("infos", auditNoticeDTO.getInfos());
            list.add(map);
        }
        for (int k = 0; k < count; k++) {
            String str1 = "";
            Integer str = 0;
            if (k == count - 1) {
                // String[] as= Arrays.copyOfRange(phones,k*100 ,phones.length);
                phoneList = phones.subList(k * 100, list.size());
                temp = list.subList(k * 100, list.size());
                str = phoneList.size();
                // str1 = StringUtils.join(as, ",");
            } else {
                phoneList = phones.subList(k * 100, (k + 1) * 100);
                //String[] strings = Arrays.copyOfRange(phones, k * 100, (k + 1) * 100);
                temp = list.subList(k * 100, (k + 1) * 100);

                str = phoneList.size();
                //  str1 = StringUtils.join(strings, ",");
            }
            //String[] signNameJson=new String[str];
            List<String> signNameJson = new ArrayList<>();
            String name = "鲁班楼";
            for (int i = 0; i < str; i++) {
                signNameJson.add(name);
            }
            //Arrays.fill(signNameJson,"庚商鲁班楼");
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);

            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendBatchSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumberJson", objectMapper.writeValueAsString(phoneList));
            request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
            request.putQueryParameter("TemplateCode","SMS_196615873");
            request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    public  String sendSmsAboutNewStudentNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        NewStudentNoticeDTO newStudentNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), NewStudentNoticeDTO.class);

        Integer size =apiInputMessageDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 1000;
        Integer remian = size % 1000;
        if (remian != 0) {
            count++;
        }
        List<String> phones = new ArrayList<>();
        List<ApiUserDTO> list=new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int k = 0; k < count; k++) {
            if (k == count - 1) {
              list= apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, size);
                //组装参数
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            } else {
                list=apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, (k + 1) * 1000);
                //组装参数
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            }
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumbers",phoneList.stream().collect(Collectors.joining(",")));
            request.putQueryParameter("SignName","鲁班楼");
            request.putQueryParameter("TemplateCode","SMS_230640028");
            request.putQueryParameter("TemplateParam", String.format("{\"cname\":\"%s\",\"studentName\":\"%s\",\"url\":\"%s\"}", newStudentNoticeDTO.getCname(), newStudentNoticeDTO.getStudentName(),newStudentNoticeDTO.getUrl()));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    public  String sendSmsAboutDeselectionTutorNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        DeselectionTutorNoticeDTO deselectionTutorNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), DeselectionTutorNoticeDTO.class);



        Integer size = apiInputMessageDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 1000;
        Integer remian = size % 1000;
        if (remian != 0) {
            count++;
        }
        List<String> phones = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        List<ApiUserDTO> list = new ArrayList<>();
        for (int k = 0; k < count; k++) {
            if (k == count - 1) {
                list= apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, size);
                //组装参数
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            } else {
                list= apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, (k + 1) * 1000);
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            }
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumbers",phoneList.stream().collect(Collectors.joining(",")));
            request.putQueryParameter("SignName","鲁班楼");
            request.putQueryParameter("TemplateCode","SMS_230640019");
            request.putQueryParameter("TemplateParam", String.format("{\"type\":\"%s\",\"username\":\"%s\",\"url\":\"%s\"}", deselectionTutorNoticeDTO.getType(), deselectionTutorNoticeDTO.getUsername(),deselectionTutorNoticeDTO.getUrl()));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    public  String sendSmsAboutTutorChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        DeselectionTutorNoticeDTO deselectionTutorNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), DeselectionTutorNoticeDTO.class);

        Integer size =apiInputMessageDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 1000;
        Integer remian = size % 1000;
        if (remian != 0) {
            count++;
        }
        List<String> phones = new ArrayList<>();
        List<ApiUserDTO> list = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int k = 0; k < count; k++) {
            if (k == count - 1) {
                list =apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, size);
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            } else {
                list = apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, (k + 1) * 1000);
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            }
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumbers",phoneList.stream().collect(Collectors.joining(",")));
            request.putQueryParameter("SignName","鲁班楼");
            request.putQueryParameter("TemplateCode","SMS_230241170");
            request.putQueryParameter("TemplateParam", String.format("{\"type\":\"%s\",\"username\":\"%s\",\"url\":\"%s\"}", deselectionTutorNoticeDTO.getType(), deselectionTutorNoticeDTO.getUsername(),deselectionTutorNoticeDTO.getUrl()));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }
    public  String sendSmsAboutStudentChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception{
        StudentChangeNoticeDTO deselectionTutorNoticeDTO = JSON.parseObject(apiInputMessageDTO.getMessageContent(), StudentChangeNoticeDTO.class);

        Integer size =apiInputMessageDTO.getApiUserDTOList().size();
        ObjectMapper objectMapper=new ObjectMapper();
        Integer count = size / 1000;
        Integer remian = size % 1000;
        if (remian != 0) {
            count++;
        }
        List<String> phones = new ArrayList<>();
        List<ApiUserDTO> list = new ArrayList<>();
        List<String> phoneList = new ArrayList<>();
        for (int k = 0; k < count; k++) {
            if (k == count - 1) {
                list =apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, size);
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            } else {
                list = apiInputMessageDTO.getApiUserDTOList().subList(k * 1000, (k + 1) * 1000);
                phoneList = list.stream().map(ApiUserDTO::getReceiver).collect(Collectors.toList());
            }
            DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4Fjtswr4hANBzas3PPRV", "eHmjxvEo2OtDCrLO66xOQEdfefqKHj");
            IAcsClient client = new DefaultAcsClient(profile);
            CommonRequest request = new CommonRequest();
            request.setSysMethod(MethodType.POST);
            request.setSysDomain("dysmsapi.aliyuncs.com");
            request.setSysVersion("2017-05-25");
            request.setSysAction("SendSms");
            request.putQueryParameter("RegionId", "cn-hangzhou");
            request.putQueryParameter("PhoneNumbers",phoneList.stream().collect(Collectors.joining(",")));
            request.putQueryParameter("SignName","鲁班楼");
            request.putQueryParameter("TemplateCode","SMS_230630123");
            request.putQueryParameter("TemplateParam", String.format("{\"type\":\"%s\",\"studentName\":\"%s\",\"url\":\"%s\"}", deselectionTutorNoticeDTO.getType(), deselectionTutorNoticeDTO.getStudentName(),deselectionTutorNoticeDTO.getUrl()));
            CommonResponse response = client.getCommonResponse(request);
            int status = response.getHttpStatus();
            System.out.println("====短信结果==" + status);
        }
        return "";
    }


}
