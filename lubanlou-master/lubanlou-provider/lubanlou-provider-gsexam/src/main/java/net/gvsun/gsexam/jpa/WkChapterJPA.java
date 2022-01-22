package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.WkChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**************************************************************************
* @Description: 章节
* @Author: lxt
* @Date: 2017/10/8 21:22
**************************************************************************/
public interface WkChapterJPA extends JpaRepository<WkChapter,Integer>,
        JpaSpecificationExecutor<WkChapter> {
    @Query(value = "select * from wk_chapter where site_id=?1 and name=?2 and type=?3",nativeQuery = true)
    WkChapter findBySiteIdAndName(Integer siteId, String name, Integer type);
    @Query(value = "select name from wk_chapter where site_id=?1 order by id limit 0,2",nativeQuery = true)
    List<String> findAdmitChapter(Integer siteId);
    @Query(value = "select * from wk_chapter where id = ?1",nativeQuery = true)
    WkChapter findOne(Integer id);
}
