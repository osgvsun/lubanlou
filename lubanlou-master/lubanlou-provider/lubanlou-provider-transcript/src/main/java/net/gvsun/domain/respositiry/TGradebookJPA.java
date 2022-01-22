package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.TGradebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
	@Query("select c from TGradebook c where c.siteId = ?1")
	List<TGradebook> findTGradebookInSite(Integer siteId);
	@Query(value = "select * from t_gradebook where course_number = ?1",nativeQuery = true)
	List<TGradebook> findTGradebookInCourseNumber(String courseNumber);
	@Query(value = "select tg.course_number from t_gradebook tg inner join t_grade_object tgo on tgo.grade_id=tg.id where tgo.experiment_title=?1",nativeQuery = true)
	String findPracticeCourseNumber(String experimentTitle);

	@Query(value = "select tg.* from t_gradebook tg " +
			"inner join t_weight_setting tws on tws.course_number = tg.course_number " +
			"where tg.product = :product and " +
			"tg.term_number like CONCAT('%',:termNumber,'%') and tg.course_number like CONCAT('%',:courseNumber,'%') group by tg.course_number limit :page,:limit",nativeQuery = true)
	List<TGradebook> findByPracticeTimetablePage(@Param("product") String product,@Param("termNumber") String termNumber,@Param("courseNumber") String courseNumber,@Param("page") Integer page,@Param("limit") Integer limit);

	@Query(value = "select tg.* from t_gradebook tg " +
			"inner join t_weight_setting tws on tws.course_number = tg.course_number " +
			"where tg.product = :product and " +
			"tg.term_number like CONCAT('%',:termNumber,'%') and tg.course_number like CONCAT('%',:courseNumber,'%') group by tg.course_number ",nativeQuery = true)
	List<TGradebook> findByPracticeTimetable(@Param("product") String product,@Param("termNumber") String termNumber,@Param("courseNumber") String courseNumber);
}
