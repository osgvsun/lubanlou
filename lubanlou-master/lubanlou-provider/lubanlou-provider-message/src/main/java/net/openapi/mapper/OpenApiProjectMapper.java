package net.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.domain.MessageTopic;
import net.domain.Project;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OpenApiProjectMapper extends BaseMapper<Project> {
}
