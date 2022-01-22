package net.gvsun.gswork.datasource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.gswork.datasource.entity.TCourseSiteGroup;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface TCourseSiteGroupMapper extends BaseMapper<TCourseSiteGroup> {
}
