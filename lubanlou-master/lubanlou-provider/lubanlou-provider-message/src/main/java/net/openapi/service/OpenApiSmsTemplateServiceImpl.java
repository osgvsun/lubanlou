package net.openapi.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.dbsource.entity.SmsTemplate;
import net.domain.Message;
import net.openapi.mapper.OpenApiMessageMapper;
import net.openapi.mapper.OpenApiSmsTemplateMapper;
import org.springframework.stereotype.Service;

@Service("OpenApiSmsTemplateService")
public class OpenApiSmsTemplateServiceImpl extends ServiceImpl<OpenApiSmsTemplateMapper, SmsTemplate> implements OpenApiSmsTemplateService {

}
