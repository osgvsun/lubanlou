package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.ObjectUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-课程站点成绩册主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface ObjectUserJPA extends JpaRepository<ObjectUser, Integer>,
        JpaSpecificationExecutor<ObjectUser> {
    @Query(value = "select * from object_user where object_uid = ?1",nativeQuery = true)
    List<ObjectUser> findByObjectUid(String uid);
}
