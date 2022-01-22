package net.gvsun.domain.repository;

import net.gvsun.domain.entity.BusinessAuditConfig;
import net.gvsun.domain.entity.BusinessAuditLevelResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BusinessAuditLevelResultRepository extends JpaRepository<BusinessAuditLevelResult, String> {
    @Query("select b from BusinessAuditLevelResult b where b.statusId =:statusId")
    List<BusinessAuditLevelResult> getBusinessAuditLevelResultByStatusId(@Param("statusId") String statusId);
}
