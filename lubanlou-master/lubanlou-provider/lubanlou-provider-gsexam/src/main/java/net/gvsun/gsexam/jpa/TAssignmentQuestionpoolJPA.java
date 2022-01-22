package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentQuestionpool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-题库主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentQuestionpoolJPA extends JpaRepository<TAssignmentQuestionpool, Integer>,
        JpaSpecificationExecutor<TAssignmentQuestionpool> {
    @Query(value = "select * from t_assignment_questionpool where questionpool_id = ?1",nativeQuery = true)
    TAssignmentQuestionpool findOne(Integer id);
}
