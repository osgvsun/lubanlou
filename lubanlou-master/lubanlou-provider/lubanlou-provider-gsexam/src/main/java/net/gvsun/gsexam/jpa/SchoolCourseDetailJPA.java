package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolCourseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-学校教学班明细表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolCourseDetailJPA extends JpaRepository<SchoolCourseDetail, Integer>,
        JpaSpecificationExecutor<SchoolCourseDetail> {
}
