package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the user_card database table.
 * 
 */
@Entity
@Table(name="user_card")
@NamedQuery(name="UserCard.findAll", query="SELECT u FROM UserCard u")
public class UserCard implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="card_no")
	private String cardNo;

	private String enabled;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	public UserCard() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCardNo() {
		return this.cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getEnabled() {
		return this.enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}