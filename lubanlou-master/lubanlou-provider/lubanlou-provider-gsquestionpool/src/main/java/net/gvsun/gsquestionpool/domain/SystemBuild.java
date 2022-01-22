package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the system_build database table.
 * 
 */
@Entity
@Table(name="system_build")
@NamedQuery(name="SystemBuild.findAll", query="SELECT s FROM SystemBuild s")
public class SystemBuild implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="build_number")
	private String buildNumber;

	private String area;

	@Column(name="build_name")
	private String buildName;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	private byte enabled;

	@Column(name="floor_num")
	private Integer floorNum;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;

	@Column(name="x_coordinate")
	private BigDecimal xCoordinate;

	@Column(name="y_coordinate")
	private BigDecimal yCoordinate;

	//bi-directional many-to-one association to SchoolDevice
	@OneToMany(mappedBy="systemBuild")
	private Set<SchoolDevice> schoolDevices;

	//bi-directional many-to-one association to SystemCampus
	@ManyToOne
	@JoinColumn(name="campus_number")
	private SystemCampus systemCampus;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User userByCreatedBy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="updated_by")
	private User userByUpdatedBy;

	//bi-directional many-to-one association to SystemRoom
	@OneToMany(mappedBy="systemBuild")
	private Set<SystemRoom> systemRooms;

	public SystemBuild() {
	}

	public String getBuildNumber() {
		return this.buildNumber;
	}

	public void setBuildNumber(String buildNumber) {
		this.buildNumber = buildNumber;
	}

	public String getArea() {
		return this.area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getBuildName() {
		return this.buildName;
	}

	public void setBuildName(String buildName) {
		this.buildName = buildName;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public byte getEnabled() {
		return this.enabled;
	}

	public void setEnabled(byte enabled) {
		this.enabled = enabled;
	}

	public Integer getFloorNum() {
		return this.floorNum;
	}

	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public BigDecimal getXCoordinate() {
		return this.xCoordinate;
	}

	public void setXCoordinate(BigDecimal xCoordinate) {
		this.xCoordinate = xCoordinate;
	}

	public BigDecimal getYCoordinate() {
		return this.yCoordinate;
	}

	public void setYCoordinate(BigDecimal yCoordinate) {
		this.yCoordinate = yCoordinate;
	}

	public Set<SchoolDevice> getSchoolDevices() {
		return this.schoolDevices;
	}

	public void setSchoolDevices(Set<SchoolDevice> schoolDevices) {
		this.schoolDevices = schoolDevices;
	}

	public SchoolDevice addSchoolDevice(SchoolDevice schoolDevice) {
		getSchoolDevices().add(schoolDevice);
		schoolDevice.setSystemBuild(this);

		return schoolDevice;
	}

	public SchoolDevice removeSchoolDevice(SchoolDevice schoolDevice) {
		getSchoolDevices().remove(schoolDevice);
		schoolDevice.setSystemBuild(null);

		return schoolDevice;
	}

	public SystemCampus getSystemCampus() {
		return this.systemCampus;
	}

	public void setSystemCampus(SystemCampus systemCampus) {
		this.systemCampus = systemCampus;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public User getUserByCreatedBy() {
		return this.userByCreatedBy;
	}

	public void setUserByCreatedBy(User userByCreatedBy) {
		this.userByCreatedBy = userByCreatedBy;
	}

	public User getUserByUpdatedBy() {
		return this.userByUpdatedBy;
	}

	public void setUserByUpdatedBy(User userByUpdatedBy) {
		this.userByUpdatedBy = userByUpdatedBy;
	}

	public Set<SystemRoom> getSystemRooms() {
		return this.systemRooms;
	}

	public void setSystemRooms(Set<SystemRoom> systemRooms) {
		this.systemRooms = systemRooms;
	}

	public SystemRoom addSystemRoom(SystemRoom systemRoom) {
		getSystemRooms().add(systemRoom);
		systemRoom.setSystemBuild(this);

		return systemRoom;
	}

	public SystemRoom removeSystemRoom(SystemRoom systemRoom) {
		getSystemRooms().remove(systemRoom);
		systemRoom.setSystemBuild(null);

		return systemRoom;
	}

}