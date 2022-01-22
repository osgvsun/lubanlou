package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_schedule database table.
 * 
 */
@Entity
@Table(name="t_course_site_schedule")
@NamedQuery(name="TCourseSiteSchedule.findAll", query="SELECT t FROM TCourseSiteSchedule t")
public class TCourseSiteSchedule implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	private Integer day;

	private String place;

	private Integer session;

	private Integer week;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="create_by")
	private User user;

	public TCourseSiteSchedule() {
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

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getDay() {
		return this.day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public String getPlace() {
		return this.place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public Integer getSession() {
		return this.session;
	}

	public void setSession(int session) {
		this.session = session;
	}

	public Integer getWeek() {
		return this.week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}