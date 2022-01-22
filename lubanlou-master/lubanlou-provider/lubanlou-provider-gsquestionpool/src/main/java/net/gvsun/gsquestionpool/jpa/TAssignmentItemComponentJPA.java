package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentItemComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试题题目表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentItemComponentJPA extends JpaRepository<TAssignmentItemComponent, Integer>,
        JpaSpecificationExecutor<TAssignmentItemComponent> {
	@Query("select t from TAssignmentItemComponent t where t.TAssignmentQuestionpool.id=?1")
	List<TAssignmentItemComponent>findItemComponentByQuestionpoolId(Integer QuestionpoolId);
}
