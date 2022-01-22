package net.gvsun.domain.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import net.gvsun.auditserver.external.AuditConfigVO;
import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.domain.entity.audit.AuditConfig;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Component
@Mapper
public interface AuditConfigMapper extends BaseMapper<AuditConfig> {
    /**
     * @description 查询审核主体列表
     * @param wrapper 封装查询对象
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Select("select id audit_config_id,audit_type,audit_level_sum,is_parallel_audit,enabled from audit_config  ${ew.customSqlSegment}")
    List<AuditConfigVO> selectAuditEntity(@Param(Constants.WRAPPER) QueryWrapper wrapper);
}
