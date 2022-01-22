package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.WkFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-章节内容表—JPA通用数据操作
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface WkFolderJPA extends JpaRepository<WkFolder, Integer>,
        JpaSpecificationExecutor<WkFolder> {
    @Query("select f from WkFolder f where  f.id=?1")
    WkFolder findOne(Integer id);
    @Query("select f from WkFolder f where f.wkChapter.id=?1")
    public List<WkFolder> findWkFolderByChapterId(Integer chapterId);

    @Query("select f from WkFolder f where f.wkLesson.id=?1")
    public List<WkFolder> findWkFolderByLessonId(Integer lessonId);

    @Query("select f from WkFolder f where f.wkLesson.id=?1 and f.type=?2")
    public List<WkFolder> findWkFolderByLessonIdAndType(Integer lessonId, Integer type);

    @Query("select f from WkFolder f left join TAssignment t on f.id=t.wkFolder.id where f.wkLesson.id=?1 and f.type=?2 and t.status=1")
    public List<WkFolder> findWkFolderByLessonIdAndTypeAndStatus(Integer lessonId, Integer type);

    //分类查询章节文件
    @Query("select f from WkFolder f where f.wkChapter.id=?1 and f.type=?2")
    public List<WkFolder> findAllWkFolderByChapterId(Integer chapterId, Integer type);

    @Query("select f from WkFolder f where f.wkChapter.id=?1 and f.type=?2")
    public WkFolder findWkFolderByChapterId(Integer chapterId, Integer type);

    public WkFolder findWkFolderById(Integer id);

    @Query("select f from WkFolder f where f.wkChapter.id=?1")
    public WkFolder findWkFolderByChapterIds(Integer chapterId);

    @Query("select f from WkFolder f where f.wkLesson.id=?1")
    public WkFolder findWkFolderByLesson(Integer lesson);

    @Query(value = "select * from wk_folder where type=?1 and to_mobile=?2",nativeQuery = true)
    public List<WkFolder> findTheSameSpace(Integer type, Integer appointmentId);

    //分类查询章节文件
    @Query("select f from WkFolder f left join TAssignment t on f.id=t.wkFolder.id where f.wkChapter.id=?1 and f.type=?2 and t.status=1")
    public List<WkFolder> findAllWkFolderByChapterIdAndStatus(Integer chapterId, Integer type);
}
