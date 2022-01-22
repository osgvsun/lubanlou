package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SchoolAcademy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校部门表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolAcademyJPA extends JpaRepository<SchoolAcademy, String>,
        JpaSpecificationExecutor<SchoolAcademy> {
    @Query("select s from SchoolAcademy s where s.academyNumber=?1")
    SchoolAcademy getSchoolAcademiesByAcademyNumber(String academyNumber);

    @Query(value = "select academy_number,academy_name from school_academy where is_vaild = 1", nativeQuery = true)
    List<Object[]> getAllowedSchoolAcademyList();
}
