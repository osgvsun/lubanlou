package net.service;

import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.ApiOutputMessageDTO;
import net.gvsun.common.KafkaDTO;

import java.util.Map;

public interface ShareService {
    /*************************************************************************************
     * Description:封装消息返回值
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    public ApiOutputMessageDTO getMessageDTO(Integer status,String msg,Map<String,Object> map);

    /*************************************************************************************
     * Description:封装消息传入dto至message对象类
     *
     * @author: 杨新蔚
     * @date: 2019/7/23
     *************************************************************************************/
    public void convertApiSendMsgDTO(ApiInputMessageDTO apiSendMsgDTO);
    public void saveMessage(ApiInputMessageDTO apiSendMsgDTO, KafkaDTO kafkaDTO);
}
