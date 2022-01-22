package net.gvsun.domain.entity.audit;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.gvsun.auditserver.external.AuditTypeEnum;

/**
 * @description 审核主体配置表
 * @author SmarkLee
 * @since 2021-11-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AuditConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 审核配置表id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 审核主体表id
     */
    private Integer auditEntityId;

    /**
     * 审核类型:这里定制化较强，暂时写死类型
     * ACA_INSIDE:院内预约审核层级;
     * LAB_BELONG_SCHOOL:实验室所在学校审核层级；
     * RES_USER_BELONG_SCHOOL:预约人所在学校审核层级。
     */
    private AuditTypeEnum auditType;

    /**
     * 流程总层数
     */
    private Integer auditLevelSum;

    /**
     * 是否并行审核
     */
    private Boolean isParallelAudit;

    /**
     * 是否启用
     */
    private Boolean enabled;


}
