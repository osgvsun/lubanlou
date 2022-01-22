package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SystemBuild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-系统建筑表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemBuildJPA extends JpaRepository<SystemBuild, Integer>,
        JpaSpecificationExecutor<SystemBuild> {
}
