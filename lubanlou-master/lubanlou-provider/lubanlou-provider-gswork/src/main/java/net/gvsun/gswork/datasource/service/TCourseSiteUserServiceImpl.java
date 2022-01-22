package net.gvsun.gswork.datasource.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.gswork.datasource.entity.TCourseSiteUser;
import net.gvsun.gswork.datasource.mapper.TCourseSiteUserMapper;
import org.springframework.stereotype.Service;

@Service
public class TCourseSiteUserServiceImpl extends ServiceImpl<TCourseSiteUserMapper, TCourseSiteUser> implements TCourseSiteUserService {
}
