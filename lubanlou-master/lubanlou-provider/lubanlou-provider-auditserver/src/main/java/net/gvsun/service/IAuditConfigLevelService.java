package net.gvsun.service;

import net.gvsun.auditserver.external.AuditConfigLevelVO;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.audit.AuditConfigLevel;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
public interface IAuditConfigLevelService extends IService<AuditConfigLevel> {

    /**
     * @description 查询审核配置信息
     * @param auditConfigId 审核id
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    List<AuditConfigLevelVO> selectAuditConfigLevel(Integer auditConfigId);

    /**
     * @description 修改审核层级配置
     * @param auditConfigLevelVO
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    Result saveOrUpdateAuditConfigLevel(AuditConfigLevelVO auditConfigLevelVO);
}
