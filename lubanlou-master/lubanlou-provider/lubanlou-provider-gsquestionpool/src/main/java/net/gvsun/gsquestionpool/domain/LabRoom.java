package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the lab_room database table.
 *
 */
@Entity
@Table(name="lab_room")
@NamedQuery(name="LabRoom.findAll", query="SELECT l FROM LabRoom l")
public class LabRoom implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="allow_device_use")
	private Integer allowDeviceUse;

	@Column(name="is_used")
	private Integer isUsed;

	@Column(name="lab_room_active")
	private Integer labRoomActive;

	@Column(name="lab_room_address")
	private String labRoomAddress;

	@Column(name="lab_room_area")
	private Double labRoomArea;

	@Lob
	@Column(name="lab_room_attentions")
	private String labRoomAttentions;

	@Column(name="lab_room_audit")
	private Integer labRoomAudit;

	@Column(name="lab_room_capacity")
	private Integer labRoomCapacity;

	@Column(name="lab_room_en_name")
	private String labRoomEnName;

	@Lob
	@Column(name="lab_room_introduction")
	private String labRoomIntroduction;

	@Column(name="lab_room_manager_agencies")
	private String labRoomManagerAgencies;

	@Column(name="lab_room_name")
	private String labRoomName;

	@Column(name="lab_room_number")
	private String labRoomNumber;

	@Lob
	@Column(name="lab_room_prize_information")
	private String labRoomPrizeInformation;

	@Lob
	@Column(name="lab_room_regulations")
	private String labRoomRegulations;

	@Column(name="lab_room_reservation")
	private Integer labRoomReservation;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="lab_room_time_create")
	private Date labRoomTimeCreate;

	@Column(name="lab_roon_abbreviation")
	private String labRoonAbbreviation;

	@Column(name="reservation_number")
	private Integer reservationNumber;

	//可视化地址
	@Column(name = "visual_address_2")
	String visualAddress2;

	public String getVisualAddress2() {
		return visualAddress2;
	}

	public void setVisualAddress2(String visualAddress2) {
		this.visualAddress2 = visualAddress2;
	}

	//bi-directional many-to-one association to CommonDocument
	@OneToMany(mappedBy="labRoom")
	private Set<CommonDocument> commonDocuments;

	//bi-directional many-to-one association to CommonVideo

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="creater_user")
	private User user;

	//bi-directional many-to-one association to SystemRoom
	@ManyToOne
	@JoinColumn(name="system_room")
	private SystemRoom systemRoom;

	//bi-directional many-to-one association to LabRoomDevice
	@OneToMany(mappedBy="labRoom")
	private Set<LabRoomDevice> labRoomDevices;

	public LabRoom() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getAllowDeviceUse() {
		return this.allowDeviceUse;
	}

	public void setAllowDeviceUse(int allowDeviceUse) {
		this.allowDeviceUse = allowDeviceUse;
	}

	public Integer getIsUsed() {
		return this.isUsed;
	}

	public void setIsUsed(int isUsed) {
		this.isUsed = isUsed;
	}

	public Integer getLabRoomActive() {
		return this.labRoomActive;
	}

	public void setLabRoomActive(int labRoomActive) {
		this.labRoomActive = labRoomActive;
	}

	public String getLabRoomAddress() {
		return this.labRoomAddress;
	}

	public void setLabRoomAddress(String labRoomAddress) {
		this.labRoomAddress = labRoomAddress;
	}

	public Double getLabRoomArea() {
		return this.labRoomArea;
	}

	public void setLabRoomArea(Double labRoomArea) {
		this.labRoomArea = labRoomArea;
	}

	public String getLabRoomAttentions() {
		return this.labRoomAttentions;
	}

	public void setLabRoomAttentions(String labRoomAttentions) {
		this.labRoomAttentions = labRoomAttentions;
	}

	public Integer getLabRoomAudit() {
		return this.labRoomAudit;
	}

	public void setLabRoomAudit(int labRoomAudit) {
		this.labRoomAudit = labRoomAudit;
	}

	public Integer getLabRoomCapacity() {
		return this.labRoomCapacity;
	}

	public void setLabRoomCapacity(int labRoomCapacity) {
		this.labRoomCapacity = labRoomCapacity;
	}

	public String getLabRoomEnName() {
		return this.labRoomEnName;
	}

	public void setLabRoomEnName(String labRoomEnName) {
		this.labRoomEnName = labRoomEnName;
	}

	public String getLabRoomIntroduction() {
		return this.labRoomIntroduction;
	}

	public void setLabRoomIntroduction(String labRoomIntroduction) {
		this.labRoomIntroduction = labRoomIntroduction;
	}

	public String getLabRoomManagerAgencies() {
		return this.labRoomManagerAgencies;
	}

	public void setLabRoomManagerAgencies(String labRoomManagerAgencies) {
		this.labRoomManagerAgencies = labRoomManagerAgencies;
	}

	public String getLabRoomName() {
		return this.labRoomName;
	}

	public void setLabRoomName(String labRoomName) {
		this.labRoomName = labRoomName;
	}

	public String getLabRoomNumber() {
		return this.labRoomNumber;
	}

	public void setLabRoomNumber(String labRoomNumber) {
		this.labRoomNumber = labRoomNumber;
	}

	public String getLabRoomPrizeInformation() {
		return this.labRoomPrizeInformation;
	}

	public void setLabRoomPrizeInformation(String labRoomPrizeInformation) {
		this.labRoomPrizeInformation = labRoomPrizeInformation;
	}

	public String getLabRoomRegulations() {
		return this.labRoomRegulations;
	}

	public void setLabRoomRegulations(String labRoomRegulations) {
		this.labRoomRegulations = labRoomRegulations;
	}

	public Integer getLabRoomReservation() {
		return this.labRoomReservation;
	}

	public void setLabRoomReservation(int labRoomReservation) {
		this.labRoomReservation = labRoomReservation;
	}

	public Date getLabRoomTimeCreate() {
		return this.labRoomTimeCreate;
	}

	public void setLabRoomTimeCreate(Date labRoomTimeCreate) {
		this.labRoomTimeCreate = labRoomTimeCreate;
	}

	public String getLabRoonAbbreviation() {
		return this.labRoonAbbreviation;
	}

	public void setLabRoonAbbreviation(String labRoonAbbreviation) {
		this.labRoonAbbreviation = labRoonAbbreviation;
	}

	public Integer getReservationNumber() {
		return this.reservationNumber;
	}

	public void setReservationNumber(int reservationNumber) {
		this.reservationNumber = reservationNumber;
	}

	public Set<CommonDocument> getCommonDocuments() {
		return this.commonDocuments;
	}

	public void setCommonDocuments(Set<CommonDocument> commonDocuments) {
		this.commonDocuments = commonDocuments;
	}

	public CommonDocument addCommonDocument(CommonDocument commonDocument) {
		getCommonDocuments().add(commonDocument);
		commonDocument.setLabRoom(this);

		return commonDocument;
	}

	public CommonDocument removeCommonDocument(CommonDocument commonDocument) {
		getCommonDocuments().remove(commonDocument);
		commonDocument.setLabRoom(null);

		return commonDocument;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public SystemRoom getSystemRoom() {
		return this.systemRoom;
	}

	public void setSystemRoom(SystemRoom systemRoom) {
		this.systemRoom = systemRoom;
	}

	public Set<LabRoomDevice> getLabRoomDevices() {
		return this.labRoomDevices;
	}

	public void setLabRoomDevices(Set<LabRoomDevice> labRoomDevices) {
		this.labRoomDevices = labRoomDevices;
	}

	public LabRoomDevice addLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().add(labRoomDevice);
		labRoomDevice.setLabRoom(this);

		return labRoomDevice;
	}

	public LabRoomDevice removeLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().remove(labRoomDevice);
		labRoomDevice.setLabRoom(null);

		return labRoomDevice;
	}

}