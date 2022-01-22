package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentAnswerAssign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-作业表的参考答案及得分—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentAnswerAssignJPA extends JpaRepository<TAssignmentAnswerAssign, Integer>,
        JpaSpecificationExecutor<TAssignmentAnswerAssign> {
	@Query("select c from TAssignmentAnswerAssign c where c.TAssignment.id = ?1 ")
    TAssignmentAnswerAssign findTAssignmentAnswerAssignByExamId(Integer id);

}
