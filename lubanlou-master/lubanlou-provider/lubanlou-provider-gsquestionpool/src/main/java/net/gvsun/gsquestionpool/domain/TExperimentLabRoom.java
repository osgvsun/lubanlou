package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_experiment_lab_room database table.
 * 
 */
@Entity
@Table(name="t_experiment_lab_room")
@NamedQuery(name="TExperimentLabRoom.findAll", query="SELECT t FROM TExperimentLabRoom t")
public class TExperimentLabRoom implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name="experiment_skill_id")
	private Integer experimentSkillId;

	@Column(name="lab_room_id")
	private Integer labRoomId;

	public TExperimentLabRoom() {
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

	public Integer getLabRoomId() {
		return this.labRoomId;
	}

	public void setLabRoomId(int labRoomId) {
		this.labRoomId = labRoomId;
	}

}