package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_group_activity database table.
 * 
 */
@Entity
@Table(name="t_course_site_group_activity")
@NamedQuery(name="TCourseSiteGroupActivity.findAll", query="SELECT t FROM TCourseSiteGroupActivity t")
public class TCourseSiteGroupActivity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="activity_date")
	private Date activityDate;

	private String address;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	@Column(name="github_address")
	private String githubAddress;

	private Integer period;

	@Column(name="product_progress")
	private String productProgress;

	private String remarks;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	//bi-directional many-to-one association to TCourseSiteGroup
	@ManyToOne
	@JoinColumn(name="group_id")
	private TCourseSiteGroup TCourseSiteGroup;

	//bi-directional many-to-one association to WkUpload
	@ManyToOne
	@JoinColumn(name="wkupload_id")
	private WkUpload wkUpload;

	public TCourseSiteGroupActivity() {
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getGithubAddress() {
		return githubAddress;
	}

	public void setGithubAddress(String githubAddress) {
		this.githubAddress = githubAddress;
	}

	public Integer getPeriod() {
		return period;
	}

	public void setPeriod(Integer period) {
		this.period = period;
	}

	public String getProductProgress() {
		return productProgress;
	}

	public void setProductProgress(String productProgress) {
		this.productProgress = productProgress;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TCourseSiteGroup getTCourseSiteGroup() {
		return TCourseSiteGroup;
	}

	public void setTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
		this.TCourseSiteGroup = TCourseSiteGroup;
	}

	public WkUpload getWkUpload() {
		return wkUpload;
	}

	public void setWkUpload(WkUpload wkUpload) {
		this.wkUpload = wkUpload;
	}
}