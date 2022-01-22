package net.repository;


import net.domain.MessageReceiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/****************************************************************************
 * Description 消息接收JPA
 * 
 * @author 曹焕
 * @date 2019-08-01
 ****************************************************************************/
public interface MessageReceiverJPA extends JpaRepository<MessageReceiver, String>,
        JpaSpecificationExecutor<MessageReceiver> {
	@Query("select m from MessageReceiver m where m.receiverUsername=:username")
	List<MessageReceiver> findMeassage(@Param("username") String username);
	@Query("select distinct(m.receiverUsername) from MessageReceiver m where m.messageId=:messageId")
	List<String> findMessageUserByMessageId(@Param("messageId") Integer messageId);

	@Query("select m from MessageReceiver m where m.messageId=:messageId and m.receiverUsername=:username")
    MessageReceiver findMessageUserByUsernameAndMessageId(@Param("messageId") Integer messageId, @Param("username") String username);
}
