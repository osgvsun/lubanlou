package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TimetableAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-排课表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TimetableAppointmentJPA extends JpaRepository<TimetableAppointment, Integer>,
        JpaSpecificationExecutor<TimetableAppointment> {
}
