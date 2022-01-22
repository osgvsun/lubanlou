package net.repository;

import net.domain.EmailConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailConfigJPA extends JpaRepository<EmailConfig,String> {
    @Query("select e from EmailConfig e where e.projectName=:projectName")
    EmailConfig findByProjectName(@Param("projectName") String projectName);
}
