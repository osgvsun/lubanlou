package net.gvsun.repository;

import net.gvsun.entity.Audit;
import net.gvsun.entity.key.AuditKey;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuditRepository extends JpaRepository<Audit, AuditKey> {

    /**
     * @description 根据类型查找并排序
     * @author  Smark Lee
     * @date  2021/11/25
     * @return
     **/
    List<Audit> findByAuditedOrderByCreatedTimeAsc(boolean audited);

    /**
     * @description
     * @param
     * @author  Smark Lee
     * @date  2021/11/25
     * @return
     **/
    @Query("select a from Audit a where a.audited = :audited and a.username like CONCAT('%',:username,'%') order by a.createdTime desc")
    List<Audit> findAudit(@Param("audited") boolean audited, @Param("username")String username);
}
