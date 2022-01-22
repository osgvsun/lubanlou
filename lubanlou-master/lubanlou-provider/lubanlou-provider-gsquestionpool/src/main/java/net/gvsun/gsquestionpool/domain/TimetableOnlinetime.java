package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;


/**
 * The persistent class for the timetable_onlinetime database table.
 * 
 */
@Entity
@Table(name="timetable_onlinetime")
@NamedQuery(name="TimetableOnlinetime.findAll", query="SELECT t FROM TimetableOnlinetime t")
public class TimetableOnlinetime implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="login_time")
	private Calendar loginTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="logout_time")
	private Calendar logoutTime;

	@Column(name="online_time")
	private Long onlineTime;

	@Column(name="session_id")
	private String sessionId;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	public TimetableOnlinetime() {
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

	public Calendar getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Calendar loginTime) {
		this.loginTime = loginTime;
	}

	public Calendar getLogoutTime() {
		return logoutTime;
	}

	public void setLogoutTime(Calendar logoutTime) {
		this.logoutTime = logoutTime;
	}

	public Long getOnlineTime() {
		return onlineTime;
	}

	public void setOnlineTime(Long onlineTime) {
		this.onlineTime = onlineTime;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}