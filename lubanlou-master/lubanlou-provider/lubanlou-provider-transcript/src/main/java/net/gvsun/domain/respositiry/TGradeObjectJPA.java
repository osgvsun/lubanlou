package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.TGradeObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-成绩册中的考试名称或作业名称—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TGradeObjectJPA extends JpaRepository<TGradeObject, Integer>,
        JpaSpecificationExecutor<TGradeObject> {
	//查询测验对应成绩题目
	@Query("select c from TGradeObject c where c.gradeId = ?1 and c.assignmentId = ?2")
	List<TGradeObject> findTGradeObjectByBookIdAndAid(Integer tGradeBookId, String tAssignmentId);
	@Query(value = "select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.site_id=?1 and tgo.assignment_id=?2 and tgo.module is not null",nativeQuery = true)
	TGradeObject findTGradeObjectBySiteId(Integer siteId,String assignmentId);
	@Query(value = "select * from t_grade_object as tgo inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id=?1 and tgo.module =?2 and tgo.type <> 'assignment'",nativeQuery = true)
	List<TGradeObject> findTGradeObjectBySiteIdAndModule(Integer siteId,String module);
	@Query(value = "select * from t_grade_object as tgo inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id=?1 and tgo.module =?2 and tgo.type=?3",nativeQuery = true)
	List<TGradeObject> findTGradeObjectBySiteIdAndModuleAndType(Integer siteId,String module,String type);
	@Query(value = "select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id=?1 and tgo.module =?2 and tgo.experiment_id is not null group by tgo.experiment_id order by tgo.experiment_id",nativeQuery = true)
	List<TGradeObject> findTGradeObjectBySiteIdAndModuleGroupByExperimentId(Integer siteId,String module);
	@Query(value = "select tgo.* from t_grade_object as tgo where tgo.type=?1 and tgo.module=?2",nativeQuery = true)
	TGradeObject findTGradeObjectByTypeAndModule(String type,String module);
	@Query(value = "select tgo.* from t_grade_object as tgo where tgo.assignment_id=?1 ",nativeQuery = true)
	TGradeObject findTGradeObjectByAssignmentId(String assignmentId);
	@Query(value = "select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.site_id=?1 and tgo.experiment_id=?2 and tgo.module = 'skill' and tgo.type='report'",nativeQuery = true)
	List<TGradeObject> findTGradeObjectBySiteIdAndExperimentId(Integer siteId,Integer experimentId);
	@Query(value = "select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.course_number=?1 and tgo.assignment_id=?2 and tgo.module is not null",nativeQuery = true)
	TGradeObject findTGradeObjectByCourseNumber(String courseNumber,String assignmentId);
	@Query(value = "select * from t_grade_object where id=?1",nativeQuery = true)
	TGradeObject findOne(Integer id);
	@Query(value = "select GROUP_CONCAT(tgo.id) from t_grade_object tgo inner join t_gradebook tg on tg.id = tgo.grade_id where tg.course_number=?1",nativeQuery = true)
	String findTGradeObjectIdByCourseNumber(String courseNumber);
	@Query(value = "select * from t_grade_object tgo where tgo.experiment_title=?1",nativeQuery = true)
	TGradeObject findTGradeObjectByExperimentTitle(String experimentTitle);
	@Query(value = "select * from t_grade_object tgo where tgo.experiment_title=?1",nativeQuery = true)
	List<TGradeObject> findListByExperimentTitle(String experimentTitle);

	@Query(value = "select count(*) from t_grade_object where grade_id = ?1 and marked = 0",nativeQuery = true)
	Integer countMarkedWork(Integer gradeId);
}
