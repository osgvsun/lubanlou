package net.gvsun.auditserver.external;


import lombok.Data;

import java.util.List;

/**
 * @description 审核层级DTO
 * @author  Smark Lee
 * @date  2021/11/9
 * @return
 **/
@Data
public class AuditConfigLevelVO {
    /**
     * 审核层级对应id
     */
    private Integer auditConfigLevelId;
    /**
     * id
     */
    private Integer auditConfigId;
    /**
     * 层级类型
     */
    private String auditLevel;

    /**
     * 层级名称
     */
    private String auditLevelName;

    /**
     * 层级序号
     */
    private Integer levelNum;
}
