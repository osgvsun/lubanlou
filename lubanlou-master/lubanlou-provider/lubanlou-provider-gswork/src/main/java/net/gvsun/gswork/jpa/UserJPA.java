package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.User;
import org.apache.ibatis.annotations.Param;
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

    @Query("select u from User u where u.username=?1")
    User findUSerByUserName(String userName);

    @Query("select u from User u where u.cname=?1")
    User findUSerByCName(String cName);

    //查找所有在校的用户
    @Query("select u from User u where u.userStatus = 1")
    List<User> findAllUsers();

    //查找所有教师
    @Query("select u from User u where u.userRole like '1'")
    List<User> findUserByRole();

    List<User> findUserByUserRole(String role);

    @Query(value = "select * from user where username in(:usernames)",nativeQuery = true)
    List<User> findByUsernames(@Param("usernames") List<String> usernames);
}
