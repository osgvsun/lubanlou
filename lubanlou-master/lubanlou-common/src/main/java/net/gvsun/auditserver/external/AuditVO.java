package net.gvsun.auditserver.external;


import lombok.Data;

import java.util.List;


/**
 * @description 审核DTO
 * @author  Smark Lee
 * @date  2021/11/9
 * @return
 **/
@Data
public class AuditVO {
    /**
     * auditEntity表对应id
     */
    private Integer auditEntityId;

    /**
     * auditEntity表对应id
     */
    private String entityId;

    /**
     * auditEntity表对应id
     */
    private String entityType;

    /**
     * 审核层级是否一致
     */
    private Boolean isAuditUnanimous;

    /**
     * 关联的所有流程
     */
    private List<AuditConfigVO> auditConfigVOList;
}
