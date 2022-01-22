package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_message_attachment database table.
 * 
 */
@Entity
@Table(name="t_message_attachment")
@NamedQuery(name="TMessageAttachment.findAll", query="SELECT t FROM TMessageAttachment t")
public class TMessageAttachment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="message_id")
	private Integer messageId;

	private String name;

	private String path;

	private double size;

	private Integer type;

	@Temporal(TemporalType.TIMESTAMP)
	private Date upTime;

	public TMessageAttachment() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getMessageId() {
		return this.messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public double getSize() {
		return this.size;
	}

	public void setSize(double size) {
		this.size = size;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Date getUpTime() {
		return this.upTime;
	}

	public void setUpTime(Date upTime) {
		this.upTime = upTime;
	}

}