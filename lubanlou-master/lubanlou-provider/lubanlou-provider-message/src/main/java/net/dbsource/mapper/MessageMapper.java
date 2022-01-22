package net.dbsource.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import net.domain.Message;
import net.gvsun.message.external.MessageDTO;
import net.gvsun.message.external.MessageInfoDTO;
import net.gvsun.timetable.internal.labroom.LabRoomAgentDTO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@Mapper
public interface MessageMapper extends BaseMapper<Message> {
    @Select("select m.id,m.message_content,m.message_html,m.project_name,m.message_topic,m.create_cname,m.create_username,m.created_time,GROUP_CONCAT(mr.receiver_username) as message_receivers,GROUP_CONCAT(IFNULL(mr.read_state,'no')) as message_read_status from message m inner join message_receiver mr on mr.message_id=m.id  " +
            " ${ew.customSqlSegment} ")
    Page<MessageDTO> getMessageInfo(Page page,@Param(Constants.WRAPPER) Wrapper<MessageDTO> wrapper);
    @Select({"<script>",
            " select m.id,m.create_cname,m.create_username,m.created_time,m.message_content,m.message_html,mr.handle_time,mr.handle_state,m.title from message m inner join message_receiver mr on m.id=mr.message_id " +
                    " WHERE 1=1 "+
                    " and m.create_username=#{createUsername}",
                     " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +
                    " <when test='title!=null and title!=\"\"'>",
                    "  and m.title like CONCAT('%',#{title},'%') " ,
                    " </when>",
                    " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
                    " group by m.id order by m.created_time desc",
                    "limit #{page},#{limit}",
                    " </script>"})
    public List<MessageDTO> getMessageByState(MessageInfoDTO messageInfoDTO);
    @Select({"<script>",
            " select m.id,m.create_cname,m.create_username,m.created_time,m.message_content,m.message_html,mr.handle_time,mr.handle_state,mr.read_state,mr.read_time,m.title from message m inner join message_receiver mr on m.id=mr.message_id " +
                    " WHERE 1=1 "+
                    " and mr.receiver_username=#{receiverUsername}",
            " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +

                    " <when test='title!=null and title!=\"\"'>",
            "  and m.title like CONCAT('%',#{title},'%') " ,
            " </when>",
            " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
           /* " <when test='messageInfoDTO.startTime!=null'>",
            " and  m.created_time>=#{messageInfoDTO.startTime} " ,
            " </when>",
            " <when test='messageInfoDTO.endTime!=null'>",
            " and m.created_time<=#{messageInfoDTO.endTime} " ,
            " </when>",*/
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
                    "  order by m.created_time desc",
            "limit #{page},#{limit}",
            " </script>"})
    public List<MessageDTO> getMessageByMyAudit(MessageInfoDTO messageInfoDTO);

    @Select({"<script>",
            " select m.id,m.create_cname,m.create_username,m.created_time,m.message_content,m.message_html,mr.handle_time,mr.handle_state,mr.read_state,mr.read_time,m.title from message m left join message_receiver mr on m.id=mr.message_id " +
                    " WHERE 1=1 "+
                    " and mr.receiver_username=#{receiverUsername}",
            " and m.business_type=#{businessType}",
            " and m.business_uid=#{businessUid}",
            " and m.general_identification=#{generalIdentification}",
            " </script>"})
    public MessageDTO getMessageByBusiness(@Param("businessType")String businessType,@Param("businessUid") String businessUid,@Param("receiverUsername")String receiverUsername,@Param("generalIdentification") String generalIdentification,@Param("projectName") String projectName);

    @Select({"<script>",
            " select m.id,m.create_cname,m.create_username,m.created_time,m.message_content,m.message_html,mr.handle_time,mr.handle_state,mr.read_state,m.title from message_receiver mr inner join message m on m.id=mr.message_id " +
                    " WHERE m.sub_topic='audit_result'"+
                    " and mr.receiver_username=#{createUsername}",
            " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +
                    " <when test='title!=null and title!=\"\"'>",
            "  and m.title like CONCAT('%',#{title},'%') " ,
            " </when>",
            " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
            " group by mr.id order by m.created_time desc",
            "limit #{page},#{limit}",
            " </script>"})
    public List<MessageDTO> getMessageByAuditResult(MessageInfoDTO messageInfoDTO);

    @Select({"<script>",
            " select count(*) from message_receiver mr inner join message m on m.id=mr.message_id " +
                    " WHERE m.sub_topic='audit_result'"+
                    " and mr.receiver_username=#{createUsername}",
            " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +
                    " <when test='title!=null and title!=\"\"'>",
            "  and m.title like CONCAT('%',#{title},'%') " ,
            " </when>",
            " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
            " order by m.created_time desc",
            " </script>"})
    public Integer countMessageByAuditResult(MessageInfoDTO messageInfoDTO);

    @Select({"<script>",
            " select m.id,m.create_cname,m.create_username,m.created_time,m.message_content,m.message_html,mr.handle_time,mr.handle_state,mr.read_state,m.title from message_receiver mr inner join message m on m.id=mr.message_id " +
                    " WHERE m.sub_topic='audit_notice'"+
                    " and mr.receiver_username=#{receiverUsername}",
            " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +
                    " <when test='title!=null and title!=\"\"'>",
            "  and m.title like CONCAT('%',#{title},'%') " ,
            " </when>",
            " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
            " group by mr.id order by m.created_time desc",
            "limit #{page},#{limit}",
            " </script>"})
    public List<MessageDTO> getMessageByAuditNotice(MessageInfoDTO messageInfoDTO);

    @Select({"<script>",
            " select count(m.id) from message_receiver mr inner join message m on m.id=mr.message_id " +
                    " WHERE m.sub_topic='audit_notice'"+
                    " and mr.receiver_username=#{receiverUsername}",
            " and m.project_name=#{projectName}",
            " <choose>  ",
            " <when test='state==null'>",
            " </when>",
            "     <otherwise>" +
                    " <when test='state==0'>",
            " and mr.read_state=0 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==1'>",
            " and mr.read_state=1 and mr.handle_state=0" ,
            " </when>",
            " <when test='state==2'>",
            " and mr.read_state=0 and mr.handle_state=1" ,
            " </when>",
            " <when test='state==3'>",
            " and mr.read_state=1 and mr.handle_state=1" ,
            " </when>",
            "     </otherwise> " +
                    " </choose> " +
                    " <when test='title!=null and title!=\"\"'>",
            "  and m.title like CONCAT('%',#{title},'%') " ,
            " </when>",
            " <when test='startTime!=null and startTime!=\"\"'>",
            "    <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')>=  DATE_FORMAT(#{startTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='endTime!=null and endTime!=\"\"'>",
            "  <![CDATA[AND DATE_FORMAT(m.created_time, '%Y-%m-%d')<=  DATE_FORMAT(#{endTime}, '%Y-%m-%d')]]> " ,
            " </when>",
            " <when test='readState!=null and readState!=\"\"'>",
            "  and mr.read_state=#{readState}" ,
            " </when>",
            "  order by m.created_time desc",
            " </script>"})
    public Integer countMessageByAuditNotice(MessageInfoDTO messageInfoDTO);
}
