package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.WkUpload;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-学校权限表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface WkUploadJPA extends JpaRepository<WkUpload, Integer>,
        JpaSpecificationExecutor<WkUpload> {
    //查询体验模块小组文档
    @Query("select w from WkUpload w where w.tCourseSiteGroup.id=?1")
    List<WkUpload> findAllGroupDocument(Integer groupId);

    //根据类别获取实验技能资源
    @Query("select w from WkUpload w where w.wkFolder.wkChapter.id =?1 and w.type =?2")
    List<WkUpload> findWkUploadByChapterIdAndType(Integer chapterId, Integer type);

    //查询最新的文件id
    @Query("select max(w.id) from WkUpload w")
    public Integer findMaxId();

    //根据accessmentgradingId查询WkUpload表中上传的记录
    @Query("select w from WkUpload w where w.tAssignmentGrading.accessmentgradingId=?1")
    List<WkUpload> findWkUploadByAccessmentgradingId(Integer accessmentgradingId);

    //根据文件夹id查询文件
    @Query("select w from WkUpload w where w.wkFolder.id=?1 order by w.id desc")
    List<WkUpload> findWkUploadByFolderId(Integer folderId);

    //查询站点下面的知识图谱
    @Query("select w from WkUpload w where w.siteId=?1 and w.type=?2")
    List<WkUpload> getWkUploadBySiteIdAndType(Integer siteId, Integer type);

    //查询站点下面的文档
    @Query("select w from WkUpload w where w.siteId=?1")
    List<WkUpload> getWkUploadBySiteId(Integer siteId);

    //查询课程分组下的文档
    @Query("select w from WkUpload w where w.tCourseSiteGroup.id=?1")
    List<WkUpload> findWkUploadByGroupId(Integer groupId);

    @Query("select w from WkUpload w where w.type=?1 and w.tCourseSiteGroup.id=?2 order by w.id")
    List<WkUpload> findWkUploadsByTypeAndGroupId(Integer type, Integer groupId);

    @Query("select w from WkUpload w where w.type=?1 and w.tCourseSiteGroup.id=?2")
    List<WkUpload> countWkUploadsByTypeAndGroupId(Integer type, Integer groupId);

    //根据username查询文档
    @Query("select w from WkUpload w where w.user.username =?1 and w.tCourseSiteGroup.id=?2")
    List<WkUpload> findGroupDocumentByUsername(String username, Integer groupId);

    @Query("select w from WkUpload w where w.newUrl=?1")
    List<WkUpload> findWkuploadByNewUrl(String url);

    //根据文件夹id查询文件
    @Query("select w from WkUpload w where w.wkFolder.id=?1 and w.user.username=?2 order by w.id desc")
    List<WkUpload> findWkUploadByFolderIdAndUserName(Integer folderId, String userName);

    //根据id
    @Query("select w from WkUpload w where w.id=?1 order by w.id desc")
    WkUpload findWkUploadById(Integer Id);

    //根据章节获取实验技能资源
    @Query("select w from WkUpload w where w.wkFolder.wkChapter.id =?1")
    List<WkUpload> findWkUploadByChapterId(Integer chapterId);

    /**
     * 根据节次id获取节次下所有的文件
     *
     * @author 付世亮
     * @date 2020-04-10
     */
    @Query(value = " SELECT wu.id as id, wu.`name` as name, wu.newurl as newurl,wu.size as size FROM wk_upload AS wu INNER JOIN wk_folder AS wf ON wf.id = wu.folder_id WHERE wf.lesson_id = ?1 ",
            countQuery = "SELECT count(*) FROM wk_upload AS wu INNER JOIN wk_folder AS wf ON wf.id = wu.folder_id WHERE wf.lesson_id = ?1",
            nativeQuery = true)
    Page<Object[]> getFilesByLessonId(Integer lessonId, Pageable pageable);

    /**
     * 根据文件夹id获取文件夹下所有的文件
     *
     * @author 付世亮
     * @date 2020-04-10
     */
    @Query(value = "SELECT wu.id AS id, wu.`name` AS NAME, wu.newurl AS newurl, wu.size AS size FROM wk_upload AS wu WHERE wu.folder_id = ?1",
            countQuery = "SELECT count(*) AS id, wu.`name` AS NAME, wu.newurl AS newurl, wu.size AS size FROM wk_upload AS wu WHERE wu.folder_id = ?1",
            nativeQuery = true)
    Page<Object[]> getFilesByFolderId(Integer folderId, Pageable pageable);
}
