package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TExperimentSkill;
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
	@Query("select t from TExperimentSkill t where t.siteId=?1 and (t.experimentStatus<>0 or t.experimentStatus is null) order by t.sort asc")
	List<TExperimentSkill> findSkillListBySiteId(Integer siteId);
	@Query("select t from TExperimentSkill t where t.chapterId=?1")
    TExperimentSkill findTExperimentSkillByChapterId(Integer chapterId);
}
