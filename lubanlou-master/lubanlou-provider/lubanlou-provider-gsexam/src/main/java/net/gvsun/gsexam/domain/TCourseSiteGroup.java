package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;
	//bi-directional many-to-one association to WkUpload
	@OneToMany(mappedBy="user")
	private Set<WkUpload> wkUploads;
	//bi-directional many-to-one association to TCourseSiteGroupComment
	@OneToMany(mappedBy="TCourseSiteGroup")
	private List<TCourseSiteGroupComment> TCourseSiteGroupComments;
	//bi-directional many-to-one association to TCourseSiteGroupJudge
	@OneToMany(mappedBy="TCourseSiteGroup")
	private List<TCourseSiteGroupJudge> TCourseSiteGroupJudges;
	//bi-directional many-to-one association to TCourseSiteGroupActivity
	@OneToMany(mappedBy="TCourseSiteGroup")
	private List<TCourseSiteGroupActivity> TCourseSiteGroupActivities;

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

	public void setWkUploads(Set<WkUpload> wkUploads) {
		this.wkUploads = wkUploads;
	}
	public List<TCourseSiteGroupComment> getTCourseSiteGroupComments() {
		return this.TCourseSiteGroupComments;
	}

	public void setTCourseSiteGroupComments(List<TCourseSiteGroupComment> TCourseSiteGroupComments) {
		this.TCourseSiteGroupComments = TCourseSiteGroupComments;
	}
	public List<TCourseSiteGroupJudge> getTCourseSiteGroupJudges() {
		return this.TCourseSiteGroupJudges;
	}

	public void setTCourseSiteGroupJudges(List<TCourseSiteGroupJudge> TCourseSiteGroupJudges) {
		this.TCourseSiteGroupJudges = TCourseSiteGroupJudges;
	}
	public List<TCourseSiteGroupActivity> getTCourseSiteGroupActivities() {
		return this.TCourseSiteGroupActivities;
	}

	public void setTCourseSiteGroupActivities(List<TCourseSiteGroupActivity> TCourseSiteGroupActivities) {
		this.TCourseSiteGroupActivities = TCourseSiteGroupActivities;
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
	public TCourseSiteGroupComment addTCourseSiteGroupComment(TCourseSiteGroupComment TCourseSiteGroupComment) {
		getTCourseSiteGroupComments().add(TCourseSiteGroupComment);
		TCourseSiteGroupComment.setTCourseSiteGroup(this);

		return TCourseSiteGroupComment;
	}

	public TCourseSiteGroupComment removeTCourseSiteGroupComment(TCourseSiteGroupComment TCourseSiteGroupComment) {
		getTCourseSiteGroupComments().remove(TCourseSiteGroupComment);
		TCourseSiteGroupComment.setTCourseSiteGroup(null);

		return TCourseSiteGroupComment;
	}
	public TCourseSiteGroupJudge addTCourseSiteGroupJudge(TCourseSiteGroupJudge TCourseSiteGroupJudge) {
		getTCourseSiteGroupJudges().add(TCourseSiteGroupJudge);
		TCourseSiteGroupJudge.setTCourseSiteGroup(this);

		return TCourseSiteGroupJudge;
	}

	public TCourseSiteGroupJudge removeTCourseSiteGroupJudge(TCourseSiteGroupJudge TCourseSiteGroupJudge) {
		getTCourseSiteGroupJudges().remove(TCourseSiteGroupJudge);
		TCourseSiteGroupJudge.setTCourseSiteGroup(null);

		return TCourseSiteGroupJudge;
	}
	public TCourseSiteGroupActivity addTCourseSiteGroupActivity(TCourseSiteGroupActivity TCourseSiteGroupActivity) {
		getTCourseSiteGroupActivities().add(TCourseSiteGroupActivity);
		TCourseSiteGroupActivity.setTCourseSiteGroup(this);

		return TCourseSiteGroupActivity;
	}

	public TCourseSiteGroupActivity removeTCourseSiteGroupActivity(TCourseSiteGroupActivity TCourseSiteGroupActivity) {
		getTCourseSiteGroupActivities().remove(TCourseSiteGroupActivity);
		TCourseSiteGroupActivity.setTCourseSiteGroup(null);

		return TCourseSiteGroupActivity;
	}
}