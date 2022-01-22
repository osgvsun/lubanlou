package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TimetableSkillRelated;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校权限表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TimetableSkillRelatedJPA extends JpaRepository<TimetableSkillRelated, Integer>,
        JpaSpecificationExecutor<TimetableSkillRelated> {
    @Query(value = "select * from timetable_skill_related where appointment_id=?1",nativeQuery = true)
    List<TimetableSkillRelated> findTimetableSkills(Integer appointmentId);
}
