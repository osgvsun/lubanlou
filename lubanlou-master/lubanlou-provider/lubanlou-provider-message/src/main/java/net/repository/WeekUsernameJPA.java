package net.repository;


import net.domain.Message;
import net.domain.WeekUsername;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/****************************************************************************
 * Description 消息JPA
 * 
 * @author 曹焕
 * @date 2019-08-01
 ****************************************************************************/
public interface WeekUsernameJPA extends JpaRepository<WeekUsername,Integer>,
        JpaSpecificationExecutor<WeekUsername> {

	@Query("select wu from WeekUsername wu where wu.weekId=:weekId")
    List<WeekUsername> findInfoByWeekDay(@Param("weekId") Integer weekId);
}
