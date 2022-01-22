package net.gvsun.gswork.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * The persistent class for the authority database table.
 * 
 */
@Entity
@NamedQuery(name="Authority.findAll", query="SELECT a FROM Authority a")
public class Authority implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private String authorityName;

	private String cname;

	private String manageTable;

	private Integer type;

	//bi-directional many-to-one association to TCourseSiteUser
	@OneToMany(mappedBy="authority")
	private Set<TCourseSiteUser> TCourseSiteUsers;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="authorities",fetch = FetchType.LAZY)
	private Set<User> users;

	public String getManageTable() {
		return manageTable;
	}

	public void setManageTable(String manageTable) {
		this.manageTable = manageTable;
	}

	public Authority() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAuthorityName() {
		return this.authorityName;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}

	public String getCname() {
		return this.cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	@JsonIgnore
	public Set<TCourseSiteUser> getTCourseSiteUsers() {
		return this.TCourseSiteUsers;
	}

	public void setTCourseSiteUsers(Set<TCourseSiteUser> TCourseSiteUsers) {
		this.TCourseSiteUsers = TCourseSiteUsers;
	}

	public TCourseSiteUser addTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().add(TCourseSiteUser);
		TCourseSiteUser.setAuthority(this);

		return TCourseSiteUser;
	}

	public TCourseSiteUser removeTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().remove(TCourseSiteUser);
		TCourseSiteUser.setAuthority(null);

		return TCourseSiteUser;
	}
	@JsonIgnore
	public Set<User> getUsers() {
		return this.users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}