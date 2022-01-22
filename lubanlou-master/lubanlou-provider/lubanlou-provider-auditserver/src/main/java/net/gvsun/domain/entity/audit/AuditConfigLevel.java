package net.gvsun.domain.entity.audit;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.gvsun.auditserver.external.AuditLevelEnum;

/**
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AuditConfigLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 流程等级配置详情表
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 对应流程层级
     */
    private AuditLevelEnum auditLevel;

    /**
     * 第几级
     */
    private Integer levelNum;

    /**
     * 流程配置表id
     */
    private Integer auditConfigId;

    /**
     * 是否可用（重新保存层级后，原有的层级置为不可用）
     */
    private Boolean enabled;
}
