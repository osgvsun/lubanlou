package net.dbsource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.domain.MessageReceiver;
import net.gvsun.message.external.MessageReceiverDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface MessageReceiverMapper extends BaseMapper<MessageReceiver> {
    @Select("select mr.* from message_receiver mr where 1=1 and mr.message_id=#{messageId}")
    public List<MessageReceiver> getMessageReceiverByMessageId(@Param("messageId")Integer messageId);
    @Select("select mr.* from message_receiver mr where 1=1 and mr.message_id=#{messageId} and mr.receiver_username=#{username}")
    public MessageReceiver getMessageReceiverByMessageIdAndUsername(@Param("messageId")Integer messageId,@Param("username") String username);
    @Update({ "update message_receiver mr set mr.read_state=#{readState} and mr.read_time= where mr.message_id=#{messageId}"})
    void deleteLabRoomAgent(Integer messageId,Integer readState);
    @Select("select mr.* from message_receiver mr where 1=1 and mr.message_id=#{messageId}")
    public List<MessageReceiverDTO> getMessageReceiverInfoByMessageId(@Param("messageId")Integer messageId);
    /**
     * Description  根据用户名和消息获取消息接受者信息
     *
     * @return MessageReceiverDTO
     * @author lay
     * @date 2021/1/27 14:28
     */
    @Select("select mr.* from message_receiver mr where 1=1 and mr.message_id=#{messageId} and mr.receiver_username=#{username}")
    public MessageReceiverDTO getMessageReceiverDTOByMessageIdAndUsername(@Param("messageId")Integer messageId,@Param("username") String username);
}
