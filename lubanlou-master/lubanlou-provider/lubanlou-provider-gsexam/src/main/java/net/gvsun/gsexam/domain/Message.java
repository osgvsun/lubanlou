package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the message database table.
 * 
 */
@Entity
@NamedQuery(name="Message.findAll", query="SELECT m FROM Message m")
public class Message implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="auth_id")
	private Integer authId;

	private Integer cond;

	private String content;

	@Temporal(TemporalType.DATE)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="message_state")
	private Integer messageState;

	@Column(name="receive_cpartyid")
	private Integer receiveCpartyid;

	@Column(name="send_cparty")
	private String sendCparty;

	@Column(name="send_user")
	private String sendUser;

	private String title;

	private String username;

	public Message() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getAuthId() {
		return this.authId;
	}

	public void setAuthId(int authId) {
		this.authId = authId;
	}

	public Integer getCond() {
		return this.cond;
	}

	public void setCond(int cond) {
		this.cond = cond;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getMessageState() {
		return this.messageState;
	}

	public void setMessageState(int messageState) {
		this.messageState = messageState;
	}

	public Integer getReceiveCpartyid() {
		return this.receiveCpartyid;
	}

	public void setReceiveCpartyid(int receiveCpartyid) {
		this.receiveCpartyid = receiveCpartyid;
	}

	public String getSendCparty() {
		return this.sendCparty;
	}

	public void setSendCparty(String sendCparty) {
		this.sendCparty = sendCparty;
	}

	public String getSendUser() {
		return this.sendUser;
	}

	public void setSendUser(String sendUser) {
		this.sendUser = sendUser;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}