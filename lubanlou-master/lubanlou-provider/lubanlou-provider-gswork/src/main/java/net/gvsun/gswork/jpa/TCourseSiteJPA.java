package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TCourseSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点（类似与选课组）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteJPA extends JpaRepository<TCourseSite, Integer>,
        JpaSpecificationExecutor<TCourseSite> {

	/**************************************************************************
	 * Description 站点动态获取
	 *
	 * @author 李雪腾
	 * @date 2017-10-18
	 * @param status 站点的状态
	 * @param isOpen 站点是否开放
	 * @return 站点集合
	 **************************************************************************/
	@Query("select c from TCourseSite c where c.status=?1 and c.isOpen=?2 order by c.id desc")
	List<TCourseSite> findAllTCourseSiteByStatusAndIsOpen(Integer status, Integer isOpen);
	@Query("select c from TCourseSite c where c.proStatus=2 and c.isOpen=1 order by c.id desc")
	List<TCourseSite> findPublishTCourseSite();
	@Query("select c from TCourseSite c where c.title=?1 ")
    TCourseSite findTCourseSiteByTitle(String siteName);
	@Query(value = "select * from t_course_site  where status = 1 and title like ?1 order by id desc",nativeQuery = true)
	List<TCourseSite> findAllTCourseSiteByStatus(String search);
	@Query("select c.title from TCourseSite c where c.status=1 and c.isOpen=1 order by c.id desc")
	List<String> findAllSiteNameByStatusAndIsOpen();
	@Query(value = "select * from t_course_site  where status = 1 and title like ?1 order by id desc limit ?2,?3",nativeQuery = true)
	List<TCourseSite> findAllTCourseSiteByStatusPage(String search,Integer page,Integer limit);
}
