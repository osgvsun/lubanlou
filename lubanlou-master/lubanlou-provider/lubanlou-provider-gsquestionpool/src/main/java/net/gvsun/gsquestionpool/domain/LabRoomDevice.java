package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the lab_room_device database table.
 * 
 */
@Entity
@Table(name="lab_room_device")
@NamedQuery(name="LabRoomDevice.findAll", query="SELECT l FROM LabRoomDevice l")
public class LabRoomDevice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Lob
	private String applications;

	@Column(name="audit_time_limit")
	private Integer auditTimeLimit;

	private String dimensionalCode;

	@Lob
	private String features;

	@Lob
	private String function;

	@Lob
	private String indicators;

	@Column(name="is_audit_time_limit")
	private Integer isAuditTimeLimit;

	@Column(name="manager_mail")
	private String managerMail;

	@Column(name="manager_office")
	private String managerOffice;

	@Column(name="manager_telephone")
	private String managerTelephone;

	private BigDecimal price;

	private String qRCode_url;

	@Column(name="x_coordinate")
	private BigDecimal xCoordinate;

	@Column(name="y_coordinate")
	private BigDecimal yCoordinate;

	//bi-directional many-to-one association to LabRoom
	@ManyToOne
	@JoinColumn(name="lab_room_id")
	private LabRoom labRoom;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="manager_user")
	private User user;

	//bi-directional many-to-one association to SchoolDevice
	@ManyToOne
	@JoinColumn(name="school_device_id")
	private SchoolDevice schoolDevice;

	public LabRoomDevice() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApplications() {
		return this.applications;
	}

	public void setApplications(String applications) {
		this.applications = applications;
	}

	public Integer getAuditTimeLimit() {
		return this.auditTimeLimit;
	}

	public void setAuditTimeLimit(int auditTimeLimit) {
		this.auditTimeLimit = auditTimeLimit;
	}

	public String getDimensionalCode() {
		return this.dimensionalCode;
	}

	public void setDimensionalCode(String dimensionalCode) {
		this.dimensionalCode = dimensionalCode;
	}

	public String getFeatures() {
		return this.features;
	}

	public void setFeatures(String features) {
		this.features = features;
	}

	public String getFunction() {
		return this.function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	public String getIndicators() {
		return this.indicators;
	}

	public void setIndicators(String indicators) {
		this.indicators = indicators;
	}

	public Integer getIsAuditTimeLimit() {
		return this.isAuditTimeLimit;
	}

	public void setIsAuditTimeLimit(int isAuditTimeLimit) {
		this.isAuditTimeLimit = isAuditTimeLimit;
	}

	public String getManagerMail() {
		return this.managerMail;
	}

	public void setManagerMail(String managerMail) {
		this.managerMail = managerMail;
	}

	public String getManagerOffice() {
		return this.managerOffice;
	}

	public void setManagerOffice(String managerOffice) {
		this.managerOffice = managerOffice;
	}

	public String getManagerTelephone() {
		return this.managerTelephone;
	}

	public void setManagerTelephone(String managerTelephone) {
		this.managerTelephone = managerTelephone;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getQRCode_url() {
		return this.qRCode_url;
	}

	public void setQRCode_url(String qRCode_url) {
		this.qRCode_url = qRCode_url;
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

	public LabRoom getLabRoom() {
		return this.labRoom;
	}

	public void setLabRoom(LabRoom labRoom) {
		this.labRoom = labRoom;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public SchoolDevice getSchoolDevice() {
		return this.schoolDevice;
	}

	public void setSchoolDevice(SchoolDevice schoolDevice) {
		this.schoolDevice = schoolDevice;
	}


}