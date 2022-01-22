package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentItemComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-作业或测试题题目表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentItemComponentJPA extends JpaRepository<TAssignmentItemComponent, Integer>,
        JpaSpecificationExecutor<TAssignmentItemComponent> {

}
