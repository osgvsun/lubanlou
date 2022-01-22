package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TCourseSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/****************************************************************************
 * Description 教学系统-课程相关信息介绍—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteTagJPA extends JpaRepository<TCourseSite, Integer>,
        JpaSpecificationExecutor<TCourseSite> {

}
