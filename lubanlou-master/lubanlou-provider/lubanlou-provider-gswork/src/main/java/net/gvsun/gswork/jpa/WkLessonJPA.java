package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.WkLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by Administrator on 2018/1/15.
 */
public interface WkLessonJPA extends JpaRepository<WkLesson,Integer>,
        JpaSpecificationExecutor<WkLesson> {
    //列出小节
    @Query("select l from WkLesson l where l.wkChapter.id=?1 order by l.seq asc ")
    public List<WkLesson> findWklessonByChapterId(Integer chapterId);
    //查询小节最大序号
    @Query("select max(l.seq) from WkLesson l where l.wkChapter.id=?1")
    public Integer findLessonMaxSeq(Integer chaperId);
    //根据章节id查询小节
    @Query("select l from WkLesson l where l.wkChapter.id=?1")
    public WkLesson findLessonByChapterId(Integer chapterId);
    @Query("select l from WkLesson l where l.wkChapter.id=?1 and l.id=?2")
    public WkLesson findLesson(Integer chapterId, Integer lessonId);
    //查询排序值比选中节大的节
    @Query("select min(w.seq) from WkLesson w where w.seq>?1")
    public Integer querybigLessonSeqById(Integer seq);
    //查询排序值比选中节小的节
    @Query("select max(w.seq) from WkLesson w where w.seq<?1")
    public Integer querysmallLessonSeqById(Integer seq);
    //根据seq获取相应的wklesson
    @Query("select w from WkLesson w where 1=1 and w.seq=?1 and w.wkChapter.id=?2")
    public WkLesson findWklessonBySeqAndChapter(Integer seq, Integer chapterId);
}
