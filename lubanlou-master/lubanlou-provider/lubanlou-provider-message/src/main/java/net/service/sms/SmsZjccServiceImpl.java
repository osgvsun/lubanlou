package net.service.sms;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.domain.Project;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.repository.ProjectJPA;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service("SmsZjccServiceImpl")
public class SmsZjccServiceImpl implements SmsService {
    @Autowired
    private ProjectJPA projectJPA;
    @Override
    public String sendSms(ApiInputMessageDTO apiSendMsgDTO) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
       Project project=projectJPA.getProjectByProject(apiSendMsgDTO.getProject());
       String content="";
        if(apiSendMsgDTO.getTopic().equals("smsZjccApply")){
            content="您好,请审核"+apiSendMsgDTO.getCreateCname()+"的"+apiSendMsgDTO.getMessageContent()+"申请";
        }else {
            JsonNode jsonNode = objectMapper.readTree(apiSendMsgDTO.getMessageContent());

            String type = jsonNode.get("type").asText();
            String auditResult = jsonNode.get("auditResult").asText();
            content = "您好,您在" + project.getProjectName() + "系统的" + type + "申请，审核结果为" + auditResult + "(" + apiSendMsgDTO.getCreateCname() + ")。详情请进系统查看。";
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

        for (int i=0;i<apiSendMsgDTO.getApiUserDTOList().size();i++) {
          sendMobiles+="057785435709"+"|";
          tel+=apiSendMsgDTO.getApiUserDTOList().get(i).getReceiver()+"|";
        }
        // http://{阿里云地址}:8888/MsgService/SiServer
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
}