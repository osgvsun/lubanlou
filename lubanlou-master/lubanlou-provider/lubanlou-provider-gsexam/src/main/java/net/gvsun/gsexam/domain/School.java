package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the school database table.
 * 
 */
@Entity
@Table(name="school")
@NamedQuery(name="School.findAll", query="SELECT s FROM School s")
public class School implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer number;

	@Column(name="name")
	private String name;

	@Column(name="project_name")
	private String projectName;

	@Column(name="title")
	private String title;

	@Column(name="prefix")
	private String prefix;

	@Column(name="photo_url")
	private String photoUrl;






	public School() {
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProjectName() {
		return this.projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPrefix() {
		return this.prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getPhotoUrl() {
		return this.photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}





}