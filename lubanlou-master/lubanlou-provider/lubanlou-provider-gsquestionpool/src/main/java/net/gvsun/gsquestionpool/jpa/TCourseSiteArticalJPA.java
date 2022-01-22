package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TCourseSiteArtical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-课程站点（类似与选课组）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteArticalJPA extends JpaRepository<TCourseSiteArtical, Integer>,
        JpaSpecificationExecutor<TCourseSiteArtical> {

}
