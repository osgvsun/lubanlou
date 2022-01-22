package net.gvsun.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import net.gvsun.auditserver.external.AuditConfigVO;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.audit.AuditConfig;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
public interface IAuditConfigService extends IService<AuditConfig> {
    /**
     * @description 查询审核配置信息
     * @param auditEntityId 审核主体id
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    List<AuditConfigVO> selectAuditConfig(Integer auditEntityId);

    /**
     * @description 查询审核配置信息
     * @param auditConfigVO 审核设置对象
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    Result updateAuditConfig(AuditConfigVO auditConfigVO);
}
