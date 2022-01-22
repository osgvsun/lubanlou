package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the wk_folder database table.
 * 
 */
@Entity
@Table(name="wk_folder")
@NamedQuery(name="WkFolder.findAll", query="SELECT w FROM WkFolder w")
public class WkFolder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	private String name;

	@Column(name="qrcode_url")
	private String qrcodeUrl;

	@Column(name="to_mobile")
	private Integer toMobile;

	private Integer expSkillId;

	public Integer getExpSkillId() {
		return expSkillId;
	}

	public void setExpSkillId(Integer expSkillId) {
		this.expSkillId = expSkillId;
	}

	private Integer type;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_time")
	private Date updateTime;

	private String videoUrl;

	//bi-directional many-to-one association to TAssignment
	@OneToMany(mappedBy="wkFolder")
	private Set<TAssignment> TAssignments;

	//bi-directional many-to-one association to WkLesson
	@ManyToOne
	@JoinColumn(name="lesson_id")
	private WkLesson wkLesson;

	//bi-directional many-to-one association to WkFolder
	@ManyToOne
	@JoinColumn(name="parent")
	private WkFolder wkFolder;

	//bi-directional many-to-one association to WkFolder
	@OneToMany(mappedBy="wkFolder")
	private Set<WkFolder> wkFolders;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_user")
	private User user;

	//bi-directional many-to-one association to WkChapter
	@ManyToOne
	@JoinColumn(name="chapter_id")
	private WkChapter wkChapter;

	//bi-directional many-to-one association to WkUpload
	@OneToMany(mappedBy="wkFolder")
	private Set<WkUpload> wkUploads;

	public WkFolder() {
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

	public String getQRCode_url() {
		return this.qrcodeUrl;
	}

	public void setQRCode_url(String qRCode_url) {
		this.qrcodeUrl = qRCode_url;
	}

	public Integer getToMobile() {
		return this.toMobile;
	}

	public void setToMobile(int toMobile) {
		this.toMobile = toMobile;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getVideoUrl() {
		return this.videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public Set<TAssignment> getTAssignments() {
		return this.TAssignments;
	}

	public void setTAssignments(Set<TAssignment> TAssignments) {
		this.TAssignments = TAssignments;
	}

	public TAssignment addTAssignment(TAssignment TAssignment) {
		getTAssignments().add(TAssignment);
		TAssignment.setWkFolder(this);

		return TAssignment;
	}

	public TAssignment removeTAssignment(TAssignment TAssignment) {
		getTAssignments().remove(TAssignment);
		TAssignment.setWkFolder(null);

		return TAssignment;
	}

	public WkLesson getWkLesson() {
		return this.wkLesson;
	}

	public void setWkLesson(WkLesson wkLesson) {
		this.wkLesson = wkLesson;
	}

	public WkFolder getWkFolder() {
		return this.wkFolder;
	}

	public void setWkFolder(WkFolder wkFolder) {
		this.wkFolder = wkFolder;
	}

	public Set<WkFolder> getWkFolders() {
		return this.wkFolders;
	}

	public void setWkFolders(Set<WkFolder> wkFolders) {
		this.wkFolders = wkFolders;
	}

	public WkFolder addWkFolder(WkFolder wkFolder) {
		getWkFolders().add(wkFolder);
		wkFolder.setWkFolder(this);

		return wkFolder;
	}

	public WkFolder removeWkFolder(WkFolder wkFolder) {
		getWkFolders().remove(wkFolder);
		wkFolder.setWkFolder(null);

		return wkFolder;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public WkChapter getWkChapter() {
		return this.wkChapter;
	}

	public void setWkChapter(WkChapter wkChapter) {
		this.wkChapter = wkChapter;
	}

	public Set<WkUpload> getWkUploads() {
		return this.wkUploads;
	}

	public void setWkUploads(Set<WkUpload> wkUploads) {
		this.wkUploads = wkUploads;
	}

	public WkUpload addWkUpload(WkUpload wkUpload) {
		getWkUploads().add(wkUpload);
		wkUpload.setWkFolder(this);

		return wkUpload;
	}

	public WkUpload removeWkUpload(WkUpload wkUpload) {
		getWkUploads().remove(wkUpload);
		wkUpload.setWkFolder(null);

		return wkUpload;
	}

}