package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SystemTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-学校校历表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemTimeJPA extends JpaRepository<SystemTime, Integer>,
        JpaSpecificationExecutor<SystemTime> {
	@Query(value = "select * from system_time where time_name=?1 and campus_number=?2",nativeQuery = true)
    SystemTime findByTimeNameAndCampus(String timeName, String campus);
}
