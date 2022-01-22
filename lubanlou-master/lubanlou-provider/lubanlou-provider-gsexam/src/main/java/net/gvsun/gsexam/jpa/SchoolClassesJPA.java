package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校班级表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolClassesJPA extends JpaRepository<SchoolClass, Integer>,
        JpaSpecificationExecutor<SchoolClass> {
	@Query("select c from SchoolClass c where c.academyNumber=?1 ")
	List<SchoolClass> findAllClassesByAcademyNumber(String academyNumber);
	//根据班级编号查询班级
	@Query("select t from SchoolClass t where t.classNumber in ?1")
	List<SchoolClass> findClassByClassNumber(String[] schoolClasses);
	@Query("select s from SchoolClass s where s.classNumber=?1")
    SchoolClass getSchoolClassByClassNumber(String classNumber);

}
