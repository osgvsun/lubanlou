package net.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.domain.Message;
import net.domain.MessageTopic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OpenApiMessageTopicMapper extends BaseMapper<MessageTopic> {
}
