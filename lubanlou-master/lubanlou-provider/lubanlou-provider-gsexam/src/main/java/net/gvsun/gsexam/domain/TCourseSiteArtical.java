package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_artical database table.
 * 
 */
@Entity
@Table(name="t_course_site_artical")
@NamedQuery(name="TCourseSiteArtical.findAll", query="SELECT t FROM TCourseSiteArtical t")
public class TCourseSiteArtical implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	private String imageUrl;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_date")
	private Date modifyDate;

	private String name;

	private Integer sort;

	private String text;

	//bi-directional many-to-one association to TCourseSiteChannel
	@ManyToOne
	@JoinColumn(name="channel_id")
	private TCourseSiteChannel TCourseSiteChannel;

	//bi-directional many-to-one association to CTChannelState
	@ManyToOne
	@JoinColumn(name="state")
	private CTChannelState CTChannelState;

	//bi-directional many-to-one association to TCourseSiteTag
	@ManyToOne
	@JoinColumn(name="tag_id")
	private TCourseSiteTag TCourseSiteTag;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_user")
	private User user;

	public TCourseSiteArtical() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getImageUrl() {
		return this.imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public TCourseSiteChannel getTCourseSiteChannel() {
		return this.TCourseSiteChannel;
	}

	public void setTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		this.TCourseSiteChannel = TCourseSiteChannel;
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

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}