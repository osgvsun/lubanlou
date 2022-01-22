package net.service.sms;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.domain.Project;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.gvsun.message.external.CommonDTO;
import net.repository.ProjectJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("SmsTemplateByAliyunServiceImpl")
public class SmsTemplateByAliyunServiceImpl implements SmsService {

    @Autowired
    private ProjectJPA projectJPA;

    @Override
    public String sendSms(ApiInputMessageDTO apiSendMsgDTO) throws Exception {
        Project project = projectJPA.getProjectByProject(apiSendMsgDTO.getProject());
        String result = "";
        ObjectMapper objectMapper = new ObjectMapper();
        if (apiSendMsgDTO.getTopic().equals("SMS_190793933")) {
            Integer size = apiSendMsgDTO.getApiUserDTOList().size();
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
                map.put("name", apiSendMsgDTO.getApiUserDTOList().get(i).getReceiverCname());
                map.put("siteName", apiSendMsgDTO.getProject());
                map.put("title", apiSendMsgDTO.getMessageContent());
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
                request.putQueryParameter("TemplateCode", apiSendMsgDTO.getTopic());
                request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);

            }
        } else if (apiSendMsgDTO.getTopic().equals("SMS_196619478") || apiSendMsgDTO.getTopic().equals("SMS_202548184")) {
            Integer size = apiSendMsgDTO.getApiUserDTOList().size();
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
            JsonNode jsonNode = objectMapper.readTree(apiSendMsgDTO.getMessageContent());
            String type = jsonNode.get("type").asText();
            String auditResult = jsonNode.get("auditResult").asText();
            for (int i = 0; i < size; i++) {
                phones.add(apiSendMsgDTO.getApiUserDTOList().get(i).getReceiver());
                Map map = new HashMap();
                map.put("username", apiSendMsgDTO.getApiUserDTOList().get(i).getReceiverCname());
                map.put("platname",project.getProjectName());
                map.put("type", type);
                map.put("audit", auditResult + "(" + apiSendMsgDTO.getCreateCname() + ")");
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
                request.putQueryParameter("TemplateCode", apiSendMsgDTO.getTopic());
                request.putQueryParameter("TemplateParamJson", objectMapper.writeValueAsString(temp));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);

            }


        } else if (apiSendMsgDTO.getTopic().equals("SMS_196615873")) {
            Integer size=apiSendMsgDTO.getApiUserDTOList().size();
            Integer count=size/100;
            Integer remian=size%100;
            if(remian!=0){
                count++;
            }
            // String[] phones=new String[size];
            List<String> phones=new ArrayList<>();
            List<Map> list=new ArrayList<>();
            List<Map> temp=new ArrayList<>();
            List<String> phoneList=new ArrayList<>();
            JsonNode jsonNode = objectMapper.readTree(apiSendMsgDTO.getMessageContent());
            String type=jsonNode.get("type").asText();
            String infos=jsonNode.get("infos").asText();
            for(int i=0;i<size;i++) {
                phones.add(apiSendMsgDTO.getApiUserDTOList().get(i).getReceiver());
                Map map=new HashMap();
                map.put("username",apiSendMsgDTO.getApiUserDTOList().get(i).getReceiverCname());
                map.put("name",apiSendMsgDTO.getCreateCname());
                map.put("type",type);
                map.put("infos",infos);
                list.add(map);
            }
            for (int k=0;k<count;k++) {
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
                List<String> signNameJson=new ArrayList<>();
                String name="鲁班楼";
                for (int i=0;i<str;i++) {
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
                request.putQueryParameter("PhoneNumberJson",objectMapper.writeValueAsString(phoneList));
                request.putQueryParameter("SignNameJson", objectMapper.writeValueAsString(signNameJson));
                request.putQueryParameter("TemplateCode", apiSendMsgDTO.getTopic());
                request.putQueryParameter("TemplateParamJson",objectMapper.writeValueAsString(temp));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);

            }


        } else {
            List<CommonDTO> mapList = new ArrayList<>();
            System.out.println("----------进入发送消息队列--------------");
            String phones = "";
            for (ApiUserDTO apiUserDTO : apiSendMsgDTO.getApiUserDTOList()) {
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
            request.putQueryParameter("TemplateCode", apiSendMsgDTO.getTopic());
            if(apiSendMsgDTO.getTopic().equals("SMS_190784756")) {
                JsonNode jsonNode = objectMapper.readTree(apiSendMsgDTO.getMessageContent());
                String datetime = jsonNode.get("datetime").asText();
                String title = jsonNode.get("title").asText();
                String address = jsonNode.get("address").asText();
                request.putQueryParameter("TemplateParam", String.format("{\"Name\":\"%s\",\"title\":\"%s\",\"address\":\"%s\",\"datetime\":\"%s\"}", apiSendMsgDTO.getCreateCname(), title,address,datetime));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                int er=0;
            }
            if (apiSendMsgDTO.getTopic().equals("SMS_186967419")) {
                request.putQueryParameter("TemplateParam", String.format("{\"name\":\"%s\",\"type\":\"%s\"}", apiSendMsgDTO.getCreateCname(), apiSendMsgDTO.getMessageContent()));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);
            } else if (apiSendMsgDTO.getTopic().equals("SMS_186967418")) {
                request.putQueryParameter("TemplateParam", String.format("{\"title\":\"%s\"}", apiSendMsgDTO.getMessageContent()));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);
            } else if (apiSendMsgDTO.getTopic().equals("SMS_186947491")) {
                request.putQueryParameter("TemplateParam", String.format("{\"name\":\"%s\",\"content\":\"%s\"}", apiSendMsgDTO.getCreateCname(), apiSendMsgDTO.getMessageContent()));
                CommonResponse response = client.getCommonResponse(request);
                int status = response.getHttpStatus();
                System.out.println("====短信结果==" + status);
            }


        }
        //System.out.println("-------true Or false发送消息结果------------"+result);
        return result;
    }
}