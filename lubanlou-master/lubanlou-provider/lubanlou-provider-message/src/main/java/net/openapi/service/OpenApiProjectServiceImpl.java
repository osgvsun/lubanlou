package net.openapi.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.domain.MessageTopic;
import net.domain.Project;
import net.openapi.mapper.OpenApiMessageTopicMapper;
import net.openapi.mapper.OpenApiProjectMapper;
import org.springframework.stereotype.Service;

@Service("OpenApiProjectService")
public class OpenApiProjectServiceImpl extends ServiceImpl<OpenApiProjectMapper, Project> implements OpenApiProjectService {
}
