package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_course_site_group database table.
 * 
 */
@Entity
@Table(name="t_course_site_group")
@NamedQuery(name="TCourseSiteGroup.findAll", query="SELECT t FROM TCourseSiteGroup t")
public class TCourseSiteGroup implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private String description;

	@Column(name="group_title")
	private String groupTitle;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	@Column(name="github_address")
	private String githubAddress;

	@Column(name="is_open")
	private Integer isOpen;

	@Column(name="publish")
	private Integer publish;

	@Column(name="is_excellent")
	private Integer isExcellent;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	@Column(name = "assignment_id")
	private Integer assignmentId;

	@Column(name = "category_id")
	private Integer categoryId;

	//bi-directional many-to-one association to WkUpload
	@OneToMany(mappedBy="user")
	private Set<WkUpload> wkUploads;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getGithubAddress() {
		return githubAddress;
	}

	public void setGithubAddress(String githubAddress) {
		this.githubAddress = githubAddress;
	}

	public TCourseSiteGroup() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGroupTitle() {
		return this.groupTitle;
	}

	public void setGroupTitle(String groupTitle) {
		this.groupTitle = groupTitle;
	}
	public Integer getIsOpen() {
		return this.isOpen;
	}

	public void setIsOpen(Integer isOpen) {
		this.isOpen = isOpen;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public Set<WkUpload> getWkUploads() {
		return this.wkUploads;
	}

	public WkUpload addWkUpload(WkUpload wkUpload) {
		getWkUploads().add(wkUpload);
		wkUpload.settCourseSiteGroup(this);

		return wkUpload;
	}

	public WkUpload removeWkUpload(WkUpload wkUpload) {
		getWkUploads().remove(wkUpload);
		wkUpload.settCourseSiteGroup(null);

		return wkUpload;
	}

	public Integer getPublish() {
		return publish;
	}

	public void setPublish(Integer publish) {
		this.publish = publish;
	}

	public Integer getIsExcellent() {
		return isExcellent;
	}

	public void setIsExcellent(Integer isExcellent) {
		this.isExcellent = isExcellent;
	}

	public Integer getAssignmentId() {
		return assignmentId;
	}

	public void setAssignmentId(Integer assignmentId) {
		this.assignmentId = assignmentId;
	}
}