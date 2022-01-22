package net.gvsun.gswork.datasource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.gswork.datasource.entity.GroupAssignment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface GroupAssignmentMapper extends BaseMapper<GroupAssignment> {
}
