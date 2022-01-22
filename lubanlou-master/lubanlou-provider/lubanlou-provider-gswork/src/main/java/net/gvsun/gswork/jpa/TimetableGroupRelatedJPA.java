package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TimetableGroupRelated;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-排课-分组关联表
 *
 * @author Hezhaoyi
 * @date 2020-3-4
 ****************************************************************************/
public interface TimetableGroupRelatedJPA extends JpaRepository<TimetableGroupRelated, Integer>,
        JpaSpecificationExecutor<TimetableGroupRelated> {
    @Query(" select c from TimetableGroupRelated c where c.timetableAppointment = ?1 ")
    List<TimetableGroupRelated> findTimetableGroupRelatedsByAppointmentId(Integer id);
}


