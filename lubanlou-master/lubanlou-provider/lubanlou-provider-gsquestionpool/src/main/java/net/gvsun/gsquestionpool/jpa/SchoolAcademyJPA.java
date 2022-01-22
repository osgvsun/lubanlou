package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.SchoolAcademy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校部门表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolAcademyJPA extends JpaRepository<SchoolAcademy, Integer>,
        JpaSpecificationExecutor<SchoolAcademy> {
}
