package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TCourseSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

/****************************************************************************
 * Description 教学系统-课程站点（类似与选课组）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteJPA extends JpaRepository<TCourseSite, Integer>,
        JpaSpecificationExecutor<TCourseSite> {
    @Query(value = "select * from t_course_site where id = ?1",nativeQuery = true)
    TCourseSite findOne(Integer id);

}
