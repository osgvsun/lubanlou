package net.gvsun.domain.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import net.gvsun.auditserver.external.AuditConfigLevelVO;
import net.gvsun.domain.entity.audit.AuditConfigLevel;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Component
@Mapper
public interface AuditConfigLevelMapper extends BaseMapper<AuditConfigLevel> {

    /**
     * @description 查询审核主体列表
     * @param wrapper 封装查询对象
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Select("select id audit_config_level_id, audit_config_id,audit_level,level_num from audit_config_level ${ew.customSqlSegment}")
    List<AuditConfigLevelVO> selectAuditConfigLevel(@Param(Constants.WRAPPER) QueryWrapper wrapper);
}
