package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TExperimentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-实验技能表—JPA通用数据操作
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TExperimentSkillJPA extends JpaRepository<TExperimentSkill, Integer>,
        JpaSpecificationExecutor<TExperimentSkill> {
    //通过siteId查询实验列表
    @Query("select t from TExperimentSkill t where t.siteId=?1 and (t.experimentStatus<>0 or t.experimentStatus is null) and t.experimentIsopen=1 order by t.sort asc")
    List<TExperimentSkill> findOpenSkillListBySiteId(Integer siteId);

    //通过siteId查询实验列表
    @Query(value = "select t.* from t_experiment_skill t where t.site_id=?1 and (t.experiment_status<>0 or t.experiment_status is null) order by t.sort is null ,t.sort", nativeQuery = true)
    List<TExperimentSkill> findSkillListBySiteId(Integer siteId);

    //查询详细的实验内容
    @Query("select t from TExperimentSkill t where t.siteId=?1 and t.id=?2")
    TExperimentSkill findSkillBySiteIdAndSkillId(Integer siteId, Integer skillId);

    @Query("select t from TExperimentSkill t where t.chapterId=?1")
    TExperimentSkill findTExperimentSkillByChapterId(Integer chapterId);

    @Query("select t from TExperimentSkill t where t.id=?1")
    TExperimentSkill findTExperimentSkillById(Integer id);

    @Query("select max(t.sort) from TExperimentSkill t where t.siteId=?1")
    Integer findMaxSortChapter(Integer siteId);

    @Query("select t from TExperimentSkill t where t.lessonId=?1")
    TExperimentSkill findTExperimentSkillByLessonId(Integer lessonId);

    @Query("select t.chapterId from TExperimentSkill t where t.siteId=?1 and t.experimentIsopen = 1 ")
    List<Integer> findSkillChapterIdBySiteId(Integer siteId);

    @Query("select t from TExperimentSkill t where t.siteId=?1 and t.chapterId=?2 and t.experimentIsopen = 1 ")
    TExperimentSkill findSkillChapterIdBySiteId(Integer siteId,Integer chapterId);

    @Query("select t from TExperimentSkill t where t.siteId=?1 and t.experimentIsopen = 1 ")
    List<TExperimentSkill> findExperimentSkillListBySiteId(Integer siteId);

    @Query("select t from TExperimentSkill t where t.chapterId=?1 and t.experimentIsopen = 1 ")
    TExperimentSkill findExpSkillByChapterId(Integer chapterId);
}
