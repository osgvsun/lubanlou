package net.gvsun.repository;

import net.gvsun.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsernameAndPassword(String username, String password);

    User findByGitlabUsername(String gitlabUsername);

    User findByUsername(String username);

    User findByWechatOpenId(String wechatOpenId);

    User findByQqOpenId(String qqOpenId);

    User findByPhone(String phone);

    User findByUnionid(String unionid);

    User findByPhoneAndPassword(String phone, String password);

    User findByUserNo(String userNo);

    List<User> findByCnameStartsWith(String cname);

    @Query(value = "select u.* from users as u inner join user_department as ud on u.username = ud.username where department_id = :departmentId", nativeQuery = true)
    Page<User> findUsersByDepartmentId(@Param("departmentId") Integer departmentId, Pageable pageable);
}
