package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SchoolWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-学校周次表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolWeekJPA extends JpaRepository<SchoolWeek, Integer>,
        JpaSpecificationExecutor<SchoolWeek> {
	@Query(value = "select * from school_week where term_id=?1 and week=?2 and weekday=?3",nativeQuery = true)
    SchoolWeek findByTermAndWeekAndWeekday(Integer termId, Integer week, Integer weekday);
}
