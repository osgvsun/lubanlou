package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-课程站点成绩册主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TWeightSettingJPA extends JpaRepository<TUpdate, Integer>,
        JpaSpecificationExecutor<TUpdate> {

}
