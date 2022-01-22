package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TExerciseAnswerRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点（类似与选课组）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TExerciseAnswerRecordJPA extends JpaRepository<TExerciseAnswerRecord, Integer>,
        JpaSpecificationExecutor<TExerciseAnswerRecord> {
	//通过试题答案查询答案记录
	@Query("select t from TExerciseAnswerRecord t where t.TAssignmentAnswer.id = ?1")
	public List<TExerciseAnswerRecord> findRecordByANswerId(Integer answerId);
}
