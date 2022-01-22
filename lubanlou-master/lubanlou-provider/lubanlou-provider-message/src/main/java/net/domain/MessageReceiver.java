package net.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


/**
 * The persistent class for the user database table.
 * 
 */
@Data
@Entity
@Table(name = "message_receiver")
public class MessageReceiver implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	/**
	 *消息接收者
	 */
	@Column(name="receiver_username")
	private String receiverUsername;

	/**
	 * 消息id
	 */
	@Column(name="message_id")
	private Integer messageId;

	private Integer readState;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	LocalDateTime readTime;
	private Integer handleState;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	LocalDateTime handleTime;
}