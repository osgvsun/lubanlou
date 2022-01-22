package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the common_document database table.
 * 
 */
@Entity
@Table(name="common_document")
@NamedQuery(name="CommonDocument.findAll", query="SELECT c FROM CommonDocument c")
public class CommonDocument implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private String comments;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Column(name="documentName")
	private String documentName;

	@Column(name="documentUrl")
	private String documentUrl;

	private Integer flag;

	@Column(name="lab_annex")
	private Integer labAnnex;

	@Column(name="t_course_site")
	private Integer tCourseSite;

	private Integer type;

	@Column(name="is_used")
	private Integer isUsed;



	//bi-directional many-to-one association to LabRoom
	@ManyToOne
	@JoinColumn(name="lab_room")
	private LabRoom labRoom;

	//bi-directional many-to-one association to LabRoomDevice
	@ManyToOne
	@JoinColumn(name="lab_room_device")
	private LabRoomDevice labRoomDevice;

	//bi-directional many-to-one association to LabConstructionProject
	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User user;

	public CommonDocument() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComments() {
		return this.comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getDocumentName() {
		return this.documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getDocumentUrl() {
		return this.documentUrl;
	}

	public void setDocumentUrl(String documentUrl) {
		this.documentUrl = documentUrl;
	}

	public Integer getFlag() {
		return this.flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public Integer getLabAnnex() {
		return this.labAnnex;
	}

	public void setLabAnnex(int labAnnex) {
		this.labAnnex = labAnnex;
	}

	public Integer getTCourseSite() {
		return this.tCourseSite;
	}

	public void setTCourseSite(int tCourseSite) {
		this.tCourseSite = tCourseSite;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public LabRoom getLabRoom() {
		return this.labRoom;
	}

	public void setLabRoom(LabRoom labRoom) {
		this.labRoom = labRoom;
	}

	public LabRoomDevice getLabRoomDevice() {
		return this.labRoomDevice;
	}

	public void setLabRoomDevice(LabRoomDevice labRoomDevice) {
		this.labRoomDevice = labRoomDevice;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(Integer isUsed) {
		this.isUsed = isUsed;
	}
}