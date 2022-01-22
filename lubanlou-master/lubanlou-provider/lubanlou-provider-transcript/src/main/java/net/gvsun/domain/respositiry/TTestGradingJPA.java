package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.TTestGrading;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点成绩册主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TTestGradingJPA extends JpaRepository<TTestGrading, Integer>,
        JpaSpecificationExecutor<TTestGrading> {
    @Query(value = "select ttg.* from t_test_grading as ttg where ttg.student=?1 and ttg.site_id=?2",nativeQuery=true)
    TTestGrading findTTestGradingByStudentAndSAndSiteId(String student,Integer siteId);
    @Query("select t from TTestGrading t where t.student in ?1 and t.siteId=?2")
    List<TTestGrading> findTTestGradingByUsernamesAndsiteId(String[] username, Integer siteId);
    @Query(value = "select ttg.* from t_test_grading as ttg where ttg.student=?1 and ttg.course_number=?2",nativeQuery=true)
    TTestGrading findTTestGradingByStudentAndSAndCourseNumber(String student,String courseNumber);
    @Query(value = "select count(*) from t_test_grading where course_number=?1",nativeQuery=true)
    Integer countStudent(String courseNumber);
    @Query(value = "select * from t_test_grading where group_id=?1",nativeQuery = true)
    List<TTestGrading> findTTestGradingByGroupId(Integer groupId);
    @Query(value = "select * from t_test_grading where course_number=?1",nativeQuery=true)
    List<TTestGrading> courseStudent(String courseNumber);
    @Query(value = "select * from t_test_grading where course_number=:courseNumber and (student like CONCAT('%',:search,'%') or cname like CONCAT('%',:search,'%'))",nativeQuery=true)
    List<TTestGrading> courseStudent(@Param("courseNumber") String courseNumber,@Param("search") String search);
    //获取课程学生
    @Query(value = "select * from t_test_grading where site_id=?1",nativeQuery=true)
    List<TTestGrading> findTTestGradingsBySiteId(Integer siteId);
}
