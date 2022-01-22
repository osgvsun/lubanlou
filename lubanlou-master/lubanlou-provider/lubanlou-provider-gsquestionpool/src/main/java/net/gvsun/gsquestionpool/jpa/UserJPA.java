package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-日志查看
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface UserJPA extends JpaRepository<User, String>,
        JpaSpecificationExecutor<User> {

	//根据硕士学科(浙江外国语身份证号码)查询学生
	@Query("select t from User t where t.masterMajor = ?1")
	List<User> findUserByMasterMajor(String masterMajor);
	@Query("select t from User t where t.username = ?1")
	User findOne(String username);
}
