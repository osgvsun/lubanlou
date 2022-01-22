package net.gvsun.domain.repository;

import net.gvsun.domain.entity.CMessagePropertiesExtend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CMessagePropertiesExtendRepository extends JpaRepository<CMessagePropertiesExtend, String> {
    @Query("select e from CMessagePropertiesExtend e where e.projectName=:projectName and e.businessConfigItem=:businessConfigItem")
    List<CMessagePropertiesExtend> getPropertiesExtendByPNameAndBConfigItem(@Param("projectName") String projectName, @Param("businessConfigItem") String businessConfigItem);
    @Query("SELECT e FROM CMessagePropertiesExtend e where e.id=:id")
    CMessagePropertiesExtend getCMessagePropertiesExtendById(@Param("id") int id);
}
