package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.WkFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

/**************************************************************************
* @Description: 微课文件夹
* @Author: 罗璇
* @Date: 2017/10/8 21:22
**************************************************************************/
public interface WkFolderJPA extends JpaRepository<WkFolder,Integer>,
        JpaSpecificationExecutor<WkFolder> {
    @Query(value = "select * from wk_folder where chapter_id = ?1 and name = ?2 and type = ?3",nativeQuery = true)
    WkFolder findTestFolder(Integer chapterId, String name, Integer type);
    @Query(value = "select * from wk_folder where lesson_id = ?1 and name = ?2 and type = ?3",nativeQuery = true)
    WkFolder findTestLessonIdFolder(Integer lessonId, String name, Integer type);

}
