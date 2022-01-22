package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_group_comment database table.
 * 
 */
@Entity
@Table(name="t_course_site_group_comment")
@NamedQuery(name="TCourseSiteGroupComment.findAll", query="SELECT t FROM TCourseSiteGroupComment t")
public class TCourseSiteGroupComment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private String comment;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	private Integer period;

	private String score;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	//bi-directional many-to-one association to TCourseSiteGroup
	@ManyToOne
	@JoinColumn(name="group_id")
	private TCourseSiteGroup TCourseSiteGroup;

	public TCourseSiteGroupComment() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Integer getPeriod() {
		return this.period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	public String getScore() {
		return this.score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TCourseSiteGroup getTCourseSiteGroup() {
		return this.TCourseSiteGroup;
	}

	public void setTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
		this.TCourseSiteGroup = TCourseSiteGroup;
	}

}