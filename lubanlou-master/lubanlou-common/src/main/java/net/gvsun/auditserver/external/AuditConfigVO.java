package net.gvsun.auditserver.external;


import lombok.Data;

import java.util.List;

/**
 * @description 审核配置DTO
 * @author  Smark Lee
 * @date  2021/11/9
 * @return
 **/
@Data
public class AuditConfigVO {

    /**
     * 审核层数
     */
    private Integer auditConfigId;

    /**
     * 审核层数
     */
    private Integer auditLevelSum;

    /**
     * 并行审核 ?
     */
    private Boolean isParallelAudit;

    /**
     * 审核类型:这里定制化较强，暂时写死类型
     * ACA_INSIDE:院内预约审核层级;
     * LAB_BELONG_SCHOOL:实验室所在学校审核层级；
     * RES_USER_BELONG_SCHOOL:预约人所在学校审核层级。
     */
    private String auditType;
    private String auditTypeName;

    /**
     * 是否启用
     */
    private Boolean enabled;

    /**
     * 所有审核层级
     */
    private List<AuditConfigLevelVO> auditLevelVOList;
}
