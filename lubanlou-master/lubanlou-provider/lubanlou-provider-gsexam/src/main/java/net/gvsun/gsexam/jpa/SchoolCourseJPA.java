package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校教学班表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolCourseJPA extends JpaRepository<SchoolCourse, String>,
        JpaSpecificationExecutor<SchoolCourse> {
}
