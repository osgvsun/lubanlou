package net.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.dbsource.entity.SmsSignature;
import net.domain.Message;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OpenApiSmsSignatureMapper extends BaseMapper<SmsSignature> {
    @Select("select m.* from message m where 1=1  limit #{page},#{limit}")
    public List<Message> findMessageInfo(Integer page, Integer limit);
}
