package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.WkLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

/**************************************************************************
* @Description: 课时
* @Author: lxt
* @Date: 2017/10/8 21:22
**************************************************************************/
public interface WkLessonJPA extends JpaRepository<WkLesson,Integer>,
        JpaSpecificationExecutor<WkLesson> {
    @Query(value = "select wl.* from wk_lesson wl " +
            "inner join wk_chapter wc on wc.id = wl.chapter_id " +
            "inner join t_course_site t on t.id = wc.site_id where t.id=?1 and wl.title = ?2 and wc.type =?3",nativeQuery = true)
    WkLesson findWkLessonBySiteIdAndTitle(Integer siteId, String title, Integer type);
}
