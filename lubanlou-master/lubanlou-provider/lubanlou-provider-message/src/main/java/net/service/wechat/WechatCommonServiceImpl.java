package net.service.wechat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.WechatDTO;
import net.gvsun.message.external.WechatTextDTO;
import net.util.HttpClientUtil;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service("WechatCommonServiceImpl")
public class WechatCommonServiceImpl implements WechatService {
    //企业微信企业id
    public static final String WECHAT_CORPID = "ww00dd09e79399e172";
    //企业微信——服务状态监控应用id
    public static final String WECHAT_SERVICE_STATUS_CORPSECRET = "AK6pg0we_5Q5KM62SIlJMfKKDwttWoY-i5NtcckM_Ns";
    //Map保存access_token
    public static Map<String, String> tokenMap = new HashMap<>();

    @Override
    public String sendWechat(ApiInputMessageDTO apiInputMessageDTO) {
        String result = "";
        if (!tokenMap.containsKey("access_token")) {
            getWechatAccessToken();
        }
        WechatDTO wechatDTO = new WechatDTO();
        //wechatDTO.setTouser("DouShaBao");
        wechatDTO.setToparty("");
        wechatDTO.setTotag("5");
        wechatDTO.setAgentid(Integer.parseInt(apiInputMessageDTO.getApiUserDTOList().get(0).getReceiverUsername()));
        //文本内容dto
        WechatTextDTO wechatTextDTO = new WechatTextDTO();
        //服务状态监控
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            //服务健康状态暂时只从eureka传递，不通过message再次获取
            /*String urlHealth = apiInputMessageDTO.getMessageHtml();
            String status ="无";
            if (urlHealth!=null&&!"".equals(urlHealth)){
                String resultHealth = HttpClientUtil.doGet(urlHealth, new HashMap<>());
                JsonNode jsonNodeHealth = objectMapper.readTree(resultHealth);
                status = jsonNodeHealth.get("status").asText();
            }*/
            wechatTextDTO.setContent(apiInputMessageDTO.getMessageContent());
            wechatDTO.setMsgtype("text");
            wechatDTO.setText(wechatTextDTO);
            wechatDTO.setSafe(0);
            wechatDTO.setEnable_id_trans(0);
            wechatDTO.setEnable_duplicate_check(0);
            String wechatJson = "";

            wechatJson = objectMapper.writeValueAsString(wechatDTO);
            String access_token = tokenMap.get("access_token");
            String url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
            result = HttpClientUtil.doPostForJson(url, wechatDTO);
            JsonNode jsonNode = objectMapper.readTree(result);
            int errcode = jsonNode.get("errcode").intValue();
            //判断返回码，如为token过期，则更新token
            if (42001 == errcode) {
                getWechatAccessToken();
                access_token = tokenMap.get("access_token");
                url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
                result = HttpClientUtil.doPostForJson(url, wechatDTO);
            }
            result = "success";
        } catch (IOException e) {
            e.printStackTrace();
            result = "error";
        }
        return result;
    }

    /*************************************************************************************
     * Description:获取企业微信接口access_token
     *
     * @author: 杨新蔚
     * @date: 2019/12/11
     *************************************************************************************/
    public void getWechatAccessToken() {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("corpid", WECHAT_CORPID);
        parameters.put("corpsecret", WECHAT_SERVICE_STATUS_CORPSECRET);
        String url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";
        try {
            String result = HttpClientUtil.doGet(url, parameters);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);
            String access_token = jsonNode.get("access_token").asText();
            tokenMap.put("access_token", access_token);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}