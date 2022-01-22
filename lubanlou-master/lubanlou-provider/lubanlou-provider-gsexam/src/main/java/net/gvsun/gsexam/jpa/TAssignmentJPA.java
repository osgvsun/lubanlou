package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignment;
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
    @Query(value = "select * from t_assignment where id = ?1",nativeQuery = true)
    TAssignment findOne(Integer id);
    @Query("select c from TAssignment c where c.type=?2 and c.siteId =?1 order by c.id desc ")
    List<TAssignment> findTAssignmentExamBySiteId(Integer siteId, String type);
    @Query(value = "select c.* from t_assignment c where c.type=:type and c.site_id =:siteId  and (c.school_academy like CONCAT('%',:academyNumber,'%') or c.school_academy = '*000') order by c.id desc",nativeQuery = true)
    List<TAssignment> findTAssignmentExamBySiteIdAndSchoolAcademy(@Param("siteId") Integer siteId, @Param("type") String type, @Param("academyNumber") String academyNumber);

    @Query("select c from TAssignment c where c.type=?2 and c.siteId =?1 and c.status=1 order by c.id desc ")
    List<TAssignment> findTAssignmentExamByStudentAndSiteId(Integer siteId, String type);

    //	String sql = "from TAssignment c where c.testParentId = '"
//			+ parentTest.getId() + "' and c.user.username = '"
//			+ nowUser.getUsername() + "'";
//	// 筛选保存还未提交的试卷
    //c.testParentId=:parentId and c.user.username =:username and c.status!=1
    //sql += " and c.status != 1";
    @Query("select c from TAssignment c where c.testParentId=:parentId and c.user.username =:username and c.status<>1 and (c.type is null)")
    List<TAssignment> findExamByUserAndExamId(@Param("parentId") Integer parentId, @Param("username") String username);

    @Query("select c from TAssignment c where c.testParentId=:parentId and c.user.username =:username and c.status=1 and (c.type is null)")
    List<TAssignment> findExamByUserAndExamIdAndStatus(@Param("parentId") Integer parentId, @Param("username") String username);


    @Query("select c from TAssignment c where c.testParentId=:parentId and c.user.username =:username order by c.id")
    List<TAssignment> findExamByUserAndExamIdWithoutStatus(@Param("parentId") Integer parentId, @Param("username") String username);

    /**************************************************************************
     * Description:测试列表
     *
     * @author：李雪腾
     * @date ：2018/1/22
     **************************************************************************/
    @Query("select c from TAssignment  c where c.type='test' and c.siteId=?1 and c.status=1 order by c.id desc ")
    List<TAssignment> findAllTest(Integer cid);

    //根据章节查询列表
    @Query(value = "select ta.* from t_assignment ta inner join wk_folder wf on ta.folder_id = wf.id inner join wk_chapter wc on wc.id = wf.chapter_id where wc.id = ?1 and ta.type = ?2",nativeQuery = true)
    List<TAssignment> findByChapterIdAndType(Integer chapterId, String type);

    //根据小节查询列表
    @Query(value = "select ta.* from t_assignment ta inner join wk_folder wf on ta.folder_id = wf.id inner join wk_lesson wl on wl.id = wf.lesson_id where wl.id = ?1 and ta.type = ?2",nativeQuery = true)
    List<TAssignment> findByLessonIdAndType(Integer lessonId, String type);

    @Query(value = "(select ta.* from t_assignment ta " +
            "inner join t_assignment_control tac on ta.id = tac.assignment_id " +
            "where site_id in (select site_id from t_course_site_user where username = :username group by site_id) and type = :type  " +
            "and NOW() between tac.startdate and tac.duedate and ta.title like CONCAT('%',:search,'%') order by ta.id desc, tac.duedate asc) " +
            "UNION ALL " +
            "(select ta.* from t_assignment ta  " +
            "inner join t_assignment_control tac on ta.id = tac.assignment_id " +
            "where site_id in (select site_id from t_course_site_user where username = :username group by site_id) and type = :type  " +
            "and NOW() not between tac.startdate and tac.duedate and ta.title like CONCAT('%',:search,'%') order by ta.id desc) " +
            "limit :page,:limit",nativeQuery = true)

    List<TAssignment> searchStudentExams(@Param("username") String username, @Param("type") String type, @Param("search") String search, @Param("page") Integer page, @Param("limit") Integer limit);

    @Query(value = "(select ta.* from t_assignment ta " +
            "inner join t_assignment_control tac on ta.id = tac.assignment_id " +
            "where ta.site_id in (select site_id from t_course_site_user where username = :username group by site_id) and ta.type = :type  " +
            "and NOW() between tac.startdate and tac.duedate order by ta.id desc,tac.duedate asc) " +
            "UNION ALL " +
            "(select ta.* from t_assignment ta  " +
            "inner join t_assignment_control tac on ta.id = tac.assignment_id " +
            "where ta.site_id in (select site_id from t_course_site_user where username = :username group by site_id) and ta.type = :type  " +
            "and NOW() not between tac.startdate and tac.duedate order by ta.id desc) " +
            "limit :page,:limit",nativeQuery = true)

    List<TAssignment> studentExams(@Param("username") String username, @Param("type") String type, @Param("page") Integer page, @Param("limit") Integer limit);

    @Query(value = "select COUNT(ta.id) from t_assignment ta " +
            "where ta.site_id in (select site_id from t_course_site_user where username = :username group by site_id) and ta.type = :type " +
            "and ta.title like CONCAT('%',:search,'%')",nativeQuery = true)

    Integer countSearchStudentExams(@Param("username") String username, @Param("type") String type, @Param("search") String search);

    @Query(value = "select COUNT(ta.id) from t_assignment ta " +
            "where ta.site_id in (select site_id from t_course_site_user where username = :username group by site_id) and ta.type = :type " ,nativeQuery = true)

    Integer countStudentExams(@Param("username") String username, @Param("type") String type);

    @Query(value = "select * from t_assignment where old_assignment_id = ?1",nativeQuery = true)
    List<TAssignment> findMakeUpExam(Integer oldAssignmentId);

    @Query(value = "(select ta.* from t_assignment ta inner join t_assignment_class tac on tac.assignment_id = ta.id where ta.site_id = ?1 and ta.type=?2 and ta.`status`=1 and tac.class_number = ?3) " +
            "UNION " +
            "(select ta.* from t_assignment ta where ta.school_academy like '%*000%' and ta.site_id = ?1 and ta.type=?2 and ta.`status`=1) order by id desc",nativeQuery = true)
    List<TAssignment> findStudentExams(Integer siteId, String type, String classNumber);

    @Query(value = "(select * from t_assignment where old_assignment_id in (:ids)) ",nativeQuery = true)
    List<TAssignment> findStudentMakeUpExams(@Param("ids") List<Integer> ids);


}
