package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolTerm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校学期表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolTermJPA extends JpaRepository<SchoolTerm, Integer>,
        JpaSpecificationExecutor<SchoolTerm> {
	@Query("select t from SchoolTerm t order by t.termStart asc ")
	public List<SchoolTerm> findAllTerm();
	@Query(value = "select * from school_term wher id = ?1",nativeQuery = true)
    SchoolTerm findOne(Integer id);
}
