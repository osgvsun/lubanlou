package net.gvsun.auditserver.external;


import lombok.Data;
import net.gvsun.common.EntityTypeEnum;

import java.util.List;

/**
 * @description 审核主体DTO
 * @author  Smark Lee
 * @date  2021/11/10
 * @return
 **/
@Data
public class AuditEntityVO {
    /**
     * 审核服务中对应的id
     */
    private Integer auditEntityId;

    /**
     * 需要配置审核的实体类型及名称
     */
    private String entityType;
    private String entityTypeName;

    /**
     * 实体id
     */
    private String entityId;

    /**
     * 审核层级是否一致（0：不一致；1：一致）
     */
    private Boolean isAuditUnanimous;
}
