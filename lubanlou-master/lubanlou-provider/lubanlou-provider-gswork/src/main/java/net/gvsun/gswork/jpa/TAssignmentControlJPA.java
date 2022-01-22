package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TAssignmentControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-考试控制表-对考试基础表t_assignment的参数控制—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentControlJPA extends JpaRepository<TAssignmentControl, Integer>,
        JpaSpecificationExecutor<TAssignmentControl> {
    @Query("select t from TAssignmentControl t where 1=1 and t.TAssignment.id=?1")
    public TAssignmentControl findTAssignmentControlByAssignmentId(Integer id);

}
