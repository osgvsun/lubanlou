package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentAnswerAssign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-作业表的参考答案及得分—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentAnswerAssignJPA extends JpaRepository<TAssignmentAnswerAssign, Integer>,
        JpaSpecificationExecutor<TAssignmentAnswerAssign> {

}
