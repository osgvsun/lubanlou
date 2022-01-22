package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.SchoolCourseStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校学生选课班表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolCourseStudentJPA extends JpaRepository<SchoolCourseStudent, Integer>,
        JpaSpecificationExecutor<SchoolCourseStudent> {
}
