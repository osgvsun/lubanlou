package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentGrading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试打分表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentGradingJPA extends JpaRepository<TAssignmentGrading, Integer>,
        JpaSpecificationExecutor<TAssignmentGrading> {

	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2")
	List<TAssignmentGrading> findTAssignmentGradingByIdAndUsername(Integer id, String username);
	//查询最大提交数
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 order by c.submitTime desc")
	List<TAssignmentGrading> findMaxSubmitTime(Integer assignmentId, String username);
	// 查询保存未提交的考试记录
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.testId = ?3 and c.submitTime = 0")
	List<TAssignmentGrading> findUnSubmitTAssignmentGradingMapping(Integer aid, String username, Integer testId);
}
