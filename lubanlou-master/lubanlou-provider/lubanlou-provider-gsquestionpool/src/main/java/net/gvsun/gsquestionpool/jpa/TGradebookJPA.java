package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TGradebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点成绩册主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TGradebookJPA extends JpaRepository<TGradebook, Integer>,
        JpaSpecificationExecutor<TGradebook> {


	//查询该课程成绩簿
	@Query("select c from TGradebook c where c.TCourseSite.id = ?1")
	List<TGradebook> findTGradebookInSite(Integer cid);

}
