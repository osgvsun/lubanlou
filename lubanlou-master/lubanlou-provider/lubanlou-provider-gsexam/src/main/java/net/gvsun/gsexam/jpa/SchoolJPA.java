package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-学校部门表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolJPA extends JpaRepository<School, Integer>,
        JpaSpecificationExecutor<School> {
	@Query("select s from School s where s.projectName=?1")
    School findSchoolByProjectName(String projectName);

	@Query(value = "select * from school limit 0,1 ",nativeQuery = true)
    School selectFirst();
}
