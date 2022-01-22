package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校班级表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolClassesJPA extends JpaRepository<SchoolClass, Integer>,
        JpaSpecificationExecutor<SchoolClass> {
}
