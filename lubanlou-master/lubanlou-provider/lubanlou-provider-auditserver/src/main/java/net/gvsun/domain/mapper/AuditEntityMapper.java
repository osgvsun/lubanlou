package net.gvsun.domain.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.domain.entity.audit.AuditEntity;
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
public interface AuditEntityMapper extends BaseMapper<AuditEntity> {

    /**
     * @description 查询审核主体列表
     * @param wrapper 封装查询对象
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Select("select * from audit_entity ${ew.customSqlSegment}")
    List<AuditEntityVO> selectAuditEntity(@Param(Constants.WRAPPER)QueryWrapper wrapper);

    /**
     * @description 查询审核主体
     * @param entityType 实体类型
     * @param entityId 审核实体id（设备，实验室，中心，模板等等）
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Select("select id audit_entity_id,entity_type,entity_id,is_audit_unanimous from audit_entity" +
            " where entity_type = #{entityType} and entity_id = #{entityId}")
    AuditEntityVO selectOne(@Param("entityType")EntityTypeEnum entityType,@Param("entityId")String entityId);
}
