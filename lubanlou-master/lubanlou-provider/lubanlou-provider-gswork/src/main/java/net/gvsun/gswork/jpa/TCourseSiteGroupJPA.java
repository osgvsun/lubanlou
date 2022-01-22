package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.TCourseSiteGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点的分组（平行班）—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TCourseSiteGroupJPA extends JpaRepository<TCourseSiteGroup, Integer>,
        JpaSpecificationExecutor<TCourseSiteGroup> {
	//查询课程列表并分页
	@Query("select u from TCourseSiteGroup u where u.TCourseSite.id =?1")
	Page<TCourseSiteGroup> findGroupBySiteIdPage(Integer siteId, Pageable pageable);
	//查询课程列表
	@Query("select u from TCourseSiteGroup u where u.TCourseSite.id =?1")
	List<TCourseSiteGroup> findGroupBySiteId(Integer siteId);
	@Query(value = "select * from t_course_site_group where site_id = ?1 and assignment_id is null",nativeQuery = true)
	List<TCourseSiteGroup> findByNotAssignment(int cid);
	//根据siteId查询发布后的小组
	@Query("select u from TCourseSiteGroup u where u.TCourseSite.id =?1 and u.isOpen=1")
	List<TCourseSiteGroup> findOpenGroupBySite(Integer siteId);
	//根据groupId查询发布后的小组
	@Query("select u.isExcellent from TCourseSiteGroup u where u.id =?1 ")
	Integer getIsExcellentByGroupId(Integer groupId);
	//根据siteId获取优秀作品发布的小组
	@Query("select u from TCourseSiteGroup u where u.TCourseSite.id =?1 and u.isExcellent=1")
	List<TCourseSiteGroup> getGroupIdBySiteIdAndIsExcellent(Integer siteId);
	@Query("select u from TCourseSiteGroup u where u.groupTitle =?1 and u.TCourseSite.id=?2")
	List<TCourseSiteGroup> getGroupIdByGroupTitle(String groupTitle, Integer siteId);

	@Query("select u from TCourseSiteGroup u where u.id =?1")
    TCourseSiteGroup findGroupById(Integer id);

	@Query(value = "select * from t_course_site_group where assignment_id = ?1",nativeQuery = true)
	List<TCourseSiteGroup> findAssignmentGroup(Integer assignmentId);

	@Query(value = "SELECT\n" +
			"\ttcsg.* \n" +
			"FROM\n" +
			"\tgroup_assignment ga\n" +
			"\tJOIN t_course_site_group tcsg ON ga.group_id = tcsg.id \n" +
			"WHERE\n" +
			"\tga.assignment_id =:assignmentId \n" +
			"\tAND (:student) IN (\n" +
			"\tSELECT\n" +
			"\t\ttcsu.username \n" +
			"\tFROM\n" +
			"\t\tuser_group ug\n" +
			"\t\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id \n" +
			"WHERE\n" +
			"\tug.group_id = tcsg.id)",nativeQuery = true)
	TCourseSiteGroup findAssignmentGroupByStudent(@Param("assignmentId") Integer assignmentId,@Param("student") String student);

	@Query(value = "select * from t_course_site_group where site_id =:siteId and group_title like concat('%',:search,'%') limit :page,:pageSize ",nativeQuery = true)
	List<TCourseSiteGroup> findGroupsBySiteIdPage(@Param("siteId") Integer siteId,@Param("search") String search,@Param("page")Integer page,@Param("pageSize")Integer pageSize);

	@Query(value = "select count(*) from t_course_site_group where site_id =:siteId and group_title like concat('%',:search,'%') ",nativeQuery = true)
	Integer findGroupSizeBySiteId(@Param("siteId") Integer siteId,@Param("search") String search);
}
