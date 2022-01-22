package net.gvsun.domain.entity.audit;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.gvsun.common.EntityTypeEnum;

/**
 *
 * @author SmarkLee
 * @since 2021-11-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AuditEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 配置表id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 流程配置主体类型
     */
    private EntityTypeEnum entityType;

    /**
     * 流程配置主体id
     */
    private String entityId;

    /**
     * 审核层级是否一致（0：不一致；1：一致）
     */
    private Boolean isAuditUnanimous;


    public AuditEntity() {
    }

    /**
     * @description 带参构造
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    public AuditEntity(EntityTypeEnum entityType, String entityId) {
        this.entityType = entityType;
        this.entityId = entityId;
    }
}
