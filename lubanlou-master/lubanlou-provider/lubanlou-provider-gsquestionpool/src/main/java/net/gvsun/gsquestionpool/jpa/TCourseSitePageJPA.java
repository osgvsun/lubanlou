package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TCourseSitePage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-课程网站相关网页表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSitePageJPA extends JpaRepository<TCourseSitePage, Integer>,
        JpaSpecificationExecutor<TCourseSitePage> {

}
