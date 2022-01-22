package net.gvsun.gswork.datasource.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.gswork.datasource.entity.UserGroup;
import net.gvsun.gswork.datasource.mapper.UserGroupMapper;
import org.springframework.stereotype.Service;

@Service
public class UserGroupServiceImpl extends ServiceImpl<UserGroupMapper, UserGroup> implements UserGroupService {
}
