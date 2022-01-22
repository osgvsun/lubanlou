package net.openapi.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.domain.Message;
import net.gvsun.resource.dto.ResultDataDto;
import net.openapi.mapper.OpenApiMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("OpenApiMessageService")
public class OpenApiMessageServiceImpl extends ServiceImpl<OpenApiMessageMapper, Message> implements OpenApiMessageService {

}
