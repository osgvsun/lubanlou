package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TExperimentSkillUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-实验技能表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TExperimentSkillUserJPA extends JpaRepository<TExperimentSkillUser, Integer>,
        JpaSpecificationExecutor<TExperimentSkillUser> {
}
