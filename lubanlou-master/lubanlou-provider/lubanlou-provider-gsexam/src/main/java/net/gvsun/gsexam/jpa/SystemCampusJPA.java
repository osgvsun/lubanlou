package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SystemCampus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-学校教学班明细表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemCampusJPA extends JpaRepository<SystemCampus, Integer>,
        JpaSpecificationExecutor<SystemCampus> {
	@Query(value = "select * from system_campus where campus_default = 1",nativeQuery = true)
    SystemCampus findDefault();
}
