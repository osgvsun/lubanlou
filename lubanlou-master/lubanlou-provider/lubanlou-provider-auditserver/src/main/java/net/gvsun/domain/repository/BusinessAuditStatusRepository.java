package net.gvsun.domain.repository;

import net.gvsun.domain.entity.BusinessAuditStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BusinessAuditStatusRepository extends JpaRepository<BusinessAuditStatus, String> {
    @Query("SELECT b FROM BusinessAuditStatus b where b.businessAppId=:pAppUid and b.type=:businessType")
    List<BusinessAuditStatus> findBypAppUidAndType(@Param("pAppUid") String pAppUid, @Param("businessType") String businessType);

    /**
     * @description 获取审核人所有审过数据的uid
     * @param createUser
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    @Query("select s.businessAppId from BusinessAuditStatus s " +
            " join BusinessAuditLevelResult b on s.uid = b.statusId "+
            " where b.createUser =:createUser " +
            " group by s.businessAppId")
    List<String> getBusinessUidsByCreateUser(@Param("createUser") String createUser);
}
