package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-题目题干答题表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentAnswerJPA extends JpaRepository<TAssignmentAnswer, Integer>,
        JpaSpecificationExecutor<TAssignmentAnswer> {
	//通过试题id查询对应答案
	@Query("select t from TAssignmentAnswer t where t.TAssignmentItem.id = ?1")
	public List<TAssignmentAnswer> findAnswersByTAssignmentId(Integer id);
}
