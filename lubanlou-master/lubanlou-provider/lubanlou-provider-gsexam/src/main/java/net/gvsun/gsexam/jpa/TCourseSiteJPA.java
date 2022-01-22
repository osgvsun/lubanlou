package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TCourseSite;
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
	@Query(value = "select * from t_course_site  where status = ?1 and title like ?2 order by id desc",nativeQuery = true)
	List<TCourseSite> findAllTCourseSiteByStatus(Integer status,String search);
	@Query(value = "select t.* from t_course_site t inner join wk_chapter wc on wc.site_id = t.id where wc.`name` = ?1 and wc.type = ?2 and t.id <> ?3",nativeQuery = true)
	List<TCourseSite> findCopySiteByChapter(String chapterName, Integer chapterType, Integer cid);
	@Query(value = "select id from t_course_site where title = '全校考试'",nativeQuery = true)
	Integer specialSiteId();
	@Query(value = "select * from t_course_site where id = ?1",nativeQuery = true)
    TCourseSite findOne(Integer id);
	@Query(value = "select * from t_course_site  where status = ?1 and title like ?2 order by id desc limit ?3,?4",nativeQuery = true)
	List<TCourseSite> findAllTCourseSiteByStatusPage(Integer status,String search,Integer page,Integer limit);

}
