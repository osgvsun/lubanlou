package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_experiment_lab_device database table.
 * 
 */
@Entity
@Table(name="t_experiment_lab_device")
@NamedQuery(name="TExperimentLabDevice.findAll", query="SELECT t FROM TExperimentLabDevice t")
public class TExperimentLabDevice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="experiment_skill_id")
	private Integer experimentSkillId;

	@Column(name="lab_device_id")
	private Integer labDeviceId;

	public TExperimentLabDevice() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getExperimentSkillId() {
		return this.experimentSkillId;
	}

	public void setExperimentSkillId(int experimentSkillId) {
		this.experimentSkillId = experimentSkillId;
	}

	public Integer getLabDeviceId() {
		return this.labDeviceId;
	}

	public void setLabDeviceId(int labDeviceId) {
		this.labDeviceId = labDeviceId;
	}

}