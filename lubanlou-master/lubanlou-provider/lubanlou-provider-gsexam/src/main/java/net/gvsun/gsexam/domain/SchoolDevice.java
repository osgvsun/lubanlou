package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the school_device database table.
 * 
 */
@Entity
@Table(name="school_device")
@NamedQuery(name="SchoolDevice.findAll", query="SELECT s FROM SchoolDevice s")
public class SchoolDevice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="device_number")
	private String deviceNumber;

	@Column(name="academy_memo")
	private String academyMemo;

	@Column(name="category_main")
	private String categoryMain;

	@Column(name="category_type")
	private String categoryType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Temporal(TemporalType.DATE)
	@Column(name="device_accounted_date")
	private Date deviceAccountedDate;

	@Column(name="device_address")
	private String deviceAddress;

	@Temporal(TemporalType.DATE)
	@Column(name="device_buy_date")
	private Date deviceBuyDate;

	@Column(name="device_country")
	private String deviceCountry;

	@Column(name="device_en_name")
	private String deviceEnName;

	@Column(name="device_format")
	private String deviceFormat;

	@Column(name="device_name")
	private String deviceName;

	@Column(name="device_pattern")
	private String devicePattern;

	@Column(name="device_price")
	private BigDecimal devicePrice;

	@Column(name="device_status")
	private String deviceStatus;

	@Column(name="device_supplier")
	private String deviceSupplier;

	@Column(name="device_use_direction")
	private String deviceUseDirection;

	private Integer id;

	@Column(name="inner_device_name")
	private String innerDeviceName;

	@Column(name="inner_same")
	private Integer innerSame;

	private String manufacturer;

	@Column(name="project_source")
	private String projectSource;

	private String sn;

	@Column(name="system_room")
	private String systemRoom;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_at")
	private Date updatedAt;

	@Column(name="use_count")
	private Integer useCount;

	@Column(name="use_hours")
	private BigDecimal useHours;

	//bi-directional many-to-one association to LabRoomDevice
	@OneToMany(mappedBy="schoolDevice")
	private Set<LabRoomDevice> labRoomDevices;

	//bi-directional many-to-one association to SchoolAcademy
	@ManyToOne
	@JoinColumn(name="department_number")
	private SchoolAcademy schoolAcademy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="keep_user")
	private User userByKeepUser;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_number")
	private User userByUserNumber;

	//bi-directional many-to-one association to SystemBuild
	@ManyToOne
	@JoinColumn(name="system_build")
	private SystemBuild systemBuild;

	public SchoolDevice() {
	}

	public String getDeviceNumber() {
		return this.deviceNumber;
	}

	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}

	public String getAcademyMemo() {
		return this.academyMemo;
	}

	public void setAcademyMemo(String academyMemo) {
		this.academyMemo = academyMemo;
	}

	public String getCategoryMain() {
		return this.categoryMain;
	}

	public void setCategoryMain(String categoryMain) {
		this.categoryMain = categoryMain;
	}

	public String getCategoryType() {
		return this.categoryType;
	}

	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getDeviceAccountedDate() {
		return this.deviceAccountedDate;
	}

	public void setDeviceAccountedDate(Date deviceAccountedDate) {
		this.deviceAccountedDate = deviceAccountedDate;
	}

	public String getDeviceAddress() {
		return this.deviceAddress;
	}

	public void setDeviceAddress(String deviceAddress) {
		this.deviceAddress = deviceAddress;
	}

	public Date getDeviceBuyDate() {
		return this.deviceBuyDate;
	}

	public void setDeviceBuyDate(Date deviceBuyDate) {
		this.deviceBuyDate = deviceBuyDate;
	}

	public String getDeviceCountry() {
		return this.deviceCountry;
	}

	public void setDeviceCountry(String deviceCountry) {
		this.deviceCountry = deviceCountry;
	}

	public String getDeviceEnName() {
		return this.deviceEnName;
	}

	public void setDeviceEnName(String deviceEnName) {
		this.deviceEnName = deviceEnName;
	}

	public String getDeviceFormat() {
		return this.deviceFormat;
	}

	public void setDeviceFormat(String deviceFormat) {
		this.deviceFormat = deviceFormat;
	}

	public String getDeviceName() {
		return this.deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getDevicePattern() {
		return this.devicePattern;
	}

	public void setDevicePattern(String devicePattern) {
		this.devicePattern = devicePattern;
	}

	public BigDecimal getDevicePrice() {
		return this.devicePrice;
	}

	public void setDevicePrice(BigDecimal devicePrice) {
		this.devicePrice = devicePrice;
	}

	public String getDeviceStatus() {
		return this.deviceStatus;
	}

	public void setDeviceStatus(String deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	public String getDeviceSupplier() {
		return this.deviceSupplier;
	}

	public void setDeviceSupplier(String deviceSupplier) {
		this.deviceSupplier = deviceSupplier;
	}

	public String getDeviceUseDirection() {
		return this.deviceUseDirection;
	}

	public void setDeviceUseDirection(String deviceUseDirection) {
		this.deviceUseDirection = deviceUseDirection;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getInnerDeviceName() {
		return this.innerDeviceName;
	}

	public void setInnerDeviceName(String innerDeviceName) {
		this.innerDeviceName = innerDeviceName;
	}

	public Integer getInnerSame() {
		return this.innerSame;
	}

	public void setInnerSame(int innerSame) {
		this.innerSame = innerSame;
	}

	public String getManufacturer() {
		return this.manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getProjectSource() {
		return this.projectSource;
	}

	public void setProjectSource(String projectSource) {
		this.projectSource = projectSource;
	}

	public String getSn() {
		return this.sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public String getSystemRoom() {
		return this.systemRoom;
	}

	public void setSystemRoom(String systemRoom) {
		this.systemRoom = systemRoom;
	}

	public Date getUpdatedAt() {
		return this.updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getUseCount() {
		return this.useCount;
	}

	public void setUseCount(int useCount) {
		this.useCount = useCount;
	}

	public BigDecimal getUseHours() {
		return this.useHours;
	}

	public void setUseHours(BigDecimal useHours) {
		this.useHours = useHours;
	}

	public Set<LabRoomDevice> getLabRoomDevices() {
		return this.labRoomDevices;
	}

	public void setLabRoomDevices(Set<LabRoomDevice> labRoomDevices) {
		this.labRoomDevices = labRoomDevices;
	}

	public LabRoomDevice addLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().add(labRoomDevice);
		labRoomDevice.setSchoolDevice(this);

		return labRoomDevice;
	}

	public LabRoomDevice removeLabRoomDevice(LabRoomDevice labRoomDevice) {
		getLabRoomDevices().remove(labRoomDevice);
		labRoomDevice.setSchoolDevice(null);

		return labRoomDevice;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public User getUserByKeepUser() {
		return this.userByKeepUser;
	}

	public void setUserByKeepUser(User userByKeepUser) {
		this.userByKeepUser = userByKeepUser;
	}

	public User getUserByUserNumber() {
		return this.userByUserNumber;
	}

	public void setUserByUserNumber(User userByUserNumber) {
		this.userByUserNumber = userByUserNumber;
	}

	public SystemBuild getSystemBuild() {
		return this.systemBuild;
	}

	public void setSystemBuild(SystemBuild systemBuild) {
		this.systemBuild = systemBuild;
	}

}