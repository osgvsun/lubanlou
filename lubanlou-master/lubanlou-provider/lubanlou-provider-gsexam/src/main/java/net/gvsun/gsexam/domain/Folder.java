package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the folder database table.
 * 
 */
@Entity
@NamedQuery(name="Folder.findAll", query="SELECT f FROM Folder f")
public class Folder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_time")
	private Date updateTime;

	//bi-directional many-to-one association to Folder
	@ManyToOne
	@JoinColumn(name="parent")
	private Folder folder;

	//bi-directional many-to-one association to Folder
	@OneToMany(mappedBy="folder")
	private Set<Folder> folders;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_user")
	private User user;

	public Folder() {
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

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Folder getFolder() {
		return this.folder;
	}

	public void setFolder(Folder folder) {
		this.folder = folder;
	}

	public Set<Folder> getFolders() {
		return this.folders;
	}

	public void setFolders(Set<Folder> folders) {
		this.folders = folders;
	}

	public Folder addFolder(Folder folder) {
		getFolders().add(folder);
		folder.setFolder(this);

		return folder;
	}

	public Folder removeFolder(Folder folder) {
		getFolders().remove(folder);
		folder.setFolder(null);

		return folder;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}