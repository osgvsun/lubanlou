package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.ObjectWeight;
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
public interface ObjectWeightJPA extends JpaRepository<ObjectWeight, Integer>,
        JpaSpecificationExecutor<ObjectWeight> {
	@Query(value = "select * from object_weight where object_id=?1 and weight_id=?2",nativeQuery = true)
	ObjectWeight findObjectWeightByObjectIdAndWeightId(Integer objectId,Integer weightId);
	@Query(value = "select count(*) from object_weight ow inner join t_grade_object tgo on tgo.id=ow.object_id " +
			"inner join t_gradebook tg on tg.id=tgo.grade_id " +
			"where tg.course_number=?1",nativeQuery = true)
	Integer countObjectWeightByCourseNumber(String courseNumber);
	@Query(value = "select GROUP_CONCAT(ow.weight_id) from object_weight ow inner join t_grade_object tgo on tgo.id=ow.id where tgo.experiment_title=?1", nativeQuery = true)
	String findWeightIdStr(String experimentTitle);
}
