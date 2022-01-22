package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TCourseSiteUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点相关学生—JPA通用数据操作
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteUserJPA extends JpaRepository<TCourseSiteUser, Integer>,
        JpaSpecificationExecutor<TCourseSiteUser> {
    //查询分组内学生列表并分页
    @Query("select t from TCourseSiteUser t where t.groupId=?1")
    Page<TCourseSiteUser> findStudentByGroupIdPage(Integer groupId, Pageable pageable);

    //查询分组内学生列表
    @Query("select t from TCourseSiteUser t where t.groupId=?1")
    List<TCourseSiteUser> findStudentByGroupId(Integer groupId);

    //根据站点id和用户名字查询该站点的助教
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id =?1 and t.user.username = ?2 and t.role = '1' ")
    List<TCourseSiteUser> findAllSTeacherBySiteIdAndUser(Integer siteId, String userName);

    //根据站点id和用户名字查询该站点的学生
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id =?1 and t.user.username = ?2 and t.role = '0' ")
    List<TCourseSiteUser> findAllStudentBySiteIdAndUser(Integer siteId, String userName);

    //查询课程学生列表并分页
    @Query(value = "select t from TCourseSiteUser t where t.TCourseSite.id=?1 and t.groupId is null and t.user.cname like ?3 and t.user.username like ?2")
    Page<TCourseSiteUser> findStudentBySiteIdPage(Integer siteId, String username, String cname, Pageable pageable);

    //查询课程学生列表
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id=?1")
    List<TCourseSiteUser> findStudentBySiteId(Integer siteId);

    //根据学号与课程id查询学生
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id=?1 and t.user.username in ?2")
    List<TCourseSiteUser> findStudentBySiteIdAndUsername(Integer siteId, String[] username);


    @Query(value = "select username  from t_course_site_user where site_id = ?1", nativeQuery = true)
    List<String> getUsernamesBySiteId(Integer siteId);

    //
    @Query("select t from TCourseSiteUser t where t.id in ?1")
    List<TCourseSiteUser> findStudentByUserId(Integer[] userId);

    //根据站点查找站点下学生
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id = ?1 order by t.user.username")
    List<TCourseSiteUser> findAllTCourseSiteUserBySiteId(Integer siteId);

    //根据站点查找站点下学生学号
    @Query("select t.user.username from TCourseSiteUser t where t.TCourseSite.id = ?1 order by t.user.username")
    List<String> findAllTCourseSiteUserUsernameBySiteId(Integer siteId);

    //站点下面权限为1的学生
    @Query("select  c from TCourseSiteUser c where c.TCourseSite.id = ?1 and c.authority.id = ?2 and c.role in (0,2)")
    List<TCourseSiteUser> findTCourseSiteUserWithAut(Integer cid, Integer authid);

    //根据站点id和用户名获取当前站点下学生的信息
    @Query("select u from TCourseSiteUser u where u.user.username = ?1 and u.TCourseSite.id = ?2")
    List<TCourseSiteUser> getTCourseSiteUserBySiteIdAndUsername(String username, Integer cid);

    //查询课程已分组学生列表
    @Query("select t from TCourseSiteUser t where t.TCourseSite.id=?1 and t.groupId is not null")
    List<TCourseSiteUser> findStudentBySiteId1(Integer siteId);

    //根据username的获取所在小组
    @Query("select t from TCourseSiteUser t where t.user.username=?1 and t.TCourseSite.id=?2 ")
    TCourseSiteUser findStudentByUsername(String username, Integer siteId);

    @Query("select t from TCourseSiteUser t where t.authority.id=?1 ")
    List<TCourseSiteUser> findStudentByAuthId(Integer authId);

    @Query("select t from TCourseSiteUser t where t.user.username=?1 and t.groupId=?2")
    TCourseSiteUser findTCourseSiteUserByUsernameAndGroupId(String username, Integer groupId);

    //获取助教
    @Query("select  c from TCourseSiteUser c where c.TCourseSite.id = ?1 and c.authority.id = ?2 and c.role = 1")
    List<TCourseSiteUser> findTCourseSiteUserWithTeach(Integer cid, Integer authid);

    @Query("select t from TCourseSiteUser t where t.user.username=?1 and t.TCourseSite.id=?2")
    TCourseSiteUser findTCourseSiteUserByUsernameAndSiteId(String username, Integer siteId);

    @Query("select count(t) from TCourseSiteUser t where t.TCourseSite.id = ?1 order by t.user.username")
    Integer countTCourseSiteUserBySiteId(Integer siteId);

    @Query("select  c from TCourseSiteUser c where c.TCourseSite.id = ?1 and c.authority.id = ?2 and c.user.username=?3")
    TCourseSiteUser findTCourseSiteUserWithAuth(Integer cid, Integer authid, String username);

    @Query(value = "select * from t_course_site_user where site_id=:cid and username not in (:usernames)",nativeQuery = true)
    List<TCourseSiteUser> notInAssignmentStudent(@Param("cid") Integer cid, @Param("usernames") List<String> usernames);

    @Query(value = "select * from t_course_site_user where site_id=:cid and role = 0 ",nativeQuery = true)
    List<TCourseSiteUser> findSiteStudents(@Param("cid") Integer cid);

}
