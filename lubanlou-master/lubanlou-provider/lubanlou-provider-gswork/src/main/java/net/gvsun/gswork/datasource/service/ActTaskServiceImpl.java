package net.gvsun.gswork.datasource.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.gswork.datasource.entity.ActTask;
import net.gvsun.gswork.datasource.mapper.ActTaskMapper;
import org.springframework.stereotype.Service;

@Service
public class ActTaskServiceImpl extends ServiceImpl<ActTaskMapper, ActTask> implements ActTaskService {
}
