package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_course_site_channel database table.
 * 
 */
@Entity
@Table(name="t_course_site_channel")
@NamedQuery(name="TCourseSiteChannel.findAll", query="SELECT t FROM TCourseSiteChannel t")
public class TCourseSiteChannel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String channelName;

	private String channelText;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	private String imageUrl;

	private String link;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_date")
	private Date modifyDate;

	//bi-directional many-to-many association to TCourseSiteChannel
	@ManyToMany
	@JoinTable(
		name="t_channel_parentchannel"
		, joinColumns={
			@JoinColumn(name="parent_channel_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="channel_id")
			}
		)
	private Set<TCourseSiteChannel> TCourseSiteChannels1;

	//bi-directional many-to-many association to TCourseSiteChannel
	@ManyToMany(mappedBy="TCourseSiteChannels1")
	private Set<TCourseSiteChannel> TCourseSiteChannels2;

	//bi-directional many-to-one association to TCourseSiteArtical
	@OneToMany(mappedBy="TCourseSiteChannel")
	private Set<TCourseSiteArtical> TCourseSiteArticals;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_user")
	private User user;

	//bi-directional many-to-one association to CTChannelState
	@ManyToOne
	@JoinColumn(name="state")
	private CTChannelState CTChannelState;

	//bi-directional many-to-one association to TCourseSiteTag
	@ManyToOne
	@JoinColumn(name="tag_id")
	private TCourseSiteTag TCourseSiteTag;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	public TCourseSiteChannel() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getChannelName() {
		return this.channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

	public String getChannelText() {
		return this.channelText;
	}

	public void setChannelText(String channelText) {
		this.channelText = channelText;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getLink() {
		return this.link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Set<TCourseSiteChannel> getTCourseSiteChannels1() {
		return this.TCourseSiteChannels1;
	}

	public void setTCourseSiteChannels1(Set<TCourseSiteChannel> TCourseSiteChannels1) {
		this.TCourseSiteChannels1 = TCourseSiteChannels1;
	}

	public Set<TCourseSiteChannel> getTCourseSiteChannels2() {
		return this.TCourseSiteChannels2;
	}

	public void setTCourseSiteChannels2(Set<TCourseSiteChannel> TCourseSiteChannels2) {
		this.TCourseSiteChannels2 = TCourseSiteChannels2;
	}

	public Set<TCourseSiteArtical> getTCourseSiteArticals() {
		return this.TCourseSiteArticals;
	}

	public void setTCourseSiteArticals(Set<TCourseSiteArtical> TCourseSiteArticals) {
		this.TCourseSiteArticals = TCourseSiteArticals;
	}

	public TCourseSiteArtical addTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().add(TCourseSiteArtical);
		TCourseSiteArtical.setTCourseSiteChannel(this);

		return TCourseSiteArtical;
	}

	public TCourseSiteArtical removeTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().remove(TCourseSiteArtical);
		TCourseSiteArtical.setTCourseSiteChannel(null);

		return TCourseSiteArtical;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public CTChannelState getCTChannelState() {
		return this.CTChannelState;
	}

	public void setCTChannelState(CTChannelState CTChannelState) {
		this.CTChannelState = CTChannelState;
	}

	public TCourseSiteTag getTCourseSiteTag() {
		return this.TCourseSiteTag;
	}

	public void setTCourseSiteTag(TCourseSiteTag TCourseSiteTag) {
		this.TCourseSiteTag = TCourseSiteTag;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

}