package net.gvsun.gswork.datasource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.gswork.datasource.entity.GroupCategory;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface GroupCategoryMapper extends BaseMapper<GroupCategory> {
}
