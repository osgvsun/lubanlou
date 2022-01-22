package net.gvsun.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import net.gvsun.auditserver.external.AuditConfigLevelVO;
import net.gvsun.auditserver.external.AuditLevelEnum;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.audit.AuditConfigLevel;
import net.gvsun.domain.mapper.AuditConfigLevelMapper;
import net.gvsun.service.IAuditConfigLevelService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
public class AuditConfigLevelServiceImpl extends ServiceImpl<AuditConfigLevelMapper, AuditConfigLevel> implements IAuditConfigLevelService {

    @Autowired private AuditConfigLevelMapper auditConfigLevelMapper;

    /**
     * @description 查询审核配置信息
     * @param auditConfigId 审核id
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @Override
    public List<AuditConfigLevelVO> selectAuditConfigLevel(Integer auditConfigId){
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("audit_config_id",auditConfigId);
        // 这里设置的level，enabled必须是true
        wrapper.eq("enabled",true);
        wrapper.orderByAsc("level_num");
        List<AuditConfigLevelVO> levelVOList = auditConfigLevelMapper.selectAuditConfigLevel(wrapper);
        // 完善数据
        levelVOList.forEach(level ->{
            level.setAuditLevelName(AuditLevelEnum.valueOf(level.getAuditLevel()).getName());
        });
        return levelVOList;
    }

    /**
     * @description 修改审核层级配置
     * @param auditConfigLevelVO
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @Override
    public Result saveOrUpdateAuditConfigLevel(AuditConfigLevelVO auditConfigLevelVO){
        AuditConfigLevel acl = Objects.nonNull(auditConfigLevelVO.getAuditConfigLevelId())?this.getById(auditConfigLevelVO.getAuditConfigLevelId()):new AuditConfigLevel();
        acl.setAuditConfigId(auditConfigLevelVO.getAuditConfigId());
        acl.setAuditLevel(AuditLevelEnum.valueOf(auditConfigLevelVO.getAuditLevel()));
        acl.setLevelNum(auditConfigLevelVO.getLevelNum());
        return Result.ok(this.saveOrUpdate(acl));
    }
}
