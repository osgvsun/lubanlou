package net.gvsun.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.domain.entity.audit.AuditEntity;
import net.gvsun.domain.mapper.AuditEntityMapper;
import net.gvsun.service.IAuditEntityService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Service
public class AuditEntityServiceImpl extends ServiceImpl<AuditEntityMapper, AuditEntity> implements IAuditEntityService {
    @Autowired private AuditEntityMapper auditEntityMapper;


    /**
     * @description 获取审核实体对象
     * @param entityType 实体类型
     * @param entityId 审核实体id（设备，实验室，中心，模板等等）
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Override
    public AuditEntityVO selectOne(EntityTypeEnum entityType,String entityId){
        AuditEntityVO auditEntityVO = auditEntityMapper.selectOne(entityType,entityId);
        if (Objects.nonNull(auditEntityVO)){
            auditEntityVO.setEntityTypeName(EntityTypeEnum.valueOf(auditEntityVO.getEntityType()).getName());
            return auditEntityVO;
        }
        AuditEntity auditEntity = new AuditEntity(entityType,entityId);
        this.save(auditEntity);
        // 返回结果
        return this.selectOne(entityType,entityId);
    }
    /**
     * @description 根据主体id和类型获取准入主体id
     * @param entityType 实体类型
     * @author  SmarkLee
     * @date  2021/8/10
     * @return
     **/
    @Override
    public List<AuditEntityVO> selectAuditEntity(EntityTypeEnum entityType){
        QueryWrapper<AuditEntityVO> wrapper = new QueryWrapper();
        wrapper.eq("entity_type",entityType);
        return auditEntityMapper.selectAuditEntity(wrapper);
    }
}
