package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.User;
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
	/****************************************************************************
	 * Description 根据用户名获取用户
	 *
	 * @author 李雪腾
	 * @date 2017-10-25
	 * @param username 用户名
	 * @return 用户
	 ****************************************************************************/
	@Query("select t from User t where t.username = ?1")
    User findOne(String username);
	@Query("select t from User t where t.username = ?1")
    User findUserByUsername(String username);
	//根据学号查询学生
	@Query("select t from User t where t.username in ?1")
	List<User> findStudentByUsername(String[] username);

	//根据硕士学科(浙江外国语身份证号码)查询学生
	@Query("select t from User t where t.masterMajor = ?1")
	List<User> findUserByMasterMajor(String masterMajor);
	//根据班级查询学生
	@Query("select t from User t where t.schoolClass.classNumber = ?1")
	List<User> findStudentByClassNumber(String classNumber);
	//筛选在班级list里的用户
	@Query("select t from User t where t.schoolClass.classNumber in ?1")
	List<User> findStudentByClassArr(String[] classArr);
	//筛选classNumber不为空的所有用户
	@Query("select t from User t where t.schoolClass.classNumber is not null")
	List<User> findUserClassNotNull();
	//筛选在学院list里的用户
	@Query("select t from User t where t.schoolAcademy.academyNumber in ?1")
	List<User> findUserByAcademyArr(String academyList);
}
