package net.gvsun.domain.repository;

import net.gvsun.domain.entity.CMessageProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CMessagePropertiesRepository extends JpaRepository<CMessageProperties, String> {
    @Query("SELECT b FROM CMessageProperties b where b.projectName=:projectName")
    List<CMessageProperties> getCMessagePropertiesByProjectName(@Param("projectName") String projectName);
    @Query("SELECT b FROM CMessageProperties b where b.id=:id")
    CMessageProperties getCMessagePropertiesById(@Param("id") int id);
}
