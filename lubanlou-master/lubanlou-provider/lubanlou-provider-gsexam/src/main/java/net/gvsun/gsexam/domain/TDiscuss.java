package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;


/**
 * The persistent class for the t_discuss database table.
 * 
 */
@Entity
@Table(name="t_discuss")
@NamedQuery(name="TDiscuss.findAll", query="SELECT t FROM TDiscuss t")
public class TDiscuss implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private String content;

	private Timestamp discussTime;

	private String ip;

	@Column(name="skill_id")
	private Integer skillId;

	private String title;

	private Integer type;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	//bi-directional many-to-one association to TDiscuss
	@ManyToOne
	@JoinColumn(name="topDiscuss")
	private TDiscuss TDiscuss;

	//bi-directional many-to-one association to TDiscuss
	@OneToMany(mappedBy="TDiscuss")
	private Set<TDiscuss> TDiscusses;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="siteId")
	private TCourseSite TCourseSite;

	public TDiscuss() {
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

	public Timestamp getDiscussTime() {
		return this.discussTime;
	}

	public void setDiscussTime(Timestamp discussTime) {
		this.discussTime = discussTime;
	}

	public String getIp() {
		return this.ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getSkillId() {
		return this.skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TDiscuss getTDiscuss() {
		return this.TDiscuss;
	}

	public void setTDiscuss(TDiscuss TDiscuss) {
		this.TDiscuss = TDiscuss;
	}

	public Set<TDiscuss> getTDiscusses() {
		return this.TDiscusses;
	}

	public void setTDiscusses(Set<TDiscuss> TDiscusses) {
		this.TDiscusses = TDiscusses;
	}

	public TDiscuss addTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().add(TDiscuss);
		TDiscuss.setTDiscuss(this);

		return TDiscuss;
	}

	public TDiscuss removeTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().remove(TDiscuss);
		TDiscuss.setTDiscuss(null);

		return TDiscuss;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

}