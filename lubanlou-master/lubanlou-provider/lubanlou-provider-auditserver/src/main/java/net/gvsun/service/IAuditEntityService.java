package net.gvsun.service;

import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.domain.entity.audit.AuditEntity;
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
public interface IAuditEntityService extends IService<AuditEntity> {

    /**
     * @description 根据主体id和类型获取准入主体id
     * @param entityType 实体类型
     * @author  SmarkLee
     * @date  2021/8/10
     * @return
     **/
    List<AuditEntityVO> selectAuditEntity(EntityTypeEnum entityType);


    /**
     * @description 获取审核实体对象
     * @param entityType 实体类型
     * @param entityId 审核实体id（设备，实验室，中心，模板等等）
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    AuditEntityVO selectOne(EntityTypeEnum entityType,String entityId);
}
