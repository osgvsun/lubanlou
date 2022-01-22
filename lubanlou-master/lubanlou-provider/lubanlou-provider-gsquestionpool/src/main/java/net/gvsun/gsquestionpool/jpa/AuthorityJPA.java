package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.Authority;
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
	@Query(value = "select * from authority where id = ?1",nativeQuery = true)
	Authority findOne(Integer id);
}
