package net.openapi.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.dbsource.entity.SmsSignature;
import net.domain.Message;
import net.openapi.mapper.OpenApiMessageMapper;
import net.openapi.mapper.OpenApiSmsSignatureMapper;
import org.springframework.stereotype.Service;

@Service("OpenApiSmsSignatureService")
public class OpenApiSmsSignatureServiceImpl extends ServiceImpl<OpenApiSmsSignatureMapper, SmsSignature> implements OpenApiSmsSignatureService {

}
