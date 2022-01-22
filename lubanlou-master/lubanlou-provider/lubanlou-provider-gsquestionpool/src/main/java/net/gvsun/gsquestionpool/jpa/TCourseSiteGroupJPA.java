package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TCourseSiteGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-课程站点的分组（平行班）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteGroupJPA extends JpaRepository<TCourseSiteGroup, Integer>,
        JpaSpecificationExecutor<TCourseSiteGroup> {

}
