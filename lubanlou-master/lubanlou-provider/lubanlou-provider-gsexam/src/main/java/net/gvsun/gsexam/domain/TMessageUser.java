package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_message_user database table.
 * 
 */
@Entity
@Table(name="t_message_user")
@NamedQuery(name="TMessageUser.findAll", query="SELECT t FROM TMessageUser t")
public class TMessageUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="create_by")
	private String createBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="is_read")
	private Integer isRead;

	@Column(name="message_id")
	private Integer messageId;

	private String username;

	public TMessageUser() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCreateBy() {
		return this.createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getIsRead() {
		return this.isRead;
	}

	public void setIsRead(int isRead) {
		this.isRead = isRead;
	}

	public Integer getMessageId() {
		return this.messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}