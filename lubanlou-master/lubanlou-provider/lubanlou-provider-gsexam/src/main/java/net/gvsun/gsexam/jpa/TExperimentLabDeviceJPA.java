package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TExperimentLabDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-实验技能和设备关联表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TExperimentLabDeviceJPA extends JpaRepository<TExperimentLabDevice, Integer>,
        JpaSpecificationExecutor<TExperimentLabDevice> {
}
