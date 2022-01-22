package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the wk_upload database table.
 * 
 */
@Entity
@Table(name="wk_upload")
@NamedQuery(name="WkUpload.findAll", query="SELECT w FROM WkUpload w")
public class WkUpload implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private Integer canDownload;

	private Integer canPreview;

	private String description;

	private Integer isNew_app;

	private Integer isSealed;

	private String name;

	@Column(name="site_id")
	private Integer siteId;

	private String size;

	@Column(name="to_mobile")
	private Integer toMobile;

	private Integer type;

	private Timestamp upTime;

	@Column(name="video_url")
	private String videoUrl;

	@Column(name="newurl")
	private String newUrl;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_user")
	private User user;

	@ManyToOne
	@JoinColumn(name="group_id")
	private TCourseSiteGroup tCourseSiteGroup;
	//bi-directional many-to-one association to TCourseSiteGroupActivity
	@OneToMany(mappedBy="wkUpload")
	private List<TCourseSiteGroupActivity> TCourseSiteGroupActivities;

	//bi-directional many-to-one association to WkFolder
	@ManyToOne
	@JoinColumn(name="folder_id")
	private WkFolder wkFolder;

	@ManyToOne
	@JoinColumn(name="accessmentgrading_id")
	private TAssignmentGrading tAssignmentGrading;

	public WkUpload() {
	}

	public String getNewUrl() {
		return newUrl;
	}

	public void setNewUrl(String newUrl) {
		this.newUrl = newUrl;
	}
	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getCanDownload() {
		return this.canDownload;
	}

	public void setCanDownload(int canDownload) {
		this.canDownload = canDownload;
	}

	public Integer getCanPreview() {
		return this.canPreview;
	}

	public void setCanPreview(int canPreview) {
		this.canPreview = canPreview;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIsNew_app() {
		return this.isNew_app;
	}

	public void setIsNew_app(int isNew_app) {
		this.isNew_app = isNew_app;
	}

	public Integer getIsSealed() {
		return this.isSealed;
	}

	public void setIsSealed(int isSealed) {
		this.isSealed = isSealed;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSiteId() {
		return this.siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public String getSize() {
		return this.size;
	}

	public void setSize(String size) {
		this.size = size;
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

	public Timestamp getUpTime() {
		return this.upTime;
	}

	public void setUpTime(Timestamp upTime) {
		this.upTime = upTime;
	}

	public String getVideoUrl() {
		return this.videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public WkFolder getWkFolder() {
		return this.wkFolder;
	}

	public void setWkFolder(WkFolder wkFolder) {
		this.wkFolder = wkFolder;
	}

	public TCourseSiteGroup gettCourseSiteGroup() {
		return tCourseSiteGroup;
	}

	public void settCourseSiteGroup(TCourseSiteGroup tCourseSiteGroup) {
		this.tCourseSiteGroup = tCourseSiteGroup;
	}
	public List<TCourseSiteGroupActivity> getTCourseSiteGroupActivities() {
		return this.TCourseSiteGroupActivities;
	}

	public void setTCourseSiteGroupActivities(List<TCourseSiteGroupActivity> TCourseSiteGroupActivities) {
		this.TCourseSiteGroupActivities = TCourseSiteGroupActivities;
	}

	public TAssignmentGrading gettAssignmentGrading() {
		return tAssignmentGrading;
	}

	public void settAssignmentGrading(TAssignmentGrading tAssignmentGrading) {
		this.tAssignmentGrading = tAssignmentGrading;
	}
}