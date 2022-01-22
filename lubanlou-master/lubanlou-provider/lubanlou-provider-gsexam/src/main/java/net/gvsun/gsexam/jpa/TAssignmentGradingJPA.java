package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentGrading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试打分表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentGradingJPA extends JpaRepository<TAssignmentGrading, Integer>,
        JpaSpecificationExecutor<TAssignmentGrading> {
	@Query(value = "select * from t_assignment_grading where accessmentgrading_id = ?1",nativeQuery = true)
    TAssignmentGrading findOne(Integer id);
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2")
	List<TAssignmentGrading> findTAssignmentGradingByIdAndUsername(Integer id, String username);
	//查询最大提交数
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 order by c.submitTime desc")
	List<TAssignmentGrading> findMaxSubmitTime(Integer assignmentId, String username);
	// 查询保存未提交的考试记录
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.testId = ?3 and c.submitTime = 0")
	List<TAssignmentGrading> findUnSubmitTAssignmentGradingMapping(Integer aid, String username, Integer testId);

	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 order by c.submitdate desc")
	List<TAssignmentGrading> findStudentSubmitTime(Integer aid, String username);
	/**************************************************************************
	 * Description:获取当前考试的 所有的学生的成绩
	 * @param aid 考试的id
	 * @return 参见考试的学生的成绩
	 * @author：李雪腾
	 * @date ：2017-10-18
	 **************************************************************************/
	@Query("select g from TAssignmentGrading g where g.TAssignment.id= ?1")
    Page<TAssignmentGrading> findExamAllGrading(Integer aid, Pageable pageable);
    /**************************************************************************
     * Description:获取当前考试的 当前登录学生的成绩
     * @param aid 考试的id
     * @return 参见考试的学生的成绩
     * @author：洪春莹
     * @date ：2018-12-03
     **************************************************************************/
    @Query("select g from TAssignmentGrading g where g.TAssignment.id= ?1 and g.userByStudent.username=?2")
    Page<TAssignmentGrading> findExamStudentGrading(Integer aid, String username, Pageable pageable);

	/**************************************************************************
	 * Description:获取当前考试的已经提交的学生的人数
	 * @param aid 考试的id
	 * @return 提交学生的人数的姓名的集合
	 * @author：李雪腾
	 * @date ：2017-10-18
	 **************************************************************************/
	@Query("select g.userByStudent.username from TAssignmentGrading g where g.TAssignment.id= ?1 group by g.userByStudent.username")
	List<String> getCommitStudentNumber(Integer aid);
	/**************************************************************************
	 * Description:获取当前考生的提交次数
	 * @param aid 考试的id
	 * @return 获取当前考生的提交次数
	 * @author：李雪腾
	 * @date ：2017-11-03
	 **************************************************************************/
	@Query("select max(g.submitTime) from TAssignmentGrading g where g.TAssignment.id= ?1 and g.userByStudent.username=?2")
	Integer getCurrUserExamCommitTime(Integer aid, String username);
	//查找所有不及格的记录
	@Query(value = "select tag.* from t_assignment_grading tag where tag.assignment_id = ?1 and tag.final_score < ?2 and tag.final_score = " +
			"(select max(c.final_score) from t_assignment_grading c where c.assignment_id = ?1 and c.final_score < ?2 and c.student = tag.student) group by tag.assignment_id ,tag.student",nativeQuery = true)
	List<TAssignmentGrading> findTAssignmentGradingById(Integer id, Double passingScore);
	//查找所有及格的记录
	@Query("select c.userByStudent.username from TAssignmentGrading c where c.TAssignment.id = ?1 and c.finalScore >= ?2 ")
	List<String> findPassingStudentById(Integer id, Double passingScore);
	//查找所有完成考试的学生
	@Query("select c.userByStudent.username from TAssignmentGrading c where c.TAssignment.id = ?1")
	List<String> findAllStudentById(Integer id);
	//根据examId获取所有人的考试成绩
	@Query("select g from TAssignmentGrading g where g.TAssignment.id= ?1")
	List<TAssignmentGrading> findAllExamGradingById(Integer examId);
	@Query(value = "select count(*) from t_assignment_grading  where assignment_id = ?1 and final_score > ?2 and student=?3",nativeQuery = true)
	Integer countFindTAssignmentGradingById(Integer id, Double passingScore, String username);
	@Query(value = "select count(*) from t_assignment_grading  where assignment_id = ?1 and student=?2",nativeQuery = true)
	Integer countTAssignmentGradingById(Integer id, String username);
}
