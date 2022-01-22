package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TAssignmentGrading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;


/****************************************************************************
 * Description 教学系统-作业或测试打分表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentGradingJPA extends JpaRepository<TAssignmentGrading, Integer>,
        JpaSpecificationExecutor<TAssignmentGrading> {

	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2")
	List<TAssignmentGrading> findTAssignmentGradingByIdAndUsername(Integer id, String username);
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2")
    List<TAssignmentGrading> findTAssignmentGradingByAssignmentIdAndUsername(Integer id, String username);
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 order by c.submitTime desc")
	List<TAssignmentGrading> findTAssignmentGradingByAssignmentId(Integer id);
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.finalScore<>''")
	List<TAssignmentGrading> findTAssignmentGradingByIdAndUsernameAndScore(Integer id, String username);
	//查询最大提交数
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 order by c.submitTime desc")
	List<TAssignmentGrading> findMaxSubmitTime(Integer assignmentId, String username);
	// 查询保存未提交的考试记录
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.testId = ?3 and c.submitTime = 0")
	List<TAssignmentGrading> findUnSubmitTAssignmentGradingMapping(Integer aid, String username, Integer testId);
	// 查询记录
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.submitTime = ?3")
	List<TAssignmentGrading> findExamGradingBySubmitTime(Integer tAssignmentId, String username, Integer submitTime);
	//根据groupId查询小组信息
	@Query("select  c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.groupId= ?2 and c.finalScore is null order by c.submitdate")
	List<TAssignmentGrading> findTAssignmentGradingList(Integer tAssignmentId, Integer groupId);
	//根据tAssignmentId,username,groupId查询该学生小组作业成绩
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.groupId= ?3 and c.userByStudent.username= ?2 and c.finalScore is not null")
	List<TAssignmentGrading> findGroupTAssignmentGrading(Integer tAssignmentId, String username, Integer groupId);

	//根据tAssignmentId,username,groupId查询该学生小组作业成绩
	@Query(value = "select * from t_assignment_grading t where t.assignment_id = ?1  and t.student= ?2",nativeQuery = true)
	List<TAssignmentGrading> findGroupTAssignmentGradingByAccessmentgradingIdAndUsername(Integer tAssignmentId, String username);

	//根据groupId和username查询小组成员信息 因为附件并没有传到小组里，所以groupId为空，在小组信息里先进行的groupId判断
	@Query("select  c from TAssignmentGrading c where c.TAssignment.id = ?1 and (c.groupId= ?2 or c.groupId =null) and c.userByStudent.username =?3 order by c.submitdate")
	List<TAssignmentGrading> findTAssignmentGradingsByAccessmentgradingIdAndGroupIdAndUserByStudent(Integer tAssignmentId, Integer groupId, String username);
	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 order by c.accessmentgradingId")
	Set<TAssignmentGrading> findTAssignmentGradingById(Integer id);
	/**************************************************************************
	 * Description:获取当前考生的提交次数
	 * @param aid 考试的id
	 * @return 获取当前考生的提交次数
	 * @author：李雪腾
	 * @date ：2017-11-03
	 **************************************************************************/
	@Query("select max(g.submitTime) from TAssignmentGrading g where g.TAssignment.id= ?1 and g.userByStudent.username=?2")
	Integer getCurrUserExamCommitTime(Integer aid, String username);

	@Query("select t from TAssignmentGrading t where t.TAssignment.id is null and t.groupId = ?1 and t.userByStudent.username = ?2 and t.userByGradeBy.username = ?3")
    TAssignmentGrading findTAssignmentGradingByGroupIdAndUsername(Integer groupId, String username, String gradeBy);

	@Query("select c from TAssignmentGrading c where c.accessmentgradingId = ?1 ")
    TAssignmentGrading findTAssignmentGradingByAssignmentGradingId(Integer id);

	@Query(value = "select count(*) from t_assignment_grading where assignment_id=?1 and islate=2",nativeQuery = true)
	Integer countNoSubmit(Integer assignmentId);

	@Query(value = "select * from  t_assignment_grading where assignment_id=?1 and (islate=0 or islate=1)",nativeQuery = true)
	List<TAssignmentGrading> findCommitStudents(Integer assignmentId);

	@Query("select c from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2 and c.islate = ?3")
    List<TAssignmentGrading> findTAssignmentGradingByAssignmentIdAndUsernameAndIslate(Integer id, String username, Integer islate);

	@Query(value="select * from t_assignment_grading where assignment_id=?1 and student=?2 and submitdate is null",nativeQuery = true)
	List<TAssignmentGrading> findFirstGrading(Integer assignmentId, String username);

	@Query(value="select * from t_assignment_grading where assignment_id=?1 and student=?2 and submit_time = 0 order by submitdate desc ",nativeQuery = true)
	List<TAssignmentGrading> findDraftGrading(Integer assignmentId, String username);

	@Query("select count(c) from TAssignmentGrading c where c.TAssignment.id = ?1 and c.userByStudent.username = ?2")
	Integer countTAssignmentGradingByIdAndUsername(Integer id, String username);

	@Query("select count(c) from TAssignmentGrading c where c.TAssignment.id = ?1")
	Integer countTAssignmentGradingById(Integer id);

	@Query(value = "select * from t_assignment_grading where assignment_id = ?1 and student = ?2 and submit_time = ?3 order by submitdate desc",nativeQuery = true)
	List<TAssignmentGrading> findStudentCommitData(Integer assignmentId,String username,Integer submitTime);

	@Query(value = " select a.* from t_assignment_grading a " +
			"     JOIN (" +
			"       select t.student, max(t.times) as times from t_assignment_grading t where t.assignment_id = :assignmentId and t.submit_time=1 " +
			"       GROUP BY t.student  " +
			"   ) b on a.student = b.student and a.times = b.times inner join user u on u.username = a.student " +
			" 	where a.assignment_id = :assignmentId and a.submit_time=1 " +
			"	and (u.username like CONCAT('%',:search,'%') or u.cname like CONCAT('%',:search,'%') or a.submitdate like CONCAT('%',:submitDate,'%')) limit :page,:limit",nativeQuery = true)
	List<TAssignmentGrading> correctedByTeacherDataPage(@Param("assignmentId")Integer assignmentId, @Param("search")String search, @Param("submitDate")String submitDate,@Param("page")Integer page,@Param("limit")Integer limit);

	@Query(value = " select a.* from t_assignment_grading a " +
			"      JOIN ("+
			"        select t.student, max(t.times) as times from t_assignment_grading t where t.assignment_id = :assignmentId and t.submit_time=1 " +
			"        GROUP BY t.student  " +
			"      ) b on a.student = b.student and a.times = b.times inner join user u on u.username = a.student" +
			"		 where a.assignment_id = :assignmentId and a.submit_time=1 " +
			"		and (u.username like CONCAT('%',:search,'%') or u.cname like CONCAT('%',:search,'%') or a.submitdate like CONCAT('%',:submitDate,'%')) ",nativeQuery = true)
	List<TAssignmentGrading> correctedByTeacherData(@Param("assignmentId")Integer assignmentId, @Param("search")String search, @Param("submitDate")String submitDate);

	@Query(value = " select a.* from t_assignment_grading a " +
			"      JOIN ("+
			"        select t.student, max(t.times) as times from t_assignment_grading t where t.assignment_id = :assignmentId and t.submit_time=1 " +
			"        GROUP BY t.student  " +
			"      ) b on a.student = b.student and a.times = b.times " +
			"		 where a.assignment_id = :assignmentId and a.submit_time=1 " +
			"		and a.student in (:usernames) ",nativeQuery = true)
	List<TAssignmentGrading> batchCorrectData(@Param("assignmentId")Integer assignmentId, @Param("usernames")List<String> usernames);

	@Query(value = "select * from t_assignment_grading where assignment_id = ?1 and student <> ?2",nativeQuery = true)
	List<TAssignmentGrading> findOtherCommit(Integer assignmentId,String student);

	@Query(value = "select * from t_assignment_grading where assignment_id = ?1 and student = ?2",nativeQuery = true)
	List<TAssignmentGrading> findTAssignmentGradingByTAssignmentAndStudent(Integer assignmentId,String student);

//	@Query(value = " SELECT " +
//			" b.* " +
//			" FROM " +
//			" ( " +
//			" SELECT " +
//			" * " +
//			" FROM " +
//			" t_assignment_grading " +
//			" WHERE " +
//			" ( student, submitdate ) IN ( SELECT student, MAX( submitdate ) FROM t_assignment_grading WHERE assignment_id = :assignmentId GROUP BY student HAVING MAX( submitdate ) IS NOT NULL ) " +
//			" AND assignment_id = :assignmentId UNION " +
//			" SELECT " +
//			" * " +
//			" FROM " +
//			" t_assignment_grading " +
//			" WHERE " +
//			" ( student ) IN ( " +
//			" SELECT " +
//			" a.student " +
//			" FROM " +
//			" ( SELECT student, MAX( submitdate ) FROM t_assignment_grading WHERE assignment_id = :assignmentId GROUP BY student HAVING MAX( submitdate ) IS NULL ) AS a " +
//			" ) " +
//			" AND submitdate IS NULL " +
//			" AND assignment_id = :assignmentId " +
//			" ) AS b " +
//			" ORDER BY " +
//			" final_score DESC ",nativeQuery = true)
//	List<TAssignmentGrading> findNewCommitList(@Param("assignmentId") Integer assignmentId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" ( student, times ) IN ( SELECT student, MAX( times ) FROM t_assignment_grading WHERE assignment_id = :assignmentId GROUP BY student ) " +
			" AND assignment_id = :assignmentId " ,nativeQuery = true)
	List<TAssignmentGrading> findNewCommitList(@Param("assignmentId") Integer assignmentId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" ( student, submitdate ) IN ( SELECT student, MAX( submitdate ) FROM t_assignment_grading WHERE assignment_id = :assignmentId GROUP BY student ) " +
			" AND assignment_id = :assignmentId " +
			" LIMIT :begin, :end " ,nativeQuery = true)
	List<TAssignmentGrading> findNewCommitListPage(@Param("assignmentId") Integer assignmentId,@Param("begin") Integer begin,@Param("end") Integer end );

	// 查询记录
	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime and group_id=:groupId order by submitdate desc) as a",nativeQuery = true)
	List<TAssignmentGrading> findGradingBySubmitTime(@Param("assignmentId") Integer tAssignmentId,@Param("submitTime")  Integer submitTime,@Param("groupId") Integer groupId);

	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime and group_id=:groupId and islate =:islate order by submitdate desc) as a",nativeQuery = true)
	List<TAssignmentGrading> findGradingBySubmitTimeAndIslate(@Param("assignmentId") Integer tAssignmentId,@Param("submitTime")  Integer submitTime,@Param("groupId") Integer groupId,@Param("islate")Integer islate);

	@Query(value = "select count(*) from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime and group_id=:groupId order by submitdate desc) as a",nativeQuery = true)
	Integer countGradingBySubmitTime(@Param("assignmentId") Integer tAssignmentId,@Param("submitTime")  Integer submitTime,@Param("groupId") Integer groupId);

	//教师批改小组作业列表
	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime" +
			" and islate = :islate and submitdate like CONCAT('%',:submitDate,'%')  order by submitdate desc) as a group by a.group_id limit :page,:limit",nativeQuery = true)
	List<TAssignmentGrading> correctGroupByTeacherDataPage(@Param("assignmentId") Integer assignmentId,@Param("submitTime") Integer submitTime,@Param("islate") Integer islate,@Param("submitDate")String submitDate,@Param("page") Integer page,@Param("limit") Integer limit);

	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime" +
			" and islate = :islate and submitdate like CONCAT('%',:submitDate,'%')  order by submitdate desc) as a group by a.group_id ",nativeQuery = true)
	List<TAssignmentGrading> correctGroupByTeacherData(@Param("assignmentId") Integer assignmentId,@Param("submitTime") Integer submitTime,@Param("islate") Integer islate,@Param("submitDate")String submitDate);

	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime" +
			" and islate = :islate and group_id =:groupId and submitdate like CONCAT('%',:submitDate,'%')  order by submitdate desc) as a ",nativeQuery = true)
	List<TAssignmentGrading> correctGroupByTeacherUserSearchData(@Param("assignmentId") Integer assignmentId,@Param("submitTime") Integer submitTime,@Param("islate") Integer islate,@Param("groupId") Integer groupId,@Param("submitDate")String submitDate);

	// 查询记录
	@Query(value = "select * from (select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime and student = :student and group_id=:groupId order by submitdate desc) as a",nativeQuery = true)
	List<TAssignmentGrading> findStudentGradingBySubmitTime(@Param("assignmentId") Integer tAssignmentId,@Param("submitTime")  Integer submitTime,@Param("student")String student, @Param("groupId") Integer groupId);

	@Query(value = " select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime and group_id=:groupId ",nativeQuery = true)
	List<TAssignmentGrading> findStudentGradingByTAssignmentAndSubmitTimeAndGroupId(@Param("assignmentId") Integer tAssignmentId,@Param("submitTime")  Integer submitTime,@Param("groupId") Integer groupId);

	@Query(value = " select * from t_assignment_grading where assignment_id = :assignmentId and submit_time= :submitTime" +
			" and group_id =:groupId  order by final_score desc ",nativeQuery = true)
	List<TAssignmentGrading> correctGroupByStudentData(@Param("assignmentId") Integer assignmentId,@Param("submitTime") Integer submitTime,@Param("groupId") Integer groupId);

	@Query(value = "SELECT * FROM t_assignment_grading WHERE (group_id,times) in " +
			"(SELECT group_id,MAX(times) FROM t_assignment_grading WHERE assignment_id=:assignmentId GROUP BY group_id) limit :page,:limit ",nativeQuery = true)
	List<TAssignmentGrading> findLatestGroupSubmitPage(@Param("assignmentId") Integer assignmentId,@Param("page") Integer page,@Param("limit") Integer limit);

	@Query(value = "SELECT * FROM t_assignment_grading WHERE (group_id,times) in " +
			"(SELECT group_id,MAX(times) FROM t_assignment_grading WHERE assignment_id=:assignmentId GROUP BY group_id) ",nativeQuery = true)
	List<TAssignmentGrading> findLatestGroupSubmit(@Param("assignmentId") Integer assignmentId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND group_id = :groupId " +
			" AND student IS NULL " +
			" ORDER BY " +
			" times DESC " +
			" LIMIT 0,1 ",nativeQuery = true)
	TAssignmentGrading findLatestGroupSubmitByGroupId(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND group_id = :groupId " +
			" AND student IS NULL " +
			" ORDER BY " +
			" times asc " +
			" LIMIT 0,1 ",nativeQuery = true)
	TAssignmentGrading findEarliestGroupSubmitByGroupId(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND student = :username " +
			" ORDER BY " +
			" submitdate ASC " +
			" LIMIT 0,1 " ,nativeQuery = true)
	TAssignmentGrading findEarliestSubmit(@Param("assignmentId") Integer assignmentId,@Param("username") String username);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND student = :username " ,nativeQuery = true)
	List <TAssignmentGrading> findByAssignmentIdAndStudent(@Param("assignmentId") Integer assignmentId,@Param("username") String username);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND student = :username AND submit_time = 1 order by times DESC " ,nativeQuery = true)
	List <TAssignmentGrading> findAllStudentSubmit(@Param("assignmentId") Integer assignmentId,@Param("username") String username);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND group_id =:groupId " +
			" AND student IS NULL " +
			" ORDER BY " +
			" times DESC limit 0,1 " ,nativeQuery = true)
	TAssignmentGrading findByAssignmentAndGroup(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND group_id =:groupId " +
			" AND submit_time = 2 " +
			" ORDER BY " +
			" final_score DESC " ,nativeQuery = true)
	List <TAssignmentGrading> findGroupGrading(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND group_id =:groupId " +
			" AND student IS NULL " +
			" ORDER BY " +
			" times DESC " ,nativeQuery = true)
	List <TAssignmentGrading> findGroupSubmitRecord(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" ( group_id, times ) IN ( " +
			" SELECT " +
			" group_id, " +
			" MAX( times ) " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" and student is null " +
			" GROUP BY " +
			" group_id) " ,nativeQuery = true)
	List <TAssignmentGrading> findGroupLatestSubmit(@Param("assignmentId") Integer assignmentId);

	/**
	 * 查找普通作业学生最新一条记录
	 * @param assignmentId
	 * @return
	 */
	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND student =:username " +
			" ORDER BY " +
			" submitdate DESC " +
			" LIMIT 0,1 " ,nativeQuery = true)
	TAssignmentGrading findCommonWorkLatest(@Param("assignmentId") Integer assignmentId,@Param("username") String username);

	/**
	 * 查询小组作业记录组员成绩的记录
	 * @param assignmentId
	 * @param groupId
	 * @return
	 */
	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND group_id =:groupId" +
			" AND student is not null " +
			" AND submit_time = 2 " ,nativeQuery = true)
	List<TAssignmentGrading> findGroupStudentGrading(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);

	/**
	 * 查询小组作业记录某个成员成绩的记录
	 * @param assignmentId
	 * @param groupId
	 * @param username
	 * @return
	 */
	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id =:assignmentId " +
			" AND group_id =:groupId" +
			" AND student =:username " +
			" AND submit_time = 2 " ,nativeQuery = true)
	TAssignmentGrading findOneGroupStudentGrading(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId,@Param("username")String username);

	/**
	 * 普通作业-获取某个学生最新提交记录（保存草稿或被打回都不算）
	 * @param assignmentId
	 * @param student
	 * @return
	 */
	@Query(value = "SELECT\n" +
			"\t* \n" +
			"FROM\n" +
			"\tt_assignment_grading \n" +
			"WHERE\n" +
			"\tassignment_id =:assignmentId \n" +
			"\tAND student =:student \n" +
			"\tAND submit_time = 1 \n" +
			"ORDER BY\n" +
			"\ttimes DESC \n" +
			"\tLIMIT 0,1" ,nativeQuery = true)
	TAssignmentGrading findNormalWorkStudentLatestSubmit(@Param("assignmentId") Integer assignmentId,@Param("student")String student);

	/**
	 * 小组作业-获取整个小组最新提交记录（不包括保存草稿和被打回）
	 * @param assignmentId
	 * @param groupId
	 * @return
	 */
	@Query(value = " SELECT " +
			" * " +
			" FROM " +
			" t_assignment_grading " +
			" WHERE " +
			" assignment_id = :assignmentId " +
			" AND group_id = :groupId " +
			" AND student IS NULL" +
			" AND submit_time = 1 " +
			" ORDER BY " +
			" times DESC " +
			" LIMIT 0,1 ",nativeQuery = true)
	TAssignmentGrading getGroupLatestSubmit(@Param("assignmentId") Integer assignmentId,@Param("groupId") Integer groupId);
}
