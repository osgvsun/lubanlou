package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.ExamSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 试卷库大项
 * 
 * @author lixueteng
 * @date 2017-12-01
 ****************************************************************************/
public interface ExamSectionJPA extends JpaRepository<ExamSection, Integer>,
        JpaSpecificationExecutor<ExamSection> {
}
