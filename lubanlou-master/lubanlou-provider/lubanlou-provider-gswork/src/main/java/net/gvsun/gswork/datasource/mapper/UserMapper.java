package net.gvsun.gswork.datasource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.gswork.datasource.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

/**
*  Description 字典表CDictionary的方法处理
*
*  @author weicheng
*  @date 2020/6/28 15:12
*/
@Component
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
