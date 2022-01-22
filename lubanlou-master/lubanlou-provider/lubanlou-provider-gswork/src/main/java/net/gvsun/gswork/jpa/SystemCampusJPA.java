package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SystemCampus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-校区表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemCampusJPA extends JpaRepository<SystemCampus, String>,
        JpaSpecificationExecutor<SystemCampus> {
    @Query("select s from SystemCampus  s where s.campusNumber=?1")
    public SystemCampus findByPrimaryKey(String campusNumber);

    @Query("select s from SystemCampus  s where s.campusDefault=1")
    List<SystemCampus> findAllDefultCampus();

    @Query("select s from SystemCampus  s where s.campusDefault=1")
    SystemCampus getDefultCampus();
}
