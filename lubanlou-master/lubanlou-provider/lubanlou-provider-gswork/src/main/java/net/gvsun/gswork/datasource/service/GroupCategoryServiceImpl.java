package net.gvsun.gswork.datasource.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.gswork.datasource.entity.GroupCategory;
import net.gvsun.gswork.datasource.mapper.GroupCategoryMapper;
import org.springframework.stereotype.Service;

@Service
public class GroupCategoryServiceImpl extends ServiceImpl<GroupCategoryMapper, GroupCategory> implements GroupCategoryService {
}
