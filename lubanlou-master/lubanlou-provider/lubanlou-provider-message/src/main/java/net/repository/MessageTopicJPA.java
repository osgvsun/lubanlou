package net.repository;


import net.domain.MessageReceiver;
import net.domain.MessageTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/*************************************************************************************
 * Description:消息主題JPA
 *
 * @author: 杨新蔚
 * @date: 2019/7/31
 *************************************************************************************/
public interface MessageTopicJPA extends JpaRepository<MessageTopic, Integer>,
        JpaSpecificationExecutor<MessageTopic> {
    @Query("select m.id from MessageTopic m where m.topic=:topic")
    Integer findMeassageTopicIdByTopicName(@Param("topic") String topic);

}
