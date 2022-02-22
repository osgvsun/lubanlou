package net.service.sms;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiUserDTO;
import net.gvsun.message.external.CommonDTO;
import net.util.HttpClientUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("SmsCommonServiceImpl")
public class SmsCommonServiceImpl implements SmsService {
    @Override
    public String sendSms(ApiInputMessageDTO apiSendMsgDTO) {
        List<CommonDTO> mapList=new ArrayList<>();
        String result = "";
        System.out.println("----------进入发送消息队列--------------");
        try {
            for (ApiUserDTO apiUserDTO:apiSendMsgDTO.getApiUserDTOList()) {
                CommonDTO commonDTO=new CommonDTO();
                  commonDTO.setContent(apiSendMsgDTO.getMessageContent());
                  commonDTO.setNumber(apiUserDTO.getReceiver());
                  Map<String,String> map=new HashMap<>();
                  mapList.add(commonDTO);
            }
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, String> headersMap = new HashMap<>();
                headersMap.put("Content-Type", "application/json");
                String url = "http://www.gvsun.net:1180/iot/sms/send";
                Thread.sleep(2000);
            System.out.println("-------------发送消息中-------------");
                result = HttpClientUtil.doPostForJson(url, mapList, headersMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("-------true Or false发送消息结果------------"+result);
       return result;
    }
}