package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the system_campus database table.
 * 
 */
@Entity
@Table(name="system_campus")
@NamedQuery(name="SystemCampus.findAll", query="SELECT s FROM SystemCampus s")
public class SystemCampus implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="campus_number")
	private String campusNumber;

	@Column(name="campus_default")
	private Byte campusDefault;

	@Column(name="campus_name")
	private String campusName;

	@Temporal(TemporalType.DATE)
	@Column(name="created_at")
	private Date createdAt;

	@Temporal(TemporalType.DATE)
	@Column(name="updated_at")
	private Date updatedAt;

	//bi-directional many-to-one association to SystemBuild
	@OneToMany(mappedBy="systemCampus")
	private Set<SystemBuild> systemBuilds;

	//bi-directional many-to-one association to SystemTime
	@OneToMany(mappedBy="systemCampus")
	private Set<SystemTime> systemTimes;

	public SystemCampus() {
	}

	public String getCampusNumber() {
		return this.campusNumber;
	}

	public void setCampusNumber(String campusNumber) {
		this.campusNumber = campusNumber;
	}

	public Byte getCampusDefault() {
		return this.campusDefault;
	}

	public void setCampusDefault(Byte campusDefault) {
		this.campusDefault = campusDefault;
	}

	public String getCampusName() {
		return this.campusName;
	}

	public void setCampusName(String campusName) {
		this.campusName = campusName;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Set<SystemBuild> getSystemBuilds() {
		return this.systemBuilds;
	}

	public void setSystemBuilds(Set<SystemBuild> systemBuilds) {
		this.systemBuilds = systemBuilds;
	}

	public SystemBuild addSystemBuild(SystemBuild systemBuild) {
		getSystemBuilds().add(systemBuild);
		systemBuild.setSystemCampus(this);

		return systemBuild;
	}

	public SystemBuild removeSystemBuild(SystemBuild systemBuild) {
		getSystemBuilds().remove(systemBuild);
		systemBuild.setSystemCampus(null);

		return systemBuild;
	}

	public Set<SystemTime> getSystemTimes() {
		return this.systemTimes;
	}

	public void setSystemTimes(Set<SystemTime> systemTimes) {
		this.systemTimes = systemTimes;
	}

	public SystemTime addSystemTime(SystemTime systemTime) {
		getSystemTimes().add(systemTime);
		systemTime.setSystemCampus(this);

		return systemTime;
	}

	public SystemTime removeSystemTime(SystemTime systemTime) {
		getSystemTimes().remove(systemTime);
		systemTime.setSystemCampus(null);

		return systemTime;
	}

}