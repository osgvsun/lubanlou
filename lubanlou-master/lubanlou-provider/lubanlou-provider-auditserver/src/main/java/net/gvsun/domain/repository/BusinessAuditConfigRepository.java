package net.gvsun.domain.repository;

import net.gvsun.domain.entity.BusinessAuditConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BusinessAuditConfigRepository extends JpaRepository<BusinessAuditConfig, String> {
    @Query("select b from BusinessAuditConfig b where b.auditLevel=:level and b.type =:type ")
    BusinessAuditConfig getBusByLevelAndType(@Param("level") Integer level, @Param("type") String type);
    @Query("select b from BusinessAuditConfig b where b.type =:type order by b.auditLevel")
    List<BusinessAuditConfig> getBusByLevelAndType(@Param("type") String type);
    @Query("select b from BusinessAuditConfig b where b.type like :type% order by b.auditLevel")
    List<BusinessAuditConfig> getBusByLevelAndTypeContaining(@Param("type") String type);
}
