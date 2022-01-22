package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SchoolTerm;
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
	//所有学期
	@Query("select t from SchoolTerm t order by t.termStart desc ")
	public List<SchoolTerm> findAllTerm();
	//获取当前学期
	@Query("select t.id from SchoolTerm t where t.nowTerm=1")
	public Integer getNowTerm();
	//获取当前学期
	@Query("select t from SchoolTerm t where t.nowTerm=1")
	public SchoolTerm getNowSchoolTerm();
	//根据名称获取学期
	@Query("select t from SchoolTerm t where t.termName=?1 ")
	public List<SchoolTerm> findTermByName(String name);
	//获取当前学期
	@Query("select t from SchoolTerm t where t.nowTerm=1")
	public List<SchoolTerm> findNowTerm();
}

