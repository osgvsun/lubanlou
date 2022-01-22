package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试题表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentJPA extends JpaRepository<TAssignment, Integer>,
        JpaSpecificationExecutor<TAssignment> {
	//分页获取课程下知识、技能、体验某一块下的作业
	@Query(value = "(select t.* from t_assignment t inner join wk_folder wf on wf.id = t.folder_id inner join wk_chapter wc on wc.id = wf.chapter_id inner join t_course_site tcs on tcs.id = wc.site_id " +
			"where tcs.id = :siteId and wc.type = :chapterType and t.type = :type and t.is_group = :isGroup and t.title like CONCAT('%',:search,'%'))" +
			"UNION " +
			"(select t.* from t_assignment t inner join wk_folder wf on wf.id = t.folder_id inner join wk_lesson wl on wl.id = wf.lesson_id inner join wk_chapter wc on wc.id = wl.chapter_id inner join t_course_site tcs on tcs.id = wc.site_id " +
			"where tcs.id = :siteId and wc.type = :chapterType and t.type = :type and t.is_group = :isGroup and t.title like CONCAT('%',:search,'%')) limit :page,:limit",nativeQuery = true)
	List<TAssignment> findTAssignmentIdBySiteIdPageSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
													@Param("type") String type, @Param("isGroup") Integer isGroup,@Param("search")String search,@Param("page")Integer page,@Param("limit")Integer limit);


	@Query(value = "(select t.* from t_assignment t inner join wk_folder wf on wf.id = t.folder_id inner join wk_chapter wc on wc.id = wf.chapter_id inner join t_course_site tcs on tcs.id = wc.site_id " +
			"where tcs.id = :siteId and wc.type = :chapterType and t.type = :type and t.is_group = :isGroup and t.title like CONCAT('%',:search,'%'))" +
			"UNION " +
			"(select t.* from t_assignment t inner join wk_folder wf on wf.id = t.folder_id inner join wk_lesson wl on wl.id = wf.lesson_id inner join wk_chapter wc on wc.id = wl.chapter_id inner join t_course_site tcs on tcs.id = wc.site_id " +
			"where tcs.id = :siteId and wc.type = :chapterType and t.type = :type and t.is_group = :isGroup and t.title like CONCAT('%',:search,'%'))",nativeQuery = true)
	List<TAssignment> findTAssignmentIdBySiteIdSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
														  @Param("type") String type, @Param("isGroup") Integer isGroup,@Param("search")String search);


	//以下是学生部分
	//分页获取课程下知识、技能、体验某一块下的作业
	@Query(value = "SELECT * FROM (\n" +
			"( SELECT\n" +
			"\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wf.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = :isGroup \n" +
			"\t\tAND (:student) IN (SELECT tcsu.username FROM t_course_site_user tcsu WHERE site_id =:siteId)\n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) \n" +
			"\t UNION\n" +
			"\t (\n" +
			"\tSELECT\n" +
			"\t\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_lesson wl ON wl.id = wf.lesson_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wl.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = :isGroup \n" +
			"\t\tAND (:student) IN (SELECT tcsu.username FROM t_course_site_user tcsu WHERE site_id =:siteId)\n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) \n" +
			"\t)as a order by a.created_time DESC\n" +
			"\tlimit :page,:limit ",nativeQuery = true)
	List<TAssignment> findStudentTAssignmentIdBySiteIdPageSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
																 @Param("type") String type, @Param("isGroup") Integer isGroup,
																 @Param("student")String student,
																 @Param("search")String search,@Param("page")Integer page,@Param("limit")Integer limit);

	@Query(value = "SELECT * FROM (\n" +
			"( SELECT\n" +
			"\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wf.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = :isGroup \n" +
			"\t\tAND (:student) IN (SELECT tcsu.username FROM t_course_site_user tcsu WHERE site_id =:siteId)\n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) \n" +
			"\t UNION\n" +
			"\t (\n" +
			"\tSELECT\n" +
			"\t\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_lesson wl ON wl.id = wf.lesson_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wl.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = :isGroup \n" +
			"\t\tAND (:student) IN (SELECT tcsu.username FROM t_course_site_user tcsu WHERE site_id =:siteId)\n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) \n" +
			"\t)as a order by a.created_time DESC",nativeQuery = true)
	List<TAssignment> findStudentTAssignmentIdBySiteIdSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
															 @Param("type") String type, @Param("isGroup") Integer isGroup,
															 @Param("student")String student,@Param("search")String search);


	//学生分页获取课程下知识、技能、体验某一块下的小组作业
	@Query(value = "select a.* from (( SELECT\n" +
			"\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wf.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = 1 \n" +
			"\t\tAND (:student ) IN (\n" +
			"\t\tSELECT\n" +
			"\t\t\ttcsu.username \n" +
			"\t\tFROM\n" +
			"\t\t\tgroup_assignment ga\n" +
			"\t\t\tJOIN user_group ug ON ga.group_id = ug.group_id\n" +
			"\t\t\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id \n" +
			"\t\tWHERE\n" +
			"\t\t\tga.assignment_id =t.id \n" +
			"\t\t) \n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) UNION\n" +
			"\t(\n" +
			"\tSELECT\n" +
			"\t\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_lesson wl ON wl.id = wf.lesson_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wl.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = 1 \n" +
			"\t\tAND (:student ) IN (\n" +
			"\t\tSELECT\n" +
			"\t\t\ttcsu.username \n" +
			"\t\tFROM\n" +
			"\t\t\tgroup_assignment ga\n" +
			"\t\t\tJOIN user_group ug ON ga.group_id = ug.group_id\n" +
			"\t\t\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id \n" +
			"\t\tWHERE\n" +
			"\t\t\tga.assignment_id =t.id \n" +
			"\t\t) \n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' ))) as a order by a.created_time desc \n" +
			"\tLIMIT :page,:limit",nativeQuery = true)
	List<TAssignment> findGroupTAssignmentBySiteIdPageSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
														  @Param("type") String type, @Param("student") String student,@Param("search")String search,@Param("page")Integer page,@Param("limit")Integer limit);


	@Query(value = "(SELECT\n" +
			"\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wf.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = 1 \n" +
			"\t\tAND (:student ) IN (\n" +
			"\t\tSELECT\n" +
			"\t\t\ttcsu.username \n" +
			"\t\tFROM\n" +
			"\t\t\tgroup_assignment ga\n" +
			"\t\t\tJOIN user_group ug ON ga.group_id = ug.group_id\n" +
			"\t\t\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id \n" +
			"\t\tWHERE\n" +
			"\t\t\tga.assignment_id =t.id \n" +
			"\t\t) \n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' )) UNION\n" +
			"\t(\n" +
			"\tSELECT\n" +
			"\t\tt.* \n" +
			"\tFROM\n" +
			"\t\tt_assignment t\n" +
			"\t\tINNER JOIN wk_folder wf ON wf.id = t.folder_id\n" +
			"\t\tINNER JOIN wk_lesson wl ON wl.id = wf.lesson_id\n" +
			"\t\tINNER JOIN wk_chapter wc ON wc.id = wl.chapter_id\n" +
			"\t\tINNER JOIN t_course_site tcs ON tcs.id = wc.site_id \n" +
			"\tWHERE\n" +
			"\t\ttcs.id = :siteId \n" +
			"\t\tAND wc.type = :chapterType \n" +
			"\t\tAND t.type = :type \n" +
			"\t\tAND t.is_group = 1 \n" +
			"\t\tAND (:student ) IN (\n" +
			"\t\tSELECT\n" +
			"\t\t\ttcsu.username \n" +
			"\t\tFROM\n" +
			"\t\t\tgroup_assignment ga\n" +
			"\t\t\tJOIN user_group ug ON ga.group_id = ug.group_id\n" +
			"\t\t\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id \n" +
			"\t\tWHERE\n" +
			"\t\t\tga.assignment_id =t.id \n" +
			"\t\t) \n" +
			"\tAND t.title LIKE CONCAT( '%',:search, '%' ))",nativeQuery = true)
	List<TAssignment> findGroupTAssignmentIdBySiteIdSearch(@Param("siteId") Integer siteId, @Param("chapterType") Integer chapterType,
													  @Param("type") String type, @Param("student") String student,@Param("search")String search);



}
