package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SystemTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校校历表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemTimeJPA extends JpaRepository<SystemTime, Integer>, JpaSpecificationExecutor<SystemTime> {

    //节次查询
    @Query("select c from SystemTime c where c.systemCampus.campusNumber=?1 order by c.id")
    Page<SystemTime> getSystemTimeBySystemCampusId(String campusNumber, Pageable pageable);

    @Query("select s from SystemTime  s where s.systemCampus.campusNumber=:campusNumber")
    List<SystemTime> findByCampusNumber(@Param("campusNumber") String campusNumber);

    @Query("select s from SystemTime  s where s.systemCampus.campusNumber=?1 and s.timeName=?2")
    SystemTime findByCampusNumberAndId(String campusNumber, String timeName);
}
