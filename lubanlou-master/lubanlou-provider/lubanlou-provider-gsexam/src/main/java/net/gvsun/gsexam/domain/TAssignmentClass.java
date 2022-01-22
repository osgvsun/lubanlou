package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_assignment_class database table.
 * 
 */
@Entity
@Table(name="t_assignment_class")
@NamedQuery(name="TAssignmentClass.findAll", query="SELECT t FROM TAssignmentClass t")
public class TAssignmentClass implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name="assignment_id")
	private TAssignment tAssignment;

	@ManyToOne
	@JoinColumn(name="class_number")
	private SchoolClass schoolClass;

	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;



	public TAssignmentClass() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TAssignment gettAssignment() {
		return this.tAssignment;
	}

	public void settAssignment(TAssignment tAssignment) {
		this.tAssignment = tAssignment;
	}

	public SchoolClass getSchoolClass() {
		return this.schoolClass;
	}

	public void setSchoolClass(SchoolClass schoolClass) {
		this.schoolClass = schoolClass;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}


}