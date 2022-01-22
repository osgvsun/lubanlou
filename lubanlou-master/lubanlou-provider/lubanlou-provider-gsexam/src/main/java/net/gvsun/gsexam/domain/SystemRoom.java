package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the system_room database table.
 * 
 */
@Entity
@Table(name="system_room")
@NamedQuery(name="SystemRoom.findAll", query="SELECT s FROM SystemRoom s")
public class SystemRoom implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="room_number")
	private String roomNumber;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="department_number")
	private String departmentNumber;

	@Column(name="room_name")
	private String roomName;

	@Column(name="room_no")
	private String roomNo;

	@Column(name="room_use")
	private String roomUse;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	//bi-directional many-to-one association to LabRoom
	@OneToMany(mappedBy="systemRoom")
	private Set<LabRoom> labRooms;

	//bi-directional many-to-one association to SystemBuild
	@ManyToOne
	@JoinColumn(name="build_number")
	private SystemBuild systemBuild;

	public SystemRoom() {
	}

	public String getRoomNumber() {
		return this.roomNumber;
	}

	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getDepartmentNumber() {
		return this.departmentNumber;
	}

	public void setDepartmentNumber(String departmentNumber) {
		this.departmentNumber = departmentNumber;
	}

	public String getRoomName() {
		return this.roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public String getRoomNo() {
		return this.roomNo;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

	public String getRoomUse() {
		return this.roomUse;
	}

	public void setRoomUse(String roomUse) {
		this.roomUse = roomUse;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Set<LabRoom> getLabRooms() {
		return this.labRooms;
	}

	public void setLabRooms(Set<LabRoom> labRooms) {
		this.labRooms = labRooms;
	}

	public LabRoom addLabRoom(LabRoom labRoom) {
		getLabRooms().add(labRoom);
		labRoom.setSystemRoom(this);

		return labRoom;
	}

	public LabRoom removeLabRoom(LabRoom labRoom) {
		getLabRooms().remove(labRoom);
		labRoom.setSystemRoom(null);

		return labRoom;
	}

	public SystemBuild getSystemBuild() {
		return this.systemBuild;
	}

	public void setSystemBuild(SystemBuild systemBuild) {
		this.systemBuild = systemBuild;
	}

}