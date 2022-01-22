package net.gvsun.gswork.jpa;


import net.gvsun.gswork.domain.WkChapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-章节表—JPA通用数据操作
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface WkChapterJPA extends JpaRepository<WkChapter,Integer>,
        JpaSpecificationExecutor<WkChapter> {
        //列出知识课程章节
        @Query("select w from WkChapter w where w.TCourseSite.id=?1 and w.type=?2 order by w.seq asc ")
        public List<WkChapter> findWkChapterBySiteId(Integer siteId, Integer type);
        @Query("select w from WkChapter w where w.TCourseSite.id=?1 order by w.seq asc ")
        public List<WkChapter> findAllWkChapterBySiteId(Integer siteId);
        //查询序号最大的章节
        @Query("select max(w.seq) from WkChapter w where w.TCourseSite.id=?1")
        public Integer findMaxSeqChapter(Integer siteId);
        //查询排序值比选中章节小的章节
        @Query("select max(w.seq) from WkChapter w where w.TCourseSite.id=?1 and w.seq<?2 and w.type=?3")
        public Integer querysmallChapterSeqBySiteIdAndModuleType(Integer siteId, Integer seq, Integer moduleType);
        //查询排序值比选中章节大的章节
        @Query("select min(w.seq) from WkChapter w where w.TCourseSite.id=?1 and w.seq>?2 and w.type=?3")
        public Integer querybigChapterSeqBySiteIdAndModuleType(Integer siteId, Integer seq, Integer moduleType);
        //根据seq获取相应的chapter
        @Query("select w from WkChapter w where 1=1 and w.seq=?1 and w.TCourseSite.id=?2 and w.type=?3")
        public WkChapter findChapterBySeq(Integer seq, Integer siteId, Integer moduleType);
        //列出技能章节以及实验项目
        @Query("select w from WkChapter w where w.TCourseSite.id=?1 and w.type=?2 order by w.id asc ")
        public List<WkChapter> findSkillChapterBySiteId(Integer siteId, Integer type);
        //根据id查找
        @Query("select w from WkChapter w where w.id=?1")
        public WkChapter findChapterById(Integer Id);
}
