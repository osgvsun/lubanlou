package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-考试控制表-对考试基础表t_assignment的参数控制—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentControlJPA extends JpaRepository<TAssignmentControl, Integer>,
        JpaSpecificationExecutor<TAssignmentControl> {

}
