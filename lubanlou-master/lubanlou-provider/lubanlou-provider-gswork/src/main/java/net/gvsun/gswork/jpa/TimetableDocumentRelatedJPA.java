package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TimetableDocumentRelated;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-排课-文档关联表
 *
 * @author Hezhaoyi
 * @date 2020-3-4
 ****************************************************************************/
public interface TimetableDocumentRelatedJPA extends JpaRepository<TimetableDocumentRelated, Integer>,
        JpaSpecificationExecutor<TimetableDocumentRelated> {

    @Query(" select c from TimetableDocumentRelated c where c.timetableAppointment = ?1 ")
    List<TimetableDocumentRelated> findTimetableDocumentRelatedsByAppointmentId(Integer id);
}