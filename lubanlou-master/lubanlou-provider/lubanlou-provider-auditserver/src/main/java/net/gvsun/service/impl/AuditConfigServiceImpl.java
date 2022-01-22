package net.gvsun.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import net.gvsun.auditserver.external.AuditConfigVO;
import net.gvsun.auditserver.external.AuditTypeEnum;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.audit.AuditConfig;
import net.gvsun.domain.mapper.AuditConfigMapper;
import net.gvsun.service.IAuditConfigLevelService;
import net.gvsun.service.IAuditConfigService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Service
public class AuditConfigServiceImpl extends ServiceImpl<AuditConfigMapper, AuditConfig> implements IAuditConfigService {

    @Autowired private AuditConfigMapper auditConfigMapper;
    @Autowired private IAuditConfigLevelService auditConfigLevelService;

    /**
     * @description 查询审核配置信息
     * @param auditEntityId 审核主体id
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @Override
    public List<AuditConfigVO> selectAuditConfig(Integer auditEntityId){
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("audit_entity_id",auditEntityId);
        List<AuditConfigVO> auditConfigVOList = auditConfigMapper.selectAuditEntity(wrapper);
        // 为空则给它关联所有审核类型
        if (auditConfigVOList.isEmpty()){
            List<AuditConfig> auditConfigs = new ArrayList<>();
            // 遍历审核类型枚举类，插入关联数据
            for (AuditTypeEnum ate:AuditTypeEnum.values()){
                AuditConfig auditConfig = new AuditConfig();
                auditConfig.setAuditType(ate);
                auditConfig.setAuditEntityId(auditEntityId);
                auditConfigs.add(auditConfig);
            }
            this.saveBatch(auditConfigs);
            auditConfigVOList = auditConfigMapper.selectAuditEntity(wrapper);
        }
        // 完善数据
        auditConfigVOList.forEach(auditConfigVO -> {
            auditConfigVO.setAuditTypeName(AuditTypeEnum.valueOf(auditConfigVO.getAuditType()).getName());
            auditConfigVO.setAuditLevelVOList(auditConfigLevelService.selectAuditConfigLevel(auditConfigVO.getAuditConfigId()));
        });
        return auditConfigVOList;
    }

    /**
     * @description 查询审核配置信息
     * @param auditConfigVO 审核设置对象
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @Override
    public Result updateAuditConfig(AuditConfigVO auditConfigVO){
        // 将修改过的配置置为不可用
        AuditConfig ac = this.getById(auditConfigVO.getAuditConfigId());
        // 审核层级
        if (Objects.nonNull(auditConfigVO.getAuditLevelSum())){
            ac.setAuditLevelSum(auditConfigVO.getAuditLevelSum());
        }
        // 是否可用
        if (Objects.nonNull(auditConfigVO.getEnabled())){
            ac.setEnabled(auditConfigVO.getEnabled());
        }
        // 并行审核
        if (Objects.nonNull(auditConfigVO.getIsParallelAudit())){
            ac.setIsParallelAudit(auditConfigVO.getIsParallelAudit());
        }
        // 保存审核设置
        this.saveOrUpdate(ac);
        // 判断是否需要保存审核层级设置
        if (Objects.nonNull(auditConfigVO.getAuditLevelVOList())&&!auditConfigVO.getAuditLevelVOList().isEmpty()){
            // 保存审核层级设置
            auditConfigVO.getAuditLevelVOList().forEach(level ->{
                auditConfigLevelService.saveOrUpdateAuditConfigLevel(level);
            });
        }
        return Result.ok("success");
    }
}
