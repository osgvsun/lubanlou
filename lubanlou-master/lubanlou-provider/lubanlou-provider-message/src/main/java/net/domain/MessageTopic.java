package net.domain;



import lombok.Data;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.util.Set;

/**
 */
@Data
@Entity
@Table(name = "message_topic")
public class MessageTopic implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	/**
	 *消息主题名
	 */
	@Column(name = "topic")
	private String topic;
}
