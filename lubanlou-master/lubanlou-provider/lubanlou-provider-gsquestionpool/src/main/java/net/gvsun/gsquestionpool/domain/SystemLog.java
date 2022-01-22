package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the system_log database table.
 * 
 */
@Entity
@Table(name="system_log")
@NamedQuery(name="SystemLog.findAll", query="SELECT s FROM SystemLog s")
public class SystemLog implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="calendar_time")
	private Date calendarTime;

	@Column(name="child_module")
	private String childModule;

	@Column(name="objective_detail")
	private String objectiveDetail;

	@Column(name="operation_action")
	private Integer operationAction;

	@Column(name="super_module")
	private String superModule;

	@Column(name="user_academy")
	private String userAcademy;

	@Column(name="user_detail")
	private String userDetail;

	@Column(name="user_ip")
	private String userIp;

	public SystemLog() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCalendarTime() {
		return this.calendarTime;
	}

	public void setCalendarTime(Date calendarTime) {
		this.calendarTime = calendarTime;
	}

	public String getChildModule() {
		return this.childModule;
	}

	public void setChildModule(String childModule) {
		this.childModule = childModule;
	}

	public String getObjectiveDetail() {
		return this.objectiveDetail;
	}

	public void setObjectiveDetail(String objectiveDetail) {
		this.objectiveDetail = objectiveDetail;
	}

	public Integer getOperationAction() {
		return this.operationAction;
	}

	public void setOperationAction(int operationAction) {
		this.operationAction = operationAction;
	}

	public String getSuperModule() {
		return this.superModule;
	}

	public void setSuperModule(String superModule) {
		this.superModule = superModule;
	}

	public String getUserAcademy() {
		return this.userAcademy;
	}

	public void setUserAcademy(String userAcademy) {
		this.userAcademy = userAcademy;
	}

	public String getUserDetail() {
		return this.userDetail;
	}

	public void setUserDetail(String userDetail) {
		this.userDetail = userDetail;
	}

	public String getUserIp() {
		return this.userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

}