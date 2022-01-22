package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolAcademy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校部门表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolAcademyJPA extends JpaRepository<SchoolAcademy, Integer>,
        JpaSpecificationExecutor<SchoolAcademy> {
	@Query("select s from SchoolAcademy s where s.academyNumber=?1")
    SchoolAcademy getSchoolAcademiesByAcademyNumber(String academyNumber);
	//根据班级编号查询班级
	@Query("select t from SchoolAcademy t where t.academyNumber in ?1")
	List<SchoolAcademy> findAcademyByAcademyNumber(String[] schoolAcademy);
}
