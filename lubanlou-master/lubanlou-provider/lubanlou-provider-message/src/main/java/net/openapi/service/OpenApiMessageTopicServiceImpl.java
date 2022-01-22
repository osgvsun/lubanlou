package net.openapi.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.domain.Message;
import net.domain.MessageTopic;
import net.gvsun.resource.dto.ResultDataDto;
import net.openapi.mapper.OpenApiMessageMapper;
import net.openapi.mapper.OpenApiMessageTopicMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("OpenApiMessageTopicService")
public class OpenApiMessageTopicServiceImpl extends ServiceImpl<OpenApiMessageTopicMapper, MessageTopic> implements OpenApiMessageTopicService {
}
