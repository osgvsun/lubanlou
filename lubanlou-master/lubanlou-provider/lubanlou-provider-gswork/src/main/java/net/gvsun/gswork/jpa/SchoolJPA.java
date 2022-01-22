package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 学校表
 *
 * @author 黄浩
 * @date 2018年9月13日
 ****************************************************************************/
public interface SchoolJPA extends JpaRepository<School, Integer>,
        JpaSpecificationExecutor<School> {
    @Query("select s from School s where s.number=?1")
    List<School> findSchoolByNumber(Integer schoolNumber);
}
