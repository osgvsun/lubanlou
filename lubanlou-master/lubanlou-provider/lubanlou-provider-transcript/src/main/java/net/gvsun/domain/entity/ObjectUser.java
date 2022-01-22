package net.gvsun.domain.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the t_gradebook database table.
 * 
 */
@Entity
@Table(name="object_user")
@NamedQuery(name="ObjectUser.findAll", query="SELECT t FROM ObjectUser t")
public class ObjectUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="object_uid")
	private String objectUid;

	@Column(name="username")
	private String username;

	public String getObjectUid() {
		return objectUid;
	}

	public void setObjectUid(String objectUid) {
		this.objectUid = objectUid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}