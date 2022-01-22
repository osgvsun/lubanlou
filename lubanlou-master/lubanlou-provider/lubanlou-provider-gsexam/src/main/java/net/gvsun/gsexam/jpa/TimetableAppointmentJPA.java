package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TimetableAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-排课表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TimetableAppointmentJPA extends JpaRepository<TimetableAppointment, Integer>,
        JpaSpecificationExecutor<TimetableAppointment> {
	@Query(value = "select * from timetable_appointment where site_id = ?1 and chapter_name = ?2",nativeQuery = true)
    TimetableAppointment findBySiteIdAndChapterName(Integer siteId, String chapterName);
}
