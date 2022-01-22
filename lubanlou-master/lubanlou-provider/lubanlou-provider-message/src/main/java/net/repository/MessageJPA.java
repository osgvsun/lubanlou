package net.repository;


import io.swagger.models.auth.In;
import net.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/****************************************************************************
 * Description 消息JPA
 * 
 * @author 曹焕
 * @date 2019-08-01
 ****************************************************************************/
public interface MessageJPA extends JpaRepository<Message,Integer>,
        JpaSpecificationExecutor<Message> {

	@Query("select m from Message m where m.id=:id and m.messageTopic=:messageTopic")
    Message findByIdAndSite(@Param("id") Integer id, @Param("messageTopic") Integer messageTopic);
	@Query("select m from Message m where  m.messageTopic=:messageTopic")
	List<Message> findMessageByProjectName(@Param("messageTopic") Integer messageTopic);
	@Query("select m from Message m order by  m.createdTime desc")
	List<Message> findAllMessage();
	@Query("select m from Message m where m.id=:id and  m.readStatus=:readStatus")
	Message findMessageUpdateStatus(@Param("id") Integer id, @Param("readStatus") Integer readStatus);
}
