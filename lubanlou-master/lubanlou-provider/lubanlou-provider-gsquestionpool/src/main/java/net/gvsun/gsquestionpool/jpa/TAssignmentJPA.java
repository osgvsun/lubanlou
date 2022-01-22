package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignment;
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
	@Query("select c from TAssignment c where c.type='test' and c.siteId =:siteId")
	List<TAssignment> findTAssignmentExamBySiteId(@Param("siteId") Integer siteId);
//	String sql = "from TAssignment c where c.testParentId = '"
//			+ parentTest.getId() + "' and c.user.username = '"
//			+ nowUser.getUsername() + "'";
//	// 筛选保存还未提交的试卷
	//c.testParentId=:parentId and c.user.username =:username and c.status!=1
	//sql += " and c.status != 1";
	@Query("select c from TAssignment c where c.testParentId=:parentId and c.user.username =:username and c.status!=1")
	List<TAssignment> findExamByUserAndExamId(@Param("parentId") Integer parentId, @Param("username") String username);
}
