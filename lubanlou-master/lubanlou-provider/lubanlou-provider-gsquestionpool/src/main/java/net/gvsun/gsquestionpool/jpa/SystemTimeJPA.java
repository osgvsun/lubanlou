package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.SystemTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校校历表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemTimeJPA extends JpaRepository<SystemTime, Integer>,
        JpaSpecificationExecutor<SystemTime> {
}
