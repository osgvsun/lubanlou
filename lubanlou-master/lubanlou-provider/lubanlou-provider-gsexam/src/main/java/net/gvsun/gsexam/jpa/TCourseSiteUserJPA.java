package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TCourseSiteUser;
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

	@Query("select t from TCourseSiteUser t where t.TCourseSite.id=:id and t.role in (0,2)")
	List<TCourseSiteUser> getTCourseSiteUsersByTCourseSiteIdAndRole(@Param("id") Integer id);
	//根据站点id和用户名获取当前站点下学生的信息
	@Query("select u from TCourseSiteUser u where u.user.username = ?1 and u.TCourseSite.id = ?2")
	List<TCourseSiteUser> getTCourseSiteUserBySiteIdAndUsername(String username, Integer cid);

	@Query("select count(t.id) from TCourseSiteUser t where t.TCourseSite.id=?1 and t.user.username=?2 and t.role = 0")
	Integer isStudent(Integer cid, String username);


}
