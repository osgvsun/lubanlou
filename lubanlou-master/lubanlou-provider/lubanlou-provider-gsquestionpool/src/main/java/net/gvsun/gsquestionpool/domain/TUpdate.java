package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_update database table.
 * 
 */
@Entity
@Table(name="t_update")
@NamedQuery(name="TUpdate.findAll", query="SELECT t FROM TUpdate t")
public class TUpdate implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Column(name="update_cname")
	private String updateCname;

	@Lob
	@Column(name="update_content")
	private String updateContent;

	@Column(name="update_number")
	private String updateNumber;

	@Column(name="update_username")
	private String updateUsername;

	public TUpdate() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getUpdateCname() {
		return this.updateCname;
	}

	public void setUpdateCname(String updateCname) {
		this.updateCname = updateCname;
	}

	public String getUpdateContent() {
		return this.updateContent;
	}

	public void setUpdateContent(String updateContent) {
		this.updateContent = updateContent;
	}

	public String getUpdateNumber() {
		return this.updateNumber;
	}

	public void setUpdateNumber(String updateNumber) {
		this.updateNumber = updateNumber;
	}

	public String getUpdateUsername() {
		return this.updateUsername;
	}

	public void setUpdateUsername(String updateUsername) {
		this.updateUsername = updateUsername;
	}

}