package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


/****************************************************************************
 * Description 教学系统-学校权限表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface AuthorityJPA extends JpaRepository<Authority, Integer>,
        JpaSpecificationExecutor<Authority> {

	@Query("select u from Authority u where u.authorityName=:name")
    Authority getAuthorityByAuthorityName(@Param("name") String name);
	@Query(value = "select * from authority a inner join user_authority ua on ua.authority_id = a.id where ua.manage_id =?1 and ua.user_id =?2 and ua.now_authority=1",nativeQuery = true)
    Authority getNowAuthority(Integer cid, String username);
	@Query(value = "select * from authority where id = " +
			"(select max(a.id) from authority a inner join user_authority ua on ua.authority_id = a.id where ua.user_id = ?1 and a.authority_name in('STUDENT','TEACHER','EXCENTTERDIRECTOR','LABMANAGER'))",nativeQuery = true)
    Authority getYCNowAuthority(String username);
	@Query(value = "select * from authority where id = ?1",nativeQuery = true)
    Authority findOne(Integer id);
}
