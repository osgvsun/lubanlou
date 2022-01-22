package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the timetable_skill_related database table.
 * 
 */
@Entity
@Table(name="timetable_skill_related")
@NamedQuery(name="TimetableSkillRelated.findAll", query="SELECT t FROM TimetableSkillRelated t")
public class TimetableSkillRelated implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	//bi-directional many-to-one association to TimetableAppointment
	@ManyToOne
	@JoinColumn(name="appointment_id")
	private TimetableAppointment timetableAppointment;

	//bi-directional many-to-one association to TExperimentSkill
	@ManyToOne
	@JoinColumn(name="skill")
	private TExperimentSkill TExperimentSkill;

	public TimetableSkillRelated() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TimetableAppointment getTimetableAppointment() {
		return this.timetableAppointment;
	}

	public void setTimetableAppointment(TimetableAppointment timetableAppointment) {
		this.timetableAppointment = timetableAppointment;
	}

	public TExperimentSkill getTExperimentSkill() {
		return this.TExperimentSkill;
	}

	public void setTExperimentSkill(TExperimentSkill TExperimentSkill) {
		this.TExperimentSkill = TExperimentSkill;
	}

}