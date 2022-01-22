package net.repository;


import net.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/*************************************************************************************
 * Description:项目JPA
 *
 * @author: 曹焕
 * @date: 2019/8/01
 *************************************************************************************/
public interface ProjectJPA extends JpaRepository<Project, String>,
        JpaSpecificationExecutor<Project> {

    @Query("select s.id from Project s where s.projectName=:projectName")
    Integer getProjectIdByProjectName(@Param("projectName") String projectName);

    @Query("select s.id from Project s where s.project=?1")
    Integer getProjectIdByProject(String project);

    @Query("select s from Project s where s.project=?1")
    Project getProjectByProject(String project);
}
